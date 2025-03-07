import express from "express";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import HabitLog from "../models/HabitLog.js";
import Routine from "../models/Routine.js";

const calendarRouter = express.Router();
dayjs.extend(utc);
dayjs.extend(timezone);

const daysMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
};


const TIMEZONE = "America/Bogota";

calendarRouter.get("/generate", async (req, res) => {
    try {
        const { startDate, endDate, userId } = req.body;
        if (!startDate || !endDate || !userId) {
            return res.status(400).json({ error: "Faltan parámetros requeridos." });
        }

        const now = dayjs().tz(TIMEZONE);
        const start = dayjs(startDate).tz(TIMEZONE).startOf("day");
        const end = dayjs(endDate).tz(TIMEZONE).endOf("day").hour(19).minute(59);

        console.log(now.format(),start.format(),end.format());

        // PASADO: HabitLogs y eventos hasta ahora
        const pastLogs = await HabitLog.find({
            userId,
            completionTime: { $gte: start.toDate(), $lte: now.toDate() }
        });

        // PRESENTE: Eventos de hoy hasta el momento actual
        const todayEvents = await HabitLog.find({
            userId,
            date: { $gte: now.startOf("day").toDate(), $lte: now.toDate() }
        });


        // FUTURO: Generar eventos tentativos
        const routines = await Routine.find({ userId});
        const futureEvents = [];
        console.log(routines);
        for (const routine of routines) {
            let currentDate = now.startOf("day"); // Punto de inicio: hoy

            while (currentDate.isBefore(end, "day")) {
                for (const dayName of routine.days) {
                    const dayNumber = daysMap[dayName]; // Convertir nombre a número
                    if (dayNumber === undefined) continue; // Si el nombre es inválido, ignorarlo

                    let eventDay = currentDate.startOf("week").add(dayNumber, "day"); // Ajustar al día de la semana correcto

                    if (eventDay.isBefore(currentDate, "day")) {
                        eventDay = eventDay.add(7, "day"); // Si ya pasó, mover a la próxima semana
                    }

                    if (eventDay.isAfter(end, "day")) {
                        continue; // Saltar si está fuera del rango
                    }

                    futureEvents.push({
                        routineId: routine._id,
                        date: eventDay.format("YYYY-MM-DD"),
                        beginTime: routine.beginTime,
                        endTime: routine.endTime,
                        description: "Evento tentativo"
                    });
                }
                currentDate = currentDate.add(1, "day"); // Avanzar un día
            }
        }

        // Función para transformar los eventos en el formato deseado
        const structureEvents = (events) => {
            return events.reduce((acc, event) => {
                const [year, month, day] = event.date.split("-"); // Extraer año, mes y día

                if (!acc[year]) acc[year] = {};
                if (!acc[year][month]) acc[year][month] = {};
                if (!acc[year][month][day]) acc[year][month][day] = [];

                acc[year][month][day].push({
                    beginTime: event.beginTime,
                    endTime: event.endTime,
                    name: event.description
                });

                return acc;
            }, {});
        };

        const structuredFutureEvents = structureEvents(futureEvents);

        res.json({ pastLogs, todayEvents, events: structuredFutureEvents });

    } catch (error) {
        console.error("Error generando eventos: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});



export default calendarRouter;

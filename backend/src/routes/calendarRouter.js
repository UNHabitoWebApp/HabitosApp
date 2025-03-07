import express from "express";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import HabitLog from "../models/HabitLog.js";
import Routine from "../models/Routine.js";
import Habit from "../models/Habit.js";

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

        // PASADO: HabitLogs y eventos hasta ahora
        const pastLogs = (await HabitLog.find({
            userId,
            completionTime: { $gte: start.toDate(), $lte: now.toDate() }
        })).map(log => ({ ...log.toObject(), type: "past" }));

        // PRESENTE: Eventos de hoy hasta el momento actual
        const todayEvents = (await HabitLog.find({
            userId,
            date: { $gte: now.startOf("day").toDate(), $lte: now.toDate() }
        })).map(event => ({ ...event.toObject(), type: "today" }));

        // FUTURO: Generar eventos tentativos sin duplicaciones
        const routines = await Routine.find({ userId });
        const habits = await Habit.find({ userId, routineId: { $exists: false } }); // Solo hábitos sin rutina

        const futureEvents = new Map();

        // Procesar rutinas
        for (const routine of routines) {
            for (const dayName of routine.days) {
                const dayNumber = daysMap[dayName];

                let currentDate = now.startOf("week").add(dayNumber, "day");

                if (currentDate.isBefore(now, "day")) {
                    currentDate = currentDate.add(7, "day");
                }

                while (currentDate.isBefore(end, "day")) {
                    const eventKey = `${currentDate.format("YYYY-MM-DD")}-${routine._id}`;

                    if (!futureEvents.has(eventKey)) {
                        futureEvents.set(eventKey, {
                            routineId: routine._id,
                            date: currentDate.format("YYYY-MM-DD"),
                            beginTime: routine.beginTime,
                            endTime: routine.endTime,
                            description: routine.name || "Evento tentativo",
                            type: "future"
                        });
                    }

                    currentDate = currentDate.add(7, "day");
                }
            }
        }

        // Procesar hábitos individuales (sin rutina)
        for (const habit of habits) {
            let currentDate = now.startOf("day");

            while (currentDate.isBefore(end, "day")) {
                const eventKey = `${currentDate.format("YYYY-MM-DD")}-${habit._id}`;

                if (!futureEvents.has(eventKey)) {
                    futureEvents.set(eventKey, {
                        habitId: habit._id,
                        date: currentDate.format("YYYY-MM-DD"),
                        beginTime: habit.beginTime,
                        endTime: habit.endTime,
                        description: habit.name || "Hábito individual",
                        type: "future"
                    });
                }

                currentDate = currentDate.add(1, "day");
            }
        }

        // Convertimos el Map a un array
        const futureEventsArray = Array.from(futureEvents.values());

        // Unificación y estructuración de eventos
        const allEvents = [...pastLogs, ...todayEvents, ...futureEventsArray];
        const structureEvents = (events) => {
            return events.reduce((acc, event) => {
                const [year, month, day] = event.date.split("-");
                if (!acc[year]) acc[year] = {};
                if (!acc[year][month]) acc[year][month] = {};
                if (!acc[year][month][day]) acc[year][month][day] = [];

                acc[year][month][day].push({
                    beginTime: event.beginTime,
                    endTime: event.endTime,
                    name: event.description,
                    type: event.type
                });

                return acc;
            }, {});
        };

        res.json({ events: structureEvents(allEvents) });
    } catch (error) {
        console.error("Error generando eventos: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default calendarRouter;

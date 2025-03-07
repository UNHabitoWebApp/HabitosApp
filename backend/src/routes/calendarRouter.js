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

calendarRouter.post("/generate", async (req, res) => {

    console.log(req.body);

    try {
        const { startDate, endDate, userId } = req.body;
        if (!startDate || !endDate || !userId) {
            return res.status(400).json({ error: "Faltan parámetros requeridos." });
        }
        const now = dayjs().tz(TIMEZONE);
        const start = dayjs(startDate).tz(TIMEZONE).startOf("day");
        const end = dayjs(endDate).tz(TIMEZONE).endOf("day").hour(19).minute(59);
        const initialDate = start.isAfter(now) ? start : now;

        const todayEvents = (await HabitLog.find({
            userId,
            date: { $gte: now.startOf("day").toDate(), $lte: now.toDate() }
        })).map(event => ({ ...event.toObject(), type: "today", habitId: event.habitId }));

        const routines = await Routine.find({ userId });
        const habits = await Habit.find({ userId, personlized: true });

        const pastLogs = await HabitLog.find({
            $or: [
                { habit_id: { $in: habits.map(h => h._id) } },
                { routine_id: { $in: routines.map(r => r._id) } }
            ],
            completionTime: { $gte: start.toDate(), $lte: now.toDate() }
        }).lean();

        const habitNames = new Map(habits.map(h => [h._id.toString(), h.name]));
        const routineNames = new Map(routines.map(r => [r._id.toString(), r.name]));

        const groupedPastLogs = new Map();

        for (const log of pastLogs) {
            const dateKey = dayjs(log.date).format("YYYY-MM-DD");
            const routineKey = log.routine_id ? log.routine_id.toString() : null;
            const habitKey = log.habit_id.toString();

            const eventKey = routineKey ? `${dateKey}-${routineKey}` : `${dateKey}-${habitKey}`;

            if (!groupedPastLogs.has(eventKey)) {
                groupedPastLogs.set(eventKey, {
                    routineId: log.routine_id,
                    habitIds: new Set(),
                    date: dateKey,
                    beginTime: dayjs(log.date).tz(TIMEZONE).format("HH:mm"), // Formatear a HH:mm
                    endTime: dayjs(log.completionTime).tz(TIMEZONE).format("HH:mm"), // Formatear a HH:mm
                    description: routineKey ? routineNames.get(routineKey) : habitNames.get(habitKey),
                    type: "past",
                    habit: !routineKey
                });
            }

            groupedPastLogs.get(eventKey).habitIds.add(habitKey);
        }

        const pastLogsArray = Array.from(groupedPastLogs.values()).map(event => ({
            ...event,
            habitIds: Array.from(event.habitIds),
            id: event.routineId || event.habitIds[0],
            type: event.type || "past",
        }));

        const futureEvents = new Map();

        for (const routine of routines) {
            for (const dayName of routine.days) {
                const dayNumber = daysMap[dayName];
                let currentDate = initialDate.startOf("week").add(dayNumber, "day");
                if (currentDate.isBefore(initialDate, "day")) {
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
                            type: "future",
                            habit: false
                        });
                    }
                    currentDate = currentDate.add(7, "day");
                }
            }
        }

        for (const habit of habits) {
            for (const dayName of habit.days) {
                const dayNumber = daysMap[dayName];
                let currentDate = initialDate.startOf("week").add(dayNumber, "day");
                if (currentDate.isBefore(initialDate, "day")) {
                    currentDate = currentDate.add(7, "day");
                }
                while (currentDate.isBefore(end, "day")) {
                    const eventKey = `${currentDate.format("YYYY-MM-DD")}-${habit._id}`;
                    if (!futureEvents.has(eventKey)) {
                        futureEvents.set(eventKey, {
                            habitId: habit._id,
                            date: currentDate.format("YYYY-MM-DD"),
                            beginTime: habit.beginTime,
                            endTime: habit.endTime,
                            description: habit.name || "Hábito individual",
                            type: "future",
                            habit: true
                        });
                    }
                    currentDate = currentDate.add(7, "day");
                }
            }
        }

        const futureEventsArray = Array.from(futureEvents.values());
        const allEvents = [...pastLogsArray, ...todayEvents, ...futureEventsArray];

        const structureEvents = (events) => {
            return events.reduce((acc, event) => {
                const [year, month, day] = dayjs(event.date).format("YYYY-MM-DD").split("-");
                if (!acc[year]) acc[year] = {};
                if (!acc[year][month]) acc[year][month] = {};
                if (!acc[year][month][day]) acc[year][month][day] = [];

                acc[year][month][day].push({
                    beginTime: event.beginTime,
                    endTime: event.endTime,
                    name: event.description,
                    type: event.type,
                    id: event.habitId || event.routineId,
                    habit: event.habit || false
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

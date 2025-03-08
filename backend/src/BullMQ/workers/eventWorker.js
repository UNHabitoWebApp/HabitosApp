import { Worker } from "bullmq";
import { redisConfig } from "../../config/redisConfig.js";
import Routine from "../../models/Routine.js";
import HabitLog from "../../models/HabitLog.js";
import { enqueueCreateEvent } from "../producers/eventProducer.js";

const eventWorker = new Worker(
    "events",
    async job => {
        console.log("Procesando job...");

        const { routineId, currentDate } = job.data;

        if (!routineId) return;

        console.log(`Rutina ID: ${routineId}`);

        let rutina = job.data.rutina;
        if (!rutina) {
            rutina = await Routine.findById(routineId).populate("exercises", "name days beginTime endTime");
        }

        if (!rutina.beginTime || !rutina.endTime) {
            console.error("❌ Error: La rutina no tiene tiempos definidos.");
            return;
        }

        //const options = { timeZone: "America/Bogota", hour12: false, hour: "2-digit", minute: "2-digit" };

        const baseDate = new Date(currentDate || Date.now());
        job.data.days = rutina.days;
        job.data.currentDate = baseDate;
        job.data.routineId = routineId;
        job.data.beginTime = rutina.beginTime;

        //const localDate = new Intl.DateTimeFormat("es-CO", options).format(baseDate);

        const [hours, minutes] = rutina.beginTime.split(":").map(Number);
        const [endHours, endMinutes] = rutina.endTime.split(":").map(Number);

        const date = new Date(baseDate);
        date.setHours(hours, minutes, 0, 0);

        const completionTime = new Date(baseDate);
        completionTime.setHours(endHours, endMinutes, 0, 0);

        console.log(`📅 Fecha de inicio: ${date.toLocaleString("es-CO", { timeZone: "America/Bogota" })}`);
        console.log(`⌛ Fecha de finalización: ${completionTime.toLocaleString("es-CO", { timeZone: "America/Bogota" })}`);

        for (const exercise of rutina.exercises) {
            const logExists = await HabitLog.findOne({
                habit_id: exercise._id,
                routine_id: rutina._id,
                date: { $gte: date, $lt: completionTime }
            });

            if (!logExists) {
                const log = new HabitLog({
                    habit_id: exercise._id,
                    routine_id: rutina._id,
                    date: date,
                    completionTime: completionTime,
                    done: false
                });
                await log.save();
                console.log(`📝 Log creado para ${exercise.name}`);
            } else {
                console.log(`⚠️ Log ya existe para ${exercise.name}, no se creó otro.`);
            }
        }
    },
    {
        connection: redisConfig,
        removeOnComplete: { age: 10 },
        removeOnFail: { age: 10 }
    }
);

eventWorker.on("completed", async job => {
    console.log(`✅ Job completado: ${job.id}`);
    console.log(job.data);

    const {diffMs} = getNextExecutionTime(job.data);

    console.log(`📅 Programando el siguiente job para: ${diffMs}`);

    await enqueueCreateEvent(
        {
            routineId: job.data.routineId,
        },
        diffMs
    );
});

eventWorker.on("failed", (job, err) => {
    console.error(`❌ Job ${job?.id} falló:`, err);
});

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

function getNextExecutionTime({ days, currentDate, beginTime }) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const now = dayjs(currentDate);
    const currentDayIndex = now.day(); // Índice del día actual (0 = Domingo, 1 = Lunes, etc.)

    // Ordenamos los días posibles en orden desde hoy
    const sortedDays = days
        .map(day => ({ day, index: weekdays.indexOf(day) }))
        .sort((a, b) => a.index - b.index);

    // Buscar el siguiente día disponible
    const nextDay = sortedDays.find(d => d.index > currentDayIndex) || sortedDays[0];

    // Si el siguiente día es la próxima semana, sumamos 7 días
    const daysToAdd = nextDay.index > currentDayIndex ? nextDay.index - currentDayIndex : (7 - currentDayIndex + nextDay.index);

    // Construir la fecha final con beginTime
    const nextExecutionDate = now.add(daysToAdd, "day").format("YYYY-MM-DD") + " " + beginTime;
    const nextExecution = dayjs(nextExecutionDate).tz("America/Bogota"); // Ajustar zona horaria si aplica

    // Diferencia en milisegundos
    const diffMs = nextExecution.diff(now);

    return { nextExecution, diffMs };
}


export default eventWorker;
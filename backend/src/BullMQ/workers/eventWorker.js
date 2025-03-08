import { Worker } from "bullmq";
import { redisConfig } from "../../config/redisConfig.js";
import Routine from "../../models/Routine.js";
import Habit from "../../models/Habit.js"; // Importamos el modelo Habit
import { enqueueCreateEvent } from "../producers/eventProducer.js";
import sendEmail from "../../utils/sendEmail.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const eventWorker = new Worker(
    "events",
    async job => {
        console.log("Procesando job...");

        const { routineId, habitId, currentDate, userEmail } = job.data;
        if (!routineId && !habitId) {
            console.error("❌ Error: No se proporcionó ni routineId ni habitId.");
            return;
        }
        if (!userEmail) {
            console.error("❌ Error: El email del usuario es requerido.");
            return;
        }

        console.log("🔍 Buscando rutina o hábito...");
        let rutina;

        if (routineId) {
            rutina = await Routine.findById(routineId).populate("exercises", "name days beginTime endTime");
        } else if (habitId) {
            rutina = await Habit.findById(habitId);
        }

        if (!rutina) {
            console.error("❌ Error: No se encontró ni la rutina ni el hábito en la base de datos.");
            return;
        }

        if (!rutina.beginTime) {
            console.error("❌ Error: El elemento no tiene 'beginTime' definido.");
            return;
        }

        // Obtener la fecha y hora de la ejecución actual
        const baseDate = new Date(currentDate || Date.now());
        job.data.days = rutina.days;
        job.data.currentDate = baseDate;
        job.data.beginTime = rutina.beginTime;

        const [hours, minutes] = rutina.beginTime.split(":").map(Number);
        const date = new Date(baseDate);
        date.setHours(hours, minutes, 0, 0);

        console.log(`📅 Fecha de inicio: ${date.toLocaleString("es-CO", { timeZone: "America/Bogota" })}`);

        // 📧 Enviar el correo de recordatorio
        await sendEmail(
            userEmail,
            `Recordatorio de tu actividad (${rutina.name || "Sin nombre"}) empieza pronto a las ${rutina.beginTime}`,
            `Hola, tu actividad programada (${rutina.name || "Sin nombre"}) empieza pronto a las ${rutina.beginTime}.`
        );

        console.log("📧 Correo enviado a:", userEmail);
    },
    {
        connection: redisConfig,
        removeOnComplete: { age: 10 },
        removeOnFail: { age: 10 }
    }
);

eventWorker.on("completed", async job => {
    console.log(`✅ Job completado: ${job.id}`);

    // Obtener el próximo tiempo de ejecución
    const { nextExecution, diffMs } = getNextExecutionTime(job.data);

    // Programar el siguiente job 10 minutos antes
    const reminderTime = Math.max(diffMs - 10 * 60 * 1000, 0);
    console.log(`📅 Programando el siguiente job para: ${reminderTime}ms antes (${nextExecution.format("YYYY-MM-DD HH:mm")})`);

    await enqueueCreateEvent(
        {
            routineId: job.data.routineId || null,
            habitId: job.data.habitId || null,
            userEmail: job.data.userEmail,
            id: job.id,
            cont: job.data.cont + 1
        },
        { delay: reminderTime, jobId: job.id }
    );
});

eventWorker.on("failed", (job, err) => {
    console.error(`❌ Job ${job?.id} falló:`, err);
});

function getNextExecutionTime({ days, currentDate, beginTime }) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const now = dayjs(currentDate);
    const currentDayIndex = now.day();

    const sortedDays = days
        .map(day => ({ day, index: weekdays.indexOf(day) }))
        .sort((a, b) => a.index - b.index);

    const nextDay = sortedDays.find(d => d.index > currentDayIndex) || sortedDays[0];
    const daysToAdd = nextDay.index > currentDayIndex ? nextDay.index - currentDayIndex : (7 - currentDayIndex + nextDay.index);

    const nextExecutionDate = now.add(daysToAdd, "day").format("YYYY-MM-DD") + " " + beginTime;
    const nextExecution = dayjs(nextExecutionDate).tz("America/Bogota");

    return { nextExecution, diffMs: nextExecution.diff(now) };
}

export default eventWorker;
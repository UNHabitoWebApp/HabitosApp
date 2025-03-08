import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export function getNextExecutionTime({ days, currentDate, beginTime }) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const now = dayjs(currentDate).tz("America/Bogota");
    const currentDayIndex = now.day();

    const sortedDays = days
        .map(day => ({ day, index: weekdays.indexOf(day) }))
        .sort((a, b) => a.index - b.index);

    let nextExecution;
    let daysToAdd = 0;

    // Revisar si el evento es hoy y aún no ha pasado
    const todayScheduled = sortedDays.find(d => d.index === currentDayIndex);
    if (todayScheduled) {
        const todayExecution = dayjs(`${now.format("YYYY-MM-DD")} ${beginTime}`).tz("America/Bogota");
        if (todayExecution.isAfter(now)) {
            nextExecution = todayExecution;
        }
    }

    // Si no hay ejecución hoy, buscar el siguiente día
    if (!nextExecution) {
        const nextDay = sortedDays.find(d => d.index > currentDayIndex) || sortedDays[0];
        daysToAdd = nextDay.index > currentDayIndex ? nextDay.index - currentDayIndex : (7 - currentDayIndex + nextDay.index);
        nextExecution = dayjs(now).add(daysToAdd, "day").format("YYYY-MM-DD") + " " + beginTime;
        nextExecution = dayjs(nextExecution).tz("America/Bogota");
    }

    return { nextExecution, diffMs: nextExecution.diff(now) };
}

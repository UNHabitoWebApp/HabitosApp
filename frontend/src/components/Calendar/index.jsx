import React from "react";
import { useDateActions, useDateSelectors, useCurrentTimeAndDate } from "../../hooks/useDateActions";
import { useTimeUpdater } from "../../hooks/useTimeUpdater";
import DayFragment from "./DayFragment";

const events = [
    { name: "Pierna", description: "Rutina de ejercicios", start: "9:00", end: "11:30" },
    { name: "Journaling", description: "Escribir reflexiones", start: "13:00", end: "14:00" },
    { name: "Lectura", description: "Leer un libro", start: "15:00", end: "16:30" },
    { name: "Cocinar", description: "Preparar la cena", start: "19:00", end: "20:00" },
    { name: "Meditar", description: "Práctica de mindfulness", start: "21:00", end: "21:30" },
    { name: "Dormir", description: "Descansar", start: "22:00", end: "23:00" },
    { name: "Dormir", description: "Descansar", start: "23:00", end: "23:59" },
];

const Calendar = () => {
    const { updateCurrentTimeAction, resetDateAction } = useDateActions();
    const { daysOfWeek, remainingTime, remainingTimeForNextMinute } = useDateSelectors();
    const { currentTime, currentDate } = useCurrentTimeAndDate();

    useTimeUpdater(remainingTime, remainingTimeForNextMinute, updateCurrentTimeAction, resetDateAction);

    const formatDayName = (day) => {
        const dayMap = {
            Monday: "Lunes",
            Tuesday: "Martes",
            Wednesday: "Miércoles",
            Thursday: "Jueves",
            Friday: "Viernes",
            Saturday: "Sabado",
            Sunday: "Domingo",
        };
        return dayMap[day] || day;
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Calendario Semanal</h1>
            <h2 className="text-lg mb-2">Hoy es: {currentDate}</h2>
            <h2 className="text-lg mb-6">Hora Actual: {currentTime}</h2>
            <div className="flex w-full max-w-[1200px] min-w-[1000px] mx-auto">
                {daysOfWeek.map((day, index) => (
                    <div
                        key={index}
                        className="flex-grow border-r-2 border-[#F2F4F7] last:border-r-0 flex flex-col items-center"
                        style={{
                            width: "14.28%",
                            minWidth: "14.28%",
                        }}
                    >
                        <div className="text-center font-semibold py-2">
                            <div className="text-sm">{formatDayName(day.day)}</div>
                            <div className="text-xs">{day.date}</div>
                        </div>
                        <DayFragment
                            key={index}
                            first={index === 0}
                            last={index === daysOfWeek.length - 1}
                            events={[events[index]]} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;

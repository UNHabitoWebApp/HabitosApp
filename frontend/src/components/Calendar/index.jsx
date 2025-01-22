import React from "react";
import {
    useDateActions,
    useDateSelectors,
    useCurrentTimeAndDate
} from "../../hooks/useDateActions";
import { useTimeUpdater } from "../../hooks/useTimeUpdater";
import { generateDayClasses } from "../../utils/classNameUtils";
import { formatDayName } from "../../utils/dateUtils";
import DayFragment from "./DayFragment";
import './general.css'

const events = [
    { name: "Pierna", description: "Rutina de ejercicios", start: "9:00", end: "11:30" },
    { name: "Journaling", description: "Escribir reflexiones", start: "13:00", end: "14:00" },
    { name: "Lectura", description: "Leer un libro", start: "1:00", end: "6:30" },
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

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Calendario Semanal</h1>
            <h2 className="text-lg mb-2">Hoy es: {currentDate}</h2>
            <h2 className="text-lg mb-6">Hora Actual: {currentTime}</h2>

            {/* Contenedor de días de la semana */}
            <div className="flex flex-2  w-[93%] min-w-[1000px] mx-auto overflow-y-auto pr-[4px]">
                {daysOfWeek.map((day, index) => (
                    <div
                        key={`day-${index}`}
                        className={`${generateDayClasses(index)} border-r text-center font-semibold py-2`}
                    >
                        <div className="text-sm">{formatDayName(day.day)}</div>
                        <div className="text-xs">{day.date}</div>
                    </div>
                ))}
            </div >

            {/* Contenedor de DayFragments */}
            <div className="flex flex-2 w-[93%] min-w-[1000px] mx-auto overflow-y-auto" >
                {
                    daysOfWeek.map((day, index) => (
                        <div
                            key={`fragment-${index}`}
                            className={`${generateDayClasses(index)} h-96 `}
                        >
                            <DayFragment
                                first={index === 0}
                                last={index === daysOfWeek.length - 1}
                                events={[events[index]]}
                            />
                        </div>
                    ))
                }
            </div >
        </>
    );
};

export default Calendar;

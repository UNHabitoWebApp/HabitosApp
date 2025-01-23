import {
    useDateActions,
    useDateSelectors,
} from "../../hooks/useDateActions";
import { useTimeUpdater } from "../../hooks/useTimeUpdater";
import DayFragment from "./DayFragment";
import DayLayout from "./DayLayout";
import './general.css';

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

    useTimeUpdater(remainingTime, remainingTimeForNextMinute, updateCurrentTimeAction, resetDateAction);

    return (
        <div className="w-[85%] h-full bg-white rounded-lg flex flex-col shadow-md">
            {/* Contenedor de días de la semana */}
            <div className="flex flex-none pr-[0.30rem] pl-[40px]">
                {daysOfWeek.map((day, index) => (
                    <DayLayout
                        day={day}
                        index={index}
                        key={index}
                    />
                ))}
            </div>

            {/* Contenedor de DayFragments */}
            <div className="flex flex-grow overflow-y-auto pl-[40px] flex-2">
                {daysOfWeek.map((day, index) => (
                    <div
                        key={`fragment-${index}`}
                        className="flex-grow flex flex-col items-center w-[14.28%] min-w-[14.28%]"
                    >
                        <DayFragment
                            first={index === 0}
                            last={index === daysOfWeek.length - 1}
                            events={[events[index]]}
                        />
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Calendar;

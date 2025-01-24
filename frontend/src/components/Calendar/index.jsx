import {
    useCurrentDateInfo,
    useDateActions,
    useDateSelectors,
} from "../../hooks/useDateActions";
import { useTimeUpdater } from "../../hooks/useTimeUpdater";
import { areEqualDates } from "../../utils/dateUtils";
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
    // Cambiar según el estado deseado.
    const { currentDate, currentMode } = useCurrentDateInfo();

    const currentDayIndex = daysOfWeek.findIndex(day =>
        areEqualDates(day, currentDate)
    );

    return (
        <div className="w-[90%] h-full bg-white flex flex-col border border-gray-200 rounded-md shadow-sm">
            {/* Contenedor de días de la semana */}
            <div className="flex flex-none pr-[0.30rem] pl-[45px]">
                {currentMode == 'day' ? (
                    currentDayIndex !== -1 && (
                        <DayLayout
                            day={daysOfWeek[currentDayIndex]}
                            index={6}
                            key={currentDayIndex}
                        />
                    )
                ) : (
                    daysOfWeek.map((day, index) => (
                        <DayLayout
                            day={day}
                            index={index}
                            key={index}
                        />
                    ))
                )}
            </div>

            {/* Contenedor de DayFragments */}
            <div className="flex flex-grow overflow-y-auto pl-[45px] flex-2">
                {currentMode == 'day' ? (
                    currentDayIndex !== -1 && (
                        <div
                            key={`fragment-${currentDayIndex}`}
                            className="flex-grow flex flex-col items-center w-full"
                        >
                            <DayFragment
                                first={true}
                                last={true}
                                events={events.filter((_, idx) => idx === currentDayIndex)}
                            />
                        </div>
                    )
                ) : (
                    daysOfWeek.map((day, index) => (
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
                    ))
                )}
            </div>
        </div>
    );
};

export default Calendar;

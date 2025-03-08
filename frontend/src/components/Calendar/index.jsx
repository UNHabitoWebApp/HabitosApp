import {
    useCurrentDateInfo,
    useDateActions,
    useDateSelectors,
} from "../../hooks/useDateActions";
import { useTimeUpdater } from "../../hooks/useTimeUpdater";
import { areEqualDates } from "../../utils/dateUtils";
import DayFragment from "./DayFragment";
import DayLayout from "./DayLayout";
import CalendarPanel from "./CalendarPanel";
import './general.css';
import { useEventsOfWeek } from "../../hooks/useHabitsActions";


const Calendar = () => {
    const { updateCurrentTimeAction, resetDateAction } = useDateActions();
    const { daysOfWeek, remainingTime, remainingTimeForNextMinute } = useDateSelectors();
    const events = useEventsOfWeek(daysOfWeek);

    useTimeUpdater(remainingTime, remainingTimeForNextMinute, updateCurrentTimeAction, resetDateAction);
    const { selectedDate, currentMode } = useCurrentDateInfo();

    const currentDayIndex = daysOfWeek.findIndex(day =>
        areEqualDates(day, selectedDate)
    );

    return (
        <div className="w-[100%] h-full bg-white flex flex-col border border-gray-200 rounded-md shadow-sm">
            {/* Contenedor de configuracion */}
            <CalendarPanel />
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
                                day={events.find((_, idx) => idx === currentDayIndex)}
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
                                day={events[index]}
                            />
                        </div>
                    ))
                )}

            </div>
        </div>
    );
};

export default Calendar;

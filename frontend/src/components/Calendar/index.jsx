import {
    useDateActions,
    useDateSelectors,
    useCurrentTimeAndDate
} from '../../hooks/useDateActions';
import { useTimeUpdater } from '../../hooks/useTimeUpdater';

const Calendar = () => {
    const { updateCurrentTimeAction, resetDateAction } = useDateActions();
    const { daysOfWeek, remainingTime, remainingTimeForNextMinute } = useDateSelectors();
    const { currentTime, currentDate } = useCurrentTimeAndDate();

    console.log(remainingTimeForNextMinute);
    useTimeUpdater(remainingTime, remainingTimeForNextMinute, updateCurrentTimeAction, resetDateAction);

    return (
        <div>
            <h1>Calendario</h1>
            <h2>Hoy es: {currentDate}</h2>
            <h2>Hora Actual: {currentTime}</h2>
            <ul>
                {daysOfWeek.map((day, index) => (
                    <li key={index}>
                        {day.day}, {day.date} {day.month} {day.year}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Calendar;

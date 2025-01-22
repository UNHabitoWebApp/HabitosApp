import { useCurrentTimeAndDate } from '../../hooks/useDateActions'
import {
    generateDayNameClasses,
    generateDayNumberClasses,
    generateDaysLayoytClasses
} from '../../utils/classNameUtils'
import { formatDayName } from '../../utils/dateUtils'
import PropTypes from 'prop-types'


const DayLayout = ({ day, index }) => {
    const { currentDate } = useCurrentTimeAndDate();
    const isToday = currentDate.split("-")[2] === day.date;
    console.log(currentDate.split("-"));
    console.log(isToday);

    return (
        <div
            className={`${generateDaysLayoytClasses(index)} `}
        >
            <div
                className={generateDayNameClasses(isToday)}
            >
                {formatDayName(day.day)}
            </div>
            <div
                className={generateDayNumberClasses(isToday)}
            >
                {day.date}
            </div>
        </div>
    )
}

DayLayout.propTypes = {
    day: PropTypes.shape({
        day: PropTypes.instanceOf(Date).isRequired,
        date: PropTypes.string.isRequired
    }),
    index: PropTypes.number.isRequired
}

export default DayLayout
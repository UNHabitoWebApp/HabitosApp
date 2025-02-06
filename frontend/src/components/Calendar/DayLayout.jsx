import { useCurrentDateInfo, useDateActions } from '../../hooks/useDateActions'
import {
    generateDayNameClasses,
    generateDayNumberClasses,
    generateDaysLayoytClasses
} from '../../utils/classNameUtils'
import { areEqualDates, formatDayName } from '../../utils/dateUtils'
import PropTypes from 'prop-types'


const DayLayout = ({ day, index }) => {
    const { currentDate } = useCurrentDateInfo();
    const { clickDay } = useDateActions();
    const isToday = areEqualDates(day, currentDate);

    const handleDayClick = () => {
        clickDay(day);
    }

    return (
        <div
            className={`${generateDaysLayoytClasses(index)}`}
            onClick={handleDayClick}
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
        day: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
    }),
    index: PropTypes.number.isRequired
}

export default DayLayout
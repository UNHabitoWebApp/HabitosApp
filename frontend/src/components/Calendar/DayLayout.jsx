import { generateDaysLayoytClasses } from '../../utils/classNameUtils'
import { formatDayName } from '../../utils/dateUtils'
import PropTypes from 'prop-types'

const DayLayout = ({ day, index }) => {
    return (
        <div
            className={`${generateDaysLayoytClasses(index)} `}
        >
            <div className="text-sm">{formatDayName(day.day)}</div>
            <div className="text-xs">{day.date}</div>
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
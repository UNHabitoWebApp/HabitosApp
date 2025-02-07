import PropTypes from "prop-types";
import TimeGrid from "./TimeGrid";
import EventCard from "./EventCard";
import CurrentTimeIndicator from "./CurrentTimeIndicator";
import { generateDayFragmentContainerClasses } from "../../utils/classNameUtils";

const DayFragment = ({ day, first = false, last = false, unique = false }) => {
    const { habits = [] } = day; // Extraemos la información del día

    console.log(habits);

    const mergedEvents = [];

    // Convertimos los hábitos en eventos con minutos calculados
    habits.forEach((event) => {
        if (!event.start || !event.end) return; // Evitamos errores si faltan datos

        const eventStart =
            parseFloat(event.start.split(":")[0]) * 60 +
            (parseFloat(event.start.split(":")[1]) || 0);
        const eventEnd =
            parseFloat(event.end.split(":")[0]) * 60 +
            (parseFloat(event.end.split(":")[1]) || 0);

        mergedEvents.push({
            ...event,
            startMinutes: eventStart,
            endMinutes: eventEnd,
        });
    });

    // Determinar las clases del contenedor según si es el primero o último
    const containerClasses = generateDayFragmentContainerClasses(first, last, unique);

    return (
        <div className={containerClasses}>
            <div className="relative w-full h-full">
                <CurrentTimeIndicator showLabels={first} last={last} />
                <TimeGrid showLabels={first} />
                {mergedEvents.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </div>
    );
};

DayFragment.propTypes = {
    day: PropTypes.shape({
        year: PropTypes.string.isRequired,
        monthNumber: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        habits: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                start: PropTypes.string.isRequired,
                end: PropTypes.string.isRequired,
            })
        ),
    }).isRequired,
    first: PropTypes.bool,
    last: PropTypes.bool,
    unique: PropTypes.bool,
};

export default DayFragment;
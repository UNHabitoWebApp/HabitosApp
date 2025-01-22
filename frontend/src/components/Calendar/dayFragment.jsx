import React from "react";
import PropTypes from "prop-types";
import TimeGrid from "./TimeGrid"
import EventCard from "./EventCard";
import { generateDayFragmentContainerClasses } from "../../utils/classNameUtils";

const DayFragment = (
    {
        events,
        first = false,
        last = false,
        unique = false,
    }
) => {
    const mergedEvents = [];
    // Combinar eventos con cálculo de minutos
    events.forEach((event) => {
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
                <TimeGrid showLabels={first} />
                {mergedEvents.map((event, index) => {
                    return (
                        <EventCard key={index} event={event} />
                    );
                })}
            </div>
        </div>
    );
};

DayFragment.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            start: PropTypes.string.isRequired,
            end: PropTypes.string.isRequired,
        })
    ).isRequired,
    first: PropTypes.bool,
    last: PropTypes.bool,
    unique: PropTypes.bool,
};

export default DayFragment;

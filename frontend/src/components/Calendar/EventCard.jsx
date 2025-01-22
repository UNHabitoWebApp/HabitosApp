import React from 'react'
import PropTypes from 'prop-types'

const EventCard = ({ event }) => {

    const eventHeight = event.endMinutes - event.startMinutes;
    const isSmallHeight = eventHeight < 50;

    return (
        <div
            className={`absolute left-0 right-0 bg-verdeSecundario-20 font-semibold text-sm overflow-hidden border-l-4 border-verdePrincipal rounded-md p-2 flex ${isSmallHeight ? "items-center justify-between" : "flex-col"
                }`}
            style={{
                top: `${(event.startMinutes / 1440) * 100}%`,
                height: `${(eventHeight / 1440) * 100}%`,
            }}
            title={event.description}
        >
            <div
                className={`font-bold text-verdePrincipal ${isSmallHeight ? "text-sm" : "mb-1"
                    }`}
            >
                {event.name}
            </div>
            <div
                className={`text-xs text-verdePrincipal ${isSmallHeight ? "text-sm text-right overflow-hidden" : ""
                    }`}
            >
                {`${event.start} – ${event.end}`}
            </div>
        </div>
    )
}

EventCard.propTypes = {
    event: PropTypes.shape({
        startMinutes: PropTypes.number.isRequired,
        endMinutes: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
    })
}



export default EventCard
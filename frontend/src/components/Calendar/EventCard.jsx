import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
    const eventHeight = event.endMinutes - event.startMinutes;
    const isSmallHeight = eventHeight < 50;
    const navigate = useNavigate();

    const onClick = () => {
        if (event.type === "past") return;
        navigate(event.isHabit ? `/personalize_habit/${event.id}` : `/routine_exercises_list/${event.id}`);
    };

    return (
        <div
            className={`absolute left-0 right-0 bg-verdeSecundario-20 font-semibold text-sm text-verdePrincipal overflow-hidden border-l-4 
            border-verdePrincipal rounded-md p-2 flex transition-all duration-300 ease-in-out 
            hover:bg-verdeTerciario hover:text-white hover:border-verdeSecundario-40 cursor-pointer
            ${isSmallHeight ? "items-center justify-between" : "flex-col"}`}
            style={{
                top: `${(event.startMinutes / 1440) * 100}%`,
                height: `${(eventHeight / 1440) * 100}%`,
            }}
            title={event.description}
            onClick={onClick}
        >
            <div className={`font-bold  ${isSmallHeight ? "text-sm" : "mb-1"} word-wrap`}>
                {event.name}
            </div>
            <div className={`text-xs  ${isSmallHeight ? "text-sm text-right overflow-hidden" : ""} word-wrap`}>
                {`${event.start} – ${event.end}`}
            </div>
            <div className={`text-xs ${isSmallHeight ? "text-sm text-right overflow-hidden" : ""} word-wrap`}>
                {event.isHabit ? "Hábito" : "Rutina"} {event.type === "future" ? "(Programado)" : "(Realizado)"}
            </div>
        </div>
    );
};

EventCard.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.string.isRequired,
        startMinutes: PropTypes.number.isRequired,
        endMinutes: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        isHabit: PropTypes.bool.isRequired,
        type: PropTypes.oneOf(["future", "past"]).isRequired
    })
};

export default EventCard;

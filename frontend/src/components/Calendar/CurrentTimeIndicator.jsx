import PropTypes from "prop-types";
import { useCurrentTimeAndDate } from "../../hooks/useDateActions";

const CurrentTimeIndicator = ({ showLabels }) => {
    const { currentTime } = useCurrentTimeAndDate();

    console.log("Current Time:", currentTime);

    // Separar la hora, minutos y período (am/pm)
    const [time, period] = currentTime.split(" ");
    const [hoursRaw, minutes] = time.split(":").map(Number);

    // Convertir a formato de 24 horas si es necesario
    const hours = period.toLowerCase() === "pm" && hoursRaw !== 12
        ? hoursRaw + 12
        : period.toLowerCase() === "am" && hoursRaw === 12
            ? 0
            : hoursRaw;

    console.log("Hours:", hours);
    console.log("Minutes:", minutes);

    // Calcular la posición en porcentaje del día
    const totalMinutes = hours * 60 + minutes;
    const currentTimePosition = (totalMinutes / 1440) * 100;

    console.log("Current Time Position:", currentTimePosition);

    return (
        <div
            className="absolute left-0 right-0 border-t-2 border-verdePrincipal"
            style={{
                top: `${currentTimePosition}%`,
                zIndex: 20,
            }}
        >
            {showLabels && (
                <div
                    className="absolute text-xs font-bold text-white bg-verdePrincipal px-2 py-1 rounded-full"
                    style={{
                        top: "50%",
                        left: "-40px",
                        transform: "translateY(-50%)",
                    }}
                >
                    {time}
                </div>

            )}
        </div>
    );
};

CurrentTimeIndicator.propTypes = {
    showLabels: PropTypes.bool,
};

export default CurrentTimeIndicator;

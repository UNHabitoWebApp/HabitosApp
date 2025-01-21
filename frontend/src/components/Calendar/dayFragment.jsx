import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useCurrentTimeAndDate } from "../../hooks/useDateActions";

const DayFragment = (
    {
        events,
        first = false,
        last = false,
        unique = false
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

    // Generar la cuadrícula para las 24 horas
    const gridLines = Array.from({ length: 24 }, (_, index) => ({
        hour: index,
        top: `${(index / 24) * 100}%`,
    }));

    // Determinar las clases del contenedor según si es el primero o último
    const containerClasses = classNames(
        "relative w-full h-[1440px]",
        {
            "border-l-2 border-[#F2F4F7]": false,
            "border-r-2 border-[#F2F4F7]": false,
        }
    );

    return (
        <div className={containerClasses}>
            <div className="relative w-full h-full">
                {/* Renderizar la cuadrícula */}
                {gridLines.map((line) => (
                    <div
                        key={line.hour}
                        className="absolute left-0 right-0 border-t-2 border-[#F2F4F7]"
                        style={{
                            top: line.top,
                            height: "10px",
                        }}
                    >
                        {first && (
                            <span
                                className="absolute text-xs text-gray-500"
                                style={{
                                    left: "-40px",
                                    transform: "translateY(-60%)",
                                }}
                            >
                                {line.hour}:00
                            </span>
                        )}
                    </div>
                ))}

                {/* Renderizar los eventos */}
                {mergedEvents.map((event, index) => {
                    const eventHeight = event.endMinutes - event.startMinutes;
                    const isSmallHeight = eventHeight < 50; // Define un umbral para considerar la altura "demasiado pequeña"

                    return (
                        <div
                            key={index}
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

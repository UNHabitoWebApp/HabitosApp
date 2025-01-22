import React from "react";
import PropTypes from "prop-types";

const TimeGrid = ({ showLabels = false }) => {
    const gridLines = Array.from({ length: 24 }, (_, index) => ({
        hour: index,
        top: `${(index / 24) * 100}%`,
    }));

    return (
        <div className="relative w-full h-[1440px]">
            {gridLines.map((line) => (
                <div
                    key={line.hour}
                    className="absolute left-0 right-0 border-t-2 border-[#F2F4F7]"
                    style={{
                        top: line.top,
                        height: "10px",
                    }}
                >
                    {/* Etiqueta de hora opcional */}
                    {showLabels && (
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
        </div>
    );
};

TimeGrid.propTypes = {
    showLabels: PropTypes.bool,
};

export default TimeGrid;

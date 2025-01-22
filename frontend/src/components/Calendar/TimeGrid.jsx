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
                    {showLabels && (
                        // Contenedor independiente para las etiquetas
                        <div
                            className="absolute"
                            style={{
                                left: "-35px",
                                top: "50%",
                                transform: "translateY(-60%)",
                                zIndex: 10,
                            }}
                        >
                            <span className="text-xs text-gray-500">
                                {line.hour}:00
                            </span>
                        </div>
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

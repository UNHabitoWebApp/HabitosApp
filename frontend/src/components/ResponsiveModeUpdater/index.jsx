import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../../store/slices/dateSlices";

const ResponsiveModeUpdater = () => {
    const dispatch = useDispatch();
    const currentMode = useSelector(state => state.date.mode);

    useEffect(() => {
        const updateMode = () => {
            const isSmallScreen = window.innerWidth < 850;

            // Solo cambia a "day" si es pequeño, pero no fuerza "week" en pantallas grandes
            if (isSmallScreen && currentMode !== "day") {
                dispatch(toggleMode("day"));
            }
        };

        updateMode();
        window.addEventListener("resize", updateMode);
        return () => window.removeEventListener("resize", updateMode);
    }, [dispatch, currentMode]);

    return null;
};

export default ResponsiveModeUpdater;

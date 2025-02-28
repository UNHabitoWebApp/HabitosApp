import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../../store/slices/dateSlices";
import { useControlActions } from '../../hooks/useControlActions';

const ResponsiveModeUpdater = () => {
    const dispatch = useDispatch();
    const { setVariable } = useControlActions();
    const currentMode = useSelector(state => state.date.mode);

    useEffect(() => {
        const updateMode = () => {
            const isSmallScreen = window.innerWidth < 850;

            // Solo cambia a "day" si es pequeño, pero no fuerza "week" en pantallas grandes
            if (isSmallScreen && currentMode !== "day") {
                dispatch(toggleMode("day"));
            } else {
                setVariable("openHabitManager", false);
            }
        };

        updateMode();
        window.addEventListener("resize", updateMode);
        return () => window.removeEventListener("resize", updateMode);
    }, [dispatch, currentMode, setVariable]);

    return null;
};

export default ResponsiveModeUpdater;

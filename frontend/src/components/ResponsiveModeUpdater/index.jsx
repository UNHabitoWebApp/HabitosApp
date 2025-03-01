import { useEffect } from "react";
import { useControlActions } from '../../hooks/useControlActions';
import { useCurrentDateInfo, useDateActions } from "../../hooks/useDateActions";

const ResponsiveModeUpdater = () => {
    const { setVariable } = useControlActions();
    const { toggleModeAction } = useDateActions();
    const { currentMode } = useCurrentDateInfo();
    const { openHabitManager } = useControlActions();

    useEffect(() => {
        const updateMode = () => {
            const isSmallScreen = window.innerWidth < 850;

            if (isSmallScreen) {
                if (currentMode !== "day") toggleModeAction();
            } else {
                if (openHabitManager) setVariable("openHabitManager", false);
                if (currentMode !== "week") toggleModeAction();
            }
        };

        updateMode();
        window.addEventListener("resize", updateMode);
        return () => window.removeEventListener("resize", updateMode);
    }, [toggleModeAction, currentMode, setVariable, openHabitManager]);

    return null;
};

export default ResponsiveModeUpdater;

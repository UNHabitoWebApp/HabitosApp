import { useAppDispatch, useAppSelector } from "./store";
import { 
    setControlVariable, 
    resetControlVariable, 
    resetAllControlVariables, 
    selectControlVariable 
} from "../store/slices/controlSlices";

export const useControlActions = () => {
    const dispatch = useAppDispatch();

    const setVariable = (key, value) => {
        dispatch(setControlVariable({ key, value }));
    };

    const resetVariable = (key) => {
        dispatch(resetControlVariable(key));
    };

    const resetAll = () => {
        dispatch(resetAllControlVariables());
    };

    return { 
        setVariable, 
        resetVariable, 
        resetAll 
    };
};

export const useControlSelectors = () => {
    const openHabitManager = useAppSelector((state) => selectControlVariable(state, "openHabitManager"));
    const isSidebarOpen = useAppSelector((state) => selectControlVariable(state, "isSidebarOpen"));
    const isModalOpen = useAppSelector((state) => selectControlVariable(state, "isModalOpen"));

    return {
        openHabitManager,
        isSidebarOpen,
        isModalOpen,
    };
};

import { 
    updateCurrentTime, 
    resetToToday,    
    selectDaysOfWeek,
    selectRemainingTime,
    selectRemainingTimeForNextMinute,
    forward,
    backward,
    toggleMode
} from '../store/slices/dateSlices';
import { useAppDispatch, useAppSelector } from './store';

export const useDateActions = () => {
    const dispatch = useAppDispatch();

    const updateCurrentTimeAction = () => {
        dispatch(updateCurrentTime());
    };

    const resetDateAction = () => {
        dispatch(resetToToday());
    };

    const forwardAction = () => {
        dispatch(forward());
    }

    const backwardAction = () => {
        dispatch(backward());
    }

    const toggleModeAction = () => {
        dispatch(toggleMode());
    }

    return { 
        updateCurrentTimeAction, 
        resetDateAction, 
        forwardAction, 
        backwardAction,
        toggleModeAction
    };
};

export const useDateSelectors = () => {
    const daysOfWeek = useAppSelector(selectDaysOfWeek);
    const remainingTime = useAppSelector(selectRemainingTime);
    const remainingTimeForNextMinute = useAppSelector(selectRemainingTimeForNextMinute);

    return {
        daysOfWeek,
        remainingTime,
        remainingTimeForNextMinute
    };
};

export const useCurrentDateInfo = () => {
    const currentTime = useAppSelector((state) => state.date.currentTime);
    const currentDate = useAppSelector((state) => state.date.currentDate);
    const currentMode = useAppSelector((state) => state.date.mode);
    const selectedWeek = useAppSelector((state) => state.date.selectedWeek);
    const selectedDate = useAppSelector((state) => state.date.selectedDate);
    return { currentTime, currentDate, currentMode, selectedWeek, selectedDate };
};
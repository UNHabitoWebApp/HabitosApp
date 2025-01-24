import { 
    updateCurrentTime, 
    resetToToday,    
    selectDaysOfWeek,
    selectRemainingTime,
    selectRemainingTimeForNextMinute 
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

    return { updateCurrentTimeAction, resetDateAction };
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
    return { currentTime, currentDate, currentMode };
};
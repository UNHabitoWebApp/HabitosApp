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
        dispatch(updateCurrentTime()); // Llama a la acción que actualiza el tiempo
    };

    const resetDateAction = () => {
        dispatch(resetToToday()); // Llama a la acción para restablecer la fecha
    };

    return { updateCurrentTimeAction, resetDateAction }; // Asegúrate de que estas funciones se estén exportando
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

export const useCurrentTimeAndDate = () => {
    const currentTime = useAppSelector((state) => state.date.currentTime);
    const currentDate = useAppSelector((state) => state.date.currentDate);
    return { currentTime, currentDate };
};
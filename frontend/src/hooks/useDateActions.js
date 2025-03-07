import { 
    updateCurrentTime, 
    resetToToday,    
    selectDaysOfWeek,
    selectRemainingTime,
    selectRemainingTimeForNextMinute,
    forward,
    backward,
    toggleMode,
    resetCurrentValues,
    selectActualDateLabel,
    setDay,
    setneedFetch,
    setSearch
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

    const resetCurrent = () => {
        dispatch(resetCurrentValues());
    }

    const clickDay = (day) => {
        dispatch(setDay(day));
    }

    const solicitarFetch = (value) => {
        dispatch(setneedFetch(value));
    }

    const setSearchParam = (value) => {
        dispatch(setSearch(value));
    }

    return { 
        updateCurrentTimeAction, 
        resetDateAction, 
        forwardAction, 
        backwardAction,
        toggleModeAction,
        resetCurrent,
        clickDay,
        solicitarFetch,
        setSearchParam
    };
};

export const useDateSelectors = () => {
    const daysOfWeek = useAppSelector(selectDaysOfWeek);
    const remainingTime = useAppSelector(selectRemainingTime);
    const remainingTimeForNextMinute = useAppSelector(selectRemainingTimeForNextMinute);
    const actualLabel = useAppSelector(selectActualDateLabel);

    return {
        daysOfWeek,
        remainingTime,
        remainingTimeForNextMinute,
        actualLabel
    };
};

export const useCurrentDateInfo = () => {
    const currentTime = useAppSelector((state) => state.date.currentTime);
    const currentDate = useAppSelector((state) => state.date.currentDate);
    const currentMode = useAppSelector((state) => state.date.mode);
    const selectedWeek = useAppSelector((state) => state.date.selectedWeek);
    const selectedDate = useAppSelector((state) => state.date.selectedDate);
    const startDate = useAppSelector((state) => state.date.startDate);
    const endDate = useAppSelector((state) => state.date.endDate);
    const needFetch = useAppSelector((state) => state.date.needFetch);
    const lastStartDate = useAppSelector((state) => state.date.lastStartDate);
    const lastEndDate = useAppSelector((state) => state.date.lastEndDate);
    const search = useAppSelector((state) => state.date.search);
    return { 
        currentTime, 
        currentDate, 
        currentMode, 
        selectedWeek, 
        selectedDate , 
        startDate, 
        endDate , 
        needFetch, 
        lastStartDate, 
        lastEndDate, 
        search
    };
};
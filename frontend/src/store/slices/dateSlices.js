import { createSlice, createSelector } from '@reduxjs/toolkit';
import moment from 'moment';
import 'moment/locale/es';
import { getMonthName, momentToObject } from '../../utils/dateUtils';

moment.locale('es');
moment.updateLocale('es', {
    week: { dow: 1 }, 
});

const DEFAULT_STATE = {
    currentWeek: moment().week(),
    currentDate: momentToObject(moment()),
    currentDateMomentISO: moment().toISOString(),
    currentTime: moment().format('hh:mm A'), 
    daysOfWeek: [], 
    selectedDate: momentToObject(moment()),
    selectedWeek: moment().week(),
    mode: 'week',
    startDate: moment().subtract(2, 'weeks').startOf('week').format('YYYY-MM-DD'),
    endDate: moment().add(2, 'weeks').endOf('week').format('YYYY-MM-DD'),
    lastStartDate: null,
    lastEndDate: null,
    needFetch: false,
    search: '',
};

const initialState = DEFAULT_STATE;

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        updateCurrentWeek: (state, action) => {
            state.currentWeek = action.payload;
        },
        resetToToday: (state) => {
            state.currentWeek = moment().week();
            state.currentDate = momentToObject(moment());
            state.currentDateMomentISO = moment().toISOString();
        },
        updateCurrentTime: (state) => {
            state.currentTime = moment().format('hh:mm A'); 
        },
        forward: (state) => {
            const currentDateMoment = moment(state.currentDateMomentISO);
            if (state.mode === 'week') {
                state.selectedWeek += 1; // Avanzar una semana

                if (currentDateMoment.week() !== state.selectedWeek) {
                    state.lastEndDate = state.endDate;
                    state.selectedDate = momentToObject(currentDateMoment.add(1, 'week'));
                    state.currentDateMomentISO = currentDateMoment.toISOString();
                    state.search = "forward";
                }

                // Verificar si la nueva fecha es mayor que endDate
                if (currentDateMoment.isAfter(moment(state.endDate))) {
                    state.lastEndDate = state.endDate;
                    state.endDate = moment(state.endDate).add(1, 'month').endOf('week').format('YYYY-MM-DD');
                    state.needFetch = true;
                    state.search = "forward";
                }
            } else {
                const newDate = currentDateMoment.add(1, 'day'); 
                state.currentDateMomentISO = newDate.toISOString();
        
                if (newDate.week() !== state.selectedWeek) {
                    state.selectedWeek = newDate.week();
                }   
                state.selectedDate = momentToObject(newDate);

                // Verificar si la nueva fecha es mayor que endDate
                if (newDate.isAfter(moment(state.endDate))) {
                    state.endDate = moment(state.endDate).add(1, 'month').endOf('week').format('YYYY-MM-DD');
                    state.needFetch = true;
                }
            }
        },
        backward: (state) => {
            const currentDateMoment = moment(state.currentDateMomentISO);
            if (state.mode === 'week') {
                state.selectedWeek -= 1; 

                if (currentDateMoment.week() !== state.selectedWeek) {
                    state.selectedDate = momentToObject(currentDateMoment.subtract(1, 'week'));
                    state.currentDateMomentISO = currentDateMoment.toISOString();
                }

                // Verificar si la nueva fecha es menor que startDate
                if (currentDateMoment.isBefore(moment(state.startDate))) {
                    state.lastStartDate = state.startDate;
                    state.startDate = moment(state.startDate).subtract(1, 'month').startOf('week').format('YYYY-MM-DD');
                    state.needFetch = true;
                    state.search = "backward";
                }
            } else {
                const newDate = currentDateMoment.subtract(1, 'day');
                state.currentDateMomentISO = newDate.toISOString();
                if (newDate.week() !== state.selectedWeek) {
                    state.selectedWeek = newDate.week();
                }
                state.selectedDate = momentToObject(newDate);

                // Verificar si la nueva fecha es menor que startDate
                if (newDate.isBefore(moment(state.startDate))) {
                    state.lastStartDate = state.startDate;
                    state.startDate = moment(state.startDate).subtract(1, 'month').startOf('week').format('YYYY-MM-DD');
                    state.needFetch = true;
                    state.search = "backward";
                }
            }
        },
        toggleMode : (state) => {
            state.mode = state.mode === 'week' ? 'day' : 'week';
        },
        resetCurrentValues: (state) => {
            state.selectedDate = momentToObject(moment());
            state.selectedWeek = moment().week();
            state.currentDateMomentISO = moment().toISOString();
        },
        setDay: (state, action) => {
            const { date, monthNumber, year } = action.payload;

            const newDate = moment(`${year}-${monthNumber}-${date}`, "YYYY-MM-DD");

            state.selectedDate = momentToObject(newDate);
            state.currentDateMomentISO = newDate.toISOString();
            state.selectedWeek = newDate.week();
            state.mode = 'day';
        },
        setneedFetch: (state, action) => {
            state.needFetch = action.payload;   
        },
        setSearch: (state, action) => { 
            if(action.payload === 'regenerate'){
                state.search = action.payload;
                state.needFetch = true;
            }   
        }
    },
});

export const selectDaysOfWeek = createSelector(
    (state) => state.date,
    ({ selectedWeek , currentDate }) => {
        const startOfWeek = moment()
            .year(moment(currentDate).year())
            .week(selectedWeek)
            .startOf('week');

        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(momentToObject(startOfWeek));
            startOfWeek.add(1, 'day');
        }

        return days;
    }
);

export const selectRemainingTime = createSelector(
    (state) => state.date,
    () => {
        const endOfDay = moment().endOf('day');
        const remainingTime = endOfDay.diff(moment(), 'milliseconds');
        return remainingTime;
    }
);

export const selectRemainingTimeForNextMinute = createSelector(
    (state) => state.date,
    () => {
        const currentMoment = moment();
        const nextMinute = moment().add(1, 'minute').startOf('minute');
        const remainingTime = nextMinute.diff(currentMoment, 'milliseconds');
        return remainingTime;
    }
);

export const selectActualDateLabel = createSelector(
    (state) => state.date,
    ({ selectedWeek, mode, selectedDate }) => {
        if(mode === 'week') {
            const startOfWeek = moment().week(selectedWeek).startOf('week');
            const endOfWeek = moment().week(selectedWeek).endOf('week');
    
            const startMonth = getMonthName(startOfWeek.format('MMM'));
            const endMonth = getMonthName(endOfWeek.format('MMM'));
            const startYear = startOfWeek.format('YYYY');
            const endYear = endOfWeek.format('YYYY');
            if (startYear !== endYear) {
                return `${startMonth} de ${startYear} - ${endMonth} de ${endYear}`;
            }
            return startMonth === endMonth ? `${startMonth} de ${startYear}` : `${startMonth}-${endMonth} de ${startYear}`;
        }else{
            return `${selectedDate.date} de ${getMonthName(selectedDate.month)} de ${selectedDate.year}`;
        }
    }
);

export const { 
    updateCurrentWeek, 
    resetToToday, 
    updateCurrentTime, 
    forward , 
    backward,
    toggleMode,
    resetCurrentValues,
    setDay,
    setneedFetch,
    setSearch
} = dateSlice.actions;
export default dateSlice.reducer;
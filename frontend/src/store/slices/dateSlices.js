    import { createSlice, createSelector } from '@reduxjs/toolkit';
    import moment from 'moment';
    import 'moment/locale/es';
    import { momentToObject } from '../../utils/dateUtils';

    moment.locale('es');
    moment.updateLocale('es', {
        week: { dow: 1 }, // Inicia la semana en lunes
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
                        state.selectedDate = momentToObject(currentDateMoment.add(1, 'week'));
                        state.currentDateMomentISO = currentDateMoment.toISOString();
                    }
                } else {
                    const newDate = currentDateMoment.add(1, 'day'); 
                    state.currentDateMomentISO = newDate.toISOString();
            
                    if (newDate.week() !== state.selectedWeek) {
                        state.selectedWeek = newDate.week();
                    }   
                    state.selectedDate = momentToObject(newDate);
                }
            },
            backward: (state) => {
                const currentDateMoment = moment(state.currentDateMomentISO);
                if (state.mode === 'week') {
                    state.selectedWeek -= 1; 

                    if (currentDateMoment .week() !== state.selectedWeek) {
                        state.selectedDate = momentToObject(currentDateMoment.subtract(1, 'week'));
                        state.currentDateMomentISO = currentDateMoment.toISOString();
                    }
                } else {
                    const newDate = currentDateMoment.subtract(1, 'day');
                    state.currentDateMomentISO = newDate.toISOString();
                    if (newDate.week() !== state.selectedWeek) {
                        state.selectedWeek = newDate.week();
                    }
                    state.selectedDate = momentToObject(newDate);
                }
            },
            toggleMode : (state) => {
                state.mode = state.mode === 'week' ? 'day' : 'week';
            },
            resetCurrentValues: (state) => {
                state.selectedDate = momentToObject(moment());
                state.selectedWeek = moment().week();
                state.currentDateMomentISO = moment().toISOString();
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

    export const { 
        updateCurrentWeek, 
        resetToToday, 
        updateCurrentTime, 
        forward , 
        backward,
        toggleMode,
        resetCurrentValues
    } = dateSlice.actions;
    export default dateSlice.reducer;
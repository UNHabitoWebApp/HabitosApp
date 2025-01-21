import { createSlice, createSelector } from '@reduxjs/toolkit';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');
moment.updateLocale('es', {
    week: { dow: 1 }, // Inicia la semana en lunes
});

const DEFAULT_STATE = {
    currentWeek: moment().week(),
    currentDate: moment().format('YYYY-MM-DD'),
    currentTime: moment().format('hh:mm A'), 
    daysOfWeek: [], 
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
            state.currentDate = moment().format('YYYY-MM-DD');
        },
        updateCurrentTime: (state) => {
            state.currentTime = moment().format('hh:mm A'); 
        },
        getDaysOfWeek: (state) => {
            const startOfWeek = moment()
                .year(moment(state.currentDate).year())
                .week(state.currentWeek)
                .startOf('week');

            const days = [];
            for (let i = 0; i < 7; i++) {
                days.push({
                    day: startOfWeek.format('dddd'),
                    date: startOfWeek.format('DD'),
                    month: startOfWeek.format('MMMM'),
                    year: startOfWeek.format('YYYY'),
                });
                startOfWeek.add(1, 'day');
            }

            return days;
        },
    },
});

// Selector para calcular los días de la semana
export const selectDaysOfWeek = createSelector(
    (state) => state.date, // Estado de Redux relacionado con las fechas
    ({ currentWeek, currentDate }) => {
        const startOfWeek = moment()
            .year(moment(currentDate).year())
            .week(currentWeek)
            .startOf('week');

        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push({
                day: startOfWeek.format('dddd'),
                date: startOfWeek.format('DD'),
                month: startOfWeek.format('MMMM'),
                year: startOfWeek.format('YYYY'),
            });
            startOfWeek.add(1, 'day');
        }

        return days;
    }
);

// Selector para calcular el tiempo restante hasta medianoche
export const selectRemainingTime = createSelector(
    (state) => state.date, // Estado de Redux relacionado con las fechas
    () => {
        const endOfDay = moment().endOf('day');
        const remainingTime = endOfDay.diff(moment(), 'milliseconds');
        return remainingTime;
    }
);

export const selectRemainingTimeForNextMinute = createSelector(
    (state) => state.date, // Estado de Redux relacionado con las fechas
    () => {
        // Obtener el momento actual
        const currentMoment = moment();

        // Calcular el próximo minuto
        const nextMinute = moment().add(1, 'minute').startOf('minute');

        // Calcular el tiempo restante hasta el siguiente minuto en milisegundos
        const remainingTime = nextMinute.diff(currentMoment, 'milliseconds');

        return remainingTime;
    }
);


export const { updateCurrentWeek, resetToToday, updateCurrentTime, getDaysOfWeek } = dateSlice.actions;
export default dateSlice.reducer;
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
    currrentDateMoment:moment(),
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
            state.currentDate = moment().format('YYYY-MM-DD');
        },
        updateCurrentTime: (state) => {
            state.currentTime = moment().format('hh:mm A'); 
        },
        forward: (state) => {
            if (state.mode === 'week') {
                state.selectedWeek += 1; // Avanzar una semana

                if (state.currrentDateMoment.week() !== state.selectedWeek) {
                    state.selectedDate = momentToObject(state.currrentDateMoment.add(1, 'week'));
                }
            } else {
                // Reconstruir un objeto moment a partir de selectedDate
                const newDate = state.currrentDateMoment.add(1, 'day'); 
        
                if (newDate.week() !== state.selectedWeek) {
                    state.selectedWeek = newDate.week();
                }

                // Actualizar selectedDate
                state.selectedDate = momentToObject(newDate);
            }
        },
        backward: (state) => {
            if (state.mode === 'week') {
                state.selectedWeek -= 1; 

                if (state.currrentDateMoment.week() !== state.selectedWeek) {
                    state.selectedDate = momentToObject(state.currrentDateMoment.subtract(1, 'week'));
                }
                
            } else {
                const newDate = state.currrentDateMoment.subtract(1, 'day');
        

                if (newDate.week() !== state.selectedWeek) {
                    state.selectedWeek = newDate.week();
                }

                // Actualizar selectedDate
                state.selectedDate = momentToObject(newDate);
            }
        },
        toggleMode : (state) => {
            state.mode = state.mode === 'week' ? 'day' : 'week';
        },
        resetCurrentValues: (state) => {
            state.selectedDate = momentToObject(moment());
            state.selectedWeek = moment().week();
        }
    },
});

// Selector para calcular los días de la semana
export const selectDaysOfWeek = createSelector(
    (state) => state.date, // Estado de Redux relacionado con las fechas
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


export const { 
    updateCurrentWeek, 
    resetToToday, 
    updateCurrentTime, 
    getDaysOfWeek ,
    forward , 
    backward,
    toggleMode,
    resetCurrentValues
} = dateSlice.actions;
export default dateSlice.reducer;
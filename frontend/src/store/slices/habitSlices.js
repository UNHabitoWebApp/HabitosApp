import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from "@reduxjs/toolkit";
import { DEFAULT_STATE } from '../DEFAULT_STATES';



const initialState = (() => {
    const persistedState = localStorage.getItem("__redux__state__");

    if (!persistedState) {
        return DEFAULT_STATE; // Si no hay datos en localStorage, usar el estado por defecto
    }

    try {
        const parsedState = JSON.parse(persistedState); // Convertir el string en un objeto

        if (!parsedState.habits) {
            return DEFAULT_STATE;
        }

        return parsedState.habits; 
    } catch (error) {
        console.error("Error al parsear localStorage:", error);
        return DEFAULT_STATE; // En caso de error, usar el estado por defecto
    }
})();


const habitSlice = createSlice({
	name: "habits",
	initialState,
	reducers: {
		addHabit: (state, action) => {
			const { year, month, day, habit } = action.payload;

			// Asegurar estructura anidada
			if (!state[year]) state[year] = {};
			if (!state[year][month]) state[year][month] = {};
			if (!state[year][month][day]) state[year][month][day] = { habits: [] };

			// Agregar hábito al día correspondiente
			state[year][month][day].habits.push({
				...habit,
				id: crypto.randomUUID(),
			});
		},

		removeHabit: (state, action) => {
			const { year, month, day, habitId } = action.payload;

			if (state[year]?.[month]?.[day]?.habits) {
				state[year][month][day].habits = state[year][month][day].habits.filter(
					(habit) => habit.id !== habitId
				);

				// Elimina estructuras vacías para evitar objetos innecesarios
				if (state[year][month][day].habits.length === 0) delete state[year][month][day];
				if (Object.keys(state[year][month]).length === 0) delete state[year][month];
				if (Object.keys(state[year]).length === 0) delete state[year];
			}
		},

		updateHabit: (state, action) => {
			const { year, month, day, habitId, updates } = action.payload;

			if (state[year]?.[month]?.[day]?.habits) {
				const habitIndex = state[year][month][day].habits.findIndex(
					(habit) => habit.id === habitId
				);
				if (habitIndex !== -1) {
					state[year][month][day].habits[habitIndex] = {
						...state[year][month][day].habits[habitIndex],
						...updates,
					};
				}
			}
		},
  	},
});

// 📌 Selector para obtener hábitos de una lista de fechas
export const selectHabitsByDates = createSelector(
    [(state) => state.habits, (_, dates) => dates], // Mantener input selector puro
    (habits, dates) => {
        return dates.map(({ year, monthNumber, date }) => ({
            year,
            monthNumber,
            date,
            habits: habits[year]?.[monthNumber]?.[date]?.habits || [],
        }));
    }
);

export const { addHabit, removeHabit, updateHabit } = habitSlice.actions;
export default habitSlice.reducer;
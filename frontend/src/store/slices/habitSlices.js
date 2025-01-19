import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_STATE = []; // El estado inicial es un array.


const initialState = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).habits : DEFAULT_STATE;
})();


const habitSlice = createSlice({
	name: 'habits',
	initialState,
	reducers: {
		addHabit: (state, action) => {   
			const id = crypto.randomUUID(); // Genera un ID único.
			state.push({ ...action.payload, id });
		},
		removeHabit: (state, action) => {
			return state.filter((habit) => habit.id !== action.payload);
		},
		updateHabit: (state, action) => {
			// Encuentra el índice del hábito a actualizar.
			const index = state.findIndex((habit) => habit.id === action.payload.id);
			if (index !== -1) {
				// Actualiza el hábito en la posición correspondiente.
				state[index] = { ...state[index], ...action.payload };
			}
		},
	},
});

export const { addHabit, removeHabit, updateHabit } = habitSlice.actions;
export default habitSlice.reducer;

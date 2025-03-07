import { createSlice, createSelector } from '@reduxjs/toolkit';
import { DEFAULT_STATE } from '../DEFAULT_STATES';

const initialState = (() => {
    const persistedState = localStorage.getItem("__redux__state__");

    if (!persistedState) {
        return DEFAULT_STATE; 
    }

    try {
        const parsedState = JSON.parse(persistedState); 

        if (!parsedState.habits) {
            return DEFAULT_STATE;	
        }

        return parsedState.habits; 
    } catch (error) {
        console.error("Error al parsear localStorage:", error);
        return DEFAULT_STATE; 
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
			state[year][month][day].habits.push(habit);
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
		},/*
		addFetchedHabits: (state, action) => {
			const { events } = action.payload;
	  
			Object.entries(events).forEach(([year, months]) => {
			  if (!state.habits[year]) state.habits[year] = {};
	  
			  Object.entries(months).forEach(([month, days]) => {
				if (!state.habits[year][month]) state.habits[year][month] = {};
	  
				Object.entries(days).forEach(([day, habits]) => {
				  if (!state.habits[year][month][day]) {
					state.habits[year][month][day] = { habits: [] };
				  }
	  
				  state.habits[year][month][day].habits = habits.map(habit => ({
					id: habit.id,
					name: habit.name,
					description: habit.description || "",
					start: habit.beginTime,
					end: habit.endTime,
					type: habit.type,
					isHabit: habit.habit,
				  }));
				});
			  });
			});*/
			addFetchedHabits: (state, action) => {
				const { events } = action.payload;
			
				if (!events || typeof events !== "object") {
					console.error("Eventos inválidos recibidos en addFetchedHabits:", events);
					return;
				}
			
				Object.entries(events).forEach(([year,months]) => {
					console.log("year", year);
					if (!state[year]) state[year] = {}; 
					Object.entries(months).forEach(([month, days]) => {
						if (!state[year][month]) state[year][month] = {}; 
			
						Object.entries(days).forEach(([day, habits]) => {
							console.log(day);
							if (!Array.isArray(habits)) {
								//console.warn(`Los hábitos del día ${year}-${month}-${day} no son un array:`, habits);
								return;
							}
			
							console.log(habits.map(habit => ({
								id: habit.id,
								name: habit.name,
								description: habit.description || "",
								start: habit.beginTime,
								end: habit.endTime,
								type: habit.type,
								isHabit: habit.habit,
							})))

							state[year][month][day] = {
								habits: habits.map(habit => ({
									id: habit.id,
									name: habit.name,
									description: habit.description || "",
									start: habit.beginTime,
									end: habit.endTime,
									type: habit.type,
									isHabit: habit.habit,
								}))
							};
						});
					});
				});
			
			}			
		}
  	},
);

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

export const { addHabit, removeHabit, updateHabit, addFetchedHabits } = habitSlice.actions;
export default habitSlice.reducer;
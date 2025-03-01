import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openHabitManager: false,
    isSidebarOpen: false,
    isModalOpen: false, 
};

const controlSlice = createSlice({
    name: "control",
    initialState,
    reducers: {
        setControlVariable: (state, action) => {
            const { key, value } = action.payload;
            if (key in state) {
                state[key] = value; // Solo modifica si la clave existe en el estado
            }
        },
        resetControlVariable: (state, action) => {
            const key = action.payload;
            if (key in initialState) {
                state[key] = initialState[key]; // Restablece solo esa variable
            }
        },
        resetAllControlVariables: () => {
            return { ...initialState }; 
        },
    },
});

// Exportamos las acciones para usarlas en los componentes
export const { setControlVariable, resetControlVariable, resetAllControlVariables } = controlSlice.actions;

// Selector para obtener una variable específica
export const selectControlVariable = (state, key) => state.control[key];

export default controlSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: localStorage.getItem('accessToken')? localStorage.getItem('accessToken') : "",
    nombre: "Bichota",
    correo: "",
    isLoggedIn: localStorage.getItem('accessToken')? true : false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { accessToken, nombre, correo, isLoggedIn } = action.payload;
            if (accessToken !== undefined) state.accessToken = accessToken;
            if (nombre !== undefined) state.nombre = nombre;
            if (correo !== undefined) state.correo = correo;
            if (isLoggedIn !== undefined) state.isLoggedIn = isLoggedIn;
        },
        logoutUser: () => {
            return { ...initialState };
        },
    },
});

// Exportamos las acciones para usarlas en los componentes
export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

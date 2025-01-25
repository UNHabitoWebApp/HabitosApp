import { configureStore } from '@reduxjs/toolkit';
import habitReducer from './slices/habitSlices';
import dateReducer from './slices/dateSlices';

const persistanceLocalStorageMiddleware = store => next => action => {
    next(action); // Asegura que la acción fluya a través de los middlewares

    const state = store.getState();
    // Crea una copia profunda del estado pero excluye la propiedad `date`
    const stateToPersist = { ...state };

    // Elimina cualquier propiedad que no quieras persistir
    delete stateToPersist.date;

    // Puedes validar o limpiar aún más aquí si necesitas manejar más propiedades

    try {
        // Serializa y guarda el estado en localStorage
        localStorage.setItem("__redux__state__", JSON.stringify(stateToPersist));
    } catch (error) {
        console.error("Error al guardar en localStorage:", error);
    }
};

const store = configureStore({
	reducer: {
		habits: habitReducer,
		date: dateReducer,
	},
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware(),
		persistanceLocalStorageMiddleware,
	],
});

export default store;
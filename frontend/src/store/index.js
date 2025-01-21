import { configureStore } from '@reduxjs/toolkit';
import habitReducer from './slices/habitSlices';
import dateReducer from './slices/dateSlices';

const persistanceLocalStorageMiddleware = store => next => action => {
    next(action);
    const stateToPersist = { ...store.getState() };
    delete stateToPersist.date; // No persistas las fechas
    localStorage.setItem("__redux__state__", JSON.stringify(stateToPersist));
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
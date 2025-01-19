import { configureStore } from '@reduxjs/toolkit';
import habitReducer from './slices/habitSlices';

const persistanceLocalStorageMiddleware = store => next => action => {
	next(action);
	localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
};

const store = configureStore({
	reducer: {
		habits: habitReducer,
	},
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware(),
		persistanceLocalStorageMiddleware,
	],
});

export default store;
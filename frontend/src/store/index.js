import { configureStore } from '@reduxjs/toolkit';
import habitReducer from './slices/habitSlices';



const store = configureStore({
	reducer: {
		habits: habitReducer,
	},
});

export default store;
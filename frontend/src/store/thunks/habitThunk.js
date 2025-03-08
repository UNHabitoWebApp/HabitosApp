// thunks/habitThunks.js
import { fetchHabitsRange } from '../../service/fetchHabitsRange'; 
import { addFetchedHabits } from '../slices/habitSlices';

export const loadInitialHabits = () => async (dispatch, getState) => {
    const { startDate, endDate } = getState().date; // Obtener fechas del estado de Redux

    try {
        const events = await fetchHabitsRange(startDate, endDate); // Llamar a la API
        if (events) {
            dispatch(addFetchedHabits({ events })); // Despachar acción para guardar los datos
        }
    } catch (error) {
        console.error("Error al cargar los hábitos iniciales:", error);
    }
};
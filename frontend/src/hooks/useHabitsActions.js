import { useAppDispatch, useAppSelector } from './store';
import { addFetchedHabits, addHabit, removeHabit, selectHabitsByDates } from "../store/slices/habitSlices";

export const useHabitsActions = () => {
    const dispatch = useAppDispatch();

    const addDefaultHabbit = () => {
        const newHabit = {
            "year": "2025",
            "month": "2",
            "day": "15",
            "habit": { name: "Leer 20 páginas al día" }
        };
        dispatch(addHabit(newHabit));
    }    

    const addNewHabit = (habit) => {
        dispatch(addHabit(habit));
    }

    const removeNewHabit = (id) => {
        dispatch(removeHabit(id));
    }

    const addHabits = (events) => {
        dispatch(addFetchedHabits( events ));
    };

    return { addDefaultHabbit, addNewHabit, removeNewHabit, addHabits };
};

export const useEventsOfWeek = (dates) => {
    return useAppSelector((state) => selectHabitsByDates(state, dates)); // ✅ Pasa `state` correctamente
};

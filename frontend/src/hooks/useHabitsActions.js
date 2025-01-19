import { useAppDispatch } from "./store";
import { addHabit, removeHabit } from "../store/slices/habitSlices";

export const useHabitsActions = () => {
    const dispatch = useAppDispatch();

    const addDefaultHabbit = () => {
        const newHabit = { name: "Leer 20 páginas al día" };
        dispatch(addHabit(newHabit));
    }    

    const addNewHabit = (habit) => {
        dispatch(addHabit(habit));
    }

    const removeNewHabit = (id) => {
        dispatch(removeHabit(id));
    }

    return { addDefaultHabbit, addNewHabit, removeNewHabit };
}

import { useAppDispatch } from "./store";
import { addHabit } from "../store/slices/habitSlices";

export const useHabitsActions = () => {
    const dispatch = useAppDispatch();

    const addDefaultHabbit = () => {
        const newHabit = { name: "Leer 20 páginas al día" };
        dispatch(addHabit(newHabit));
    }    

    const addNewHabit = (habit) => {
        dispatch(addHabit(habit));
    }

    return { addDefaultHabbit, addNewHabit };
}

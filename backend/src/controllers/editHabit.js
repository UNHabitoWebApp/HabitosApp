import HabitService from "../services/habitService.js";

export const patchHabit = async (request, response) => {    
    const habit_service_obj = new HabitService();
    const user_id  = request.user_id;
    const habit_id = request.params.id;
    const habitData = request.body;
    const habitUpdate  = await habit_service_obj.updateHabit(habit_id, user_id, habitData);
    if (!habitUpdate) {
        return response.status(404).json({ message: "Hábito no encontrado" });
    }
    console.log("Hábito actualizado:", habitUpdate);
    return response.status(200).json(habitUpdate);
}
    
export const getHabitByUser = async (request, response) => {
    const habit_service_obj = new HabitService();
    const user_id = request.user_id;
    const habits = await habit_service_obj.habits_by_user(user_id);
    console.log("Hábitos encontrados:", habits);
    return response.status(200).json(habits);
}

export const createHabit = async (request, response) => {
    const newHabit = request.body;
    newHabit.userId = request.user_id;
    const habit_service_obj = new HabitService();
    const habit = await habit_service_obj.createHabit(newHabit);
    console.log("Hábito guardado:", habit);
    return response.status(201).json(habit);
}

export const getHabitById = async (request, response) => {
    const habit_service_obj = new HabitService();
    const user_id = request.user_id;
    const habit_id = request.params.id;
    console.log("Hábito a buscar:", habit_id);
    const habit = await habit_service_obj.getHabitById(habit_id, user_id);
    if (!habit) {
        return response.status(404).json({ message: "Hábito no encontrado" });
    }
    console.log("Hábito encontrado:", habit);
    return response.status(200).json(habit);
}
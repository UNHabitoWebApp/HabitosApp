import CreateHabitService from "../services/createHabitService.js";

export const createHabit = async (request, response) => {
    const newHabit = { ...request.body };
    const habit_service_obj = new CreateHabitService();
    const habit = await habit_service_obj.createHabit(newHabit);
    console.log("Hábito guardado:", habit);
    return response.status(201).json(habit);
}

export const createRoutine = async (request, response) => {
    const newRoutine = { ...request.body };
    const habit_service_obj = new CreateHabitService();
    const routine = await habit_service_obj.createRoutine(newRoutine);
    console.log("Rutina guardada:", routine);
    return response.status(201).json(routine);
}
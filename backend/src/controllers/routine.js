import RoutineService from "../services/routine.js";
import HabitService from "../services/habitService.js";

export const patchRoutine = async (request, response) => {
    const routine_service_obj = new RoutineService();
    const habit_service_obj = new HabitService();
    const user_id = request.user_id;
    const routine_id = request.params.id;
    const routineData = request.body;
    const routine = await routine_service_obj.getRoutineById(routine_id, user_id);
    // Recorre el array de hábitos en la rutina
    for (let habit of routineData.exercises) {
        console.log("Hábito:", habit);
        habit.userId = user_id;
        if (!habit._id) {
            // Si el hábito no tiene _id, créalo
            const newHabit = await habit_service_obj.createHabit({
                ...habit,
                beginTime: habit.beginTime,
                endTime: habit.endTime,
                days: habit.days,
                notifyMe: habit.notifyMe
            });
            habit._id = newHabit._id; // Asigna el _id del nuevo hábito al objeto habit
        } else {
            // Si el hábito tiene _id, actualízalo
            await habit_service_obj.updateHabit(habit._id, user_id, {
                ...habit,
                beginTime: habit.beginTime,
                endTime: habit.endTime,
                days: habit.days,
                notifyMe: habit.notifyMe
            });
        }
    }
    
    const routineUpdate = await routine_service_obj.updateRoutine(routine_id, user_id, routineData);
    if (!routineUpdate) {
        return response.status(404).json({ message: "Rutina no encontrada" });
    }
    console.log("Rutina actualizada:", routineUpdate);
    return response.status(200).json(routineUpdate);
};

export const getRoutineByUser = async (request, response) => {
    const routine_service_obj = new RoutineService();
    const user_id = request.user_id;
    const routines = await routine_service_obj.routines_by_user(user_id);
    console.log("Rutinas encontradas:", routines);
    return response.status(200).json(routines);
}

export const createRoutine = async (request, response) => {
    const newRoutine = request.body;
    newRoutine.userId = request.user_id;
    const routine_service_obj = new RoutineService();
    const routine = await routine_service_obj.createRoutine(newRoutine);
    console.log("Rutina guardada:", routine);
    return response.status(201).json(routine);
}

export const deleteRoutine = async (request, response) => {
    const routine_service_obj = new RoutineService();
    const user_id = request.user_id;
    const routine_id = request.params.id;
    const routineDelete = await routine_service_obj.deleteRoutine(routine_id, user_id);
    if (!routineDelete) {
        return response.status(404).json({ message: "Rutina no encontrada" });
    }
    console.log("Rutina eliminada:", routineDelete);
    return response.status(200).json(routineDelete);
}

export const getRoutineById = async (request, response) => {
    const routine_service_obj = new RoutineService();
    const user_id = request.user_id;
    const routine_id = request.params.id;
    const routine = await routine_service_obj.getRoutineById(routine_id, user_id);
    if (!routine) {
        return response.status(404).json({ message: "Rutina no encontrada" });
    }
    console.log("Rutina encontrada:", routine);
    return response.status(200).json(routine);
}
import Habit from "../models/Habit.js";
import Routine from "../models/Routine.js";

export default class CreateHabitService {

    async createHabit (habitData) {
        const habit = new Habit(habitData);
        return await habit.save();
    }

    async createRoutine (routineData) {
        const routine = new Routine(routineData);
        return await routine.save();
    }
}
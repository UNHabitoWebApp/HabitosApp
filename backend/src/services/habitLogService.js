import HabitLog from "../models/HabitLog.js";
import Habit from "../models/Habit.js";
class HabitLogService {
    async getHabitLogById (habitLog_id) {
        return await HabitLog.findOne({ _id: habitLog_id  })
    }

    async updateHabitLog (habitLog_id, updateData) {
        return await Habit.findOneAndUpdate({ _id: habitLog_id }, updateData, { new: true });
    }

    async createHabitLog (habitLogData) {
        const habitLog = new HabitLog(habitLogData);
        return await habitLog.save();
    }

    async habitLogs_by_habit (habit_id) {
        return await HabitLog.find({ habit_id: habit_id });
    }

    async habitLogs_by_date (habit_id, date) {
        return await HabitLog.find({ habit_id: habit_id, date: date });
    }

    async habitLogsByHabits( user_id) {
        console.log("HabitLogService.habitLogsByHabits", user_id);
        const habits_by_user = await Habit.find({ userId: user_id }); // Espera a que la promesa se resuelva\
        console.log("Hábit", habits_by_user);
        const habitIds = habits_by_user.map(habit => habit._id.toString()); // Usa el método map en el array resuelto
        console.log("Hábitos", habitIds);
        return await HabitLog.find({ habit_id: { $in: habitIds } });
    }

}

export default HabitLogService;
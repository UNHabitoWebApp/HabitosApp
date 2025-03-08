import HabitLog from "../models/HabitLog.js";
import Habit from "../models/HabitLog.js";
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

    async habitLogsByHabits (habits, user_id) {
        const habits_by_user = Habit.find({ userId: user_id });
        const habitIds = habits.map(habits_by_user => habits_by_user._id);
        return await HabitLog.find({ habit_id: { $in: habitIds } });
    }

}

export default HabitLogService;
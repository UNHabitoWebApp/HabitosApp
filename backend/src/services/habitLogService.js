import HabitLog from "../models/HabitLog.js";
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

}

export default HabitLogService;
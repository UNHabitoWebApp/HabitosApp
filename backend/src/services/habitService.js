import Habit from "../models/Habit.js";

export default class HabitService {

    async getHabitById (habit_id, user_id) {
        return await Habit.findOne({ _id: habit_id, userId: user_id });
    }

    async updateHabit (habit_id, user_id, updateData) {
        return await Habit.findOneAndUpdate({ _id: habit_id, userId: user_id }, updateData, { new: true });
    }

    async habits_by_user (user_id) {
        return await Habit.find({ userId: user_id });
    }

    async createHabit (habitData) {
        const habit = new Habit(habitData);
        return await habit.save();
    }
}

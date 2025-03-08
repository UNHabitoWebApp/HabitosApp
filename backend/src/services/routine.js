import Routine from "../models/Routine.js";

export default class RoutineService {
    
    async getRoutineById (routine_id, user_id) {
        return await Routine.findOne({ _id: routine_id, userId: user_id }).populate("exercises").lean().exec();;
    }

    async updateRoutine (routine_id, user_id, updateData) {
        return await Routine.findOneAndUpdate({ _id: routine_id, userId: user_id }, updateData, { new: true });
    }

    async routines_by_user (user_id) {
        return await Routine.find({ userId: user_id }).populate("exercises").lean().exec();
    }

    async createRoutine (routineData) {
        const routine = new Routine(routineData);
        return await routine.save();
    }

    async deleteRoutine (routine_id, user_id) {
        return await Routine.findOneAndDelete({ _id: routine_id, userId: user_id });
    }

}
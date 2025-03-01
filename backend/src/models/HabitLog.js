import mongoose from "../config/mongoConfig.js";

const VariableSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true }, // Dynamic value
    set: { type: Number, required: false, default: 0 },
    reps: { type: Number, required: false, default: 0 },
    kilograms: { type: Number, required: false, default: 0 },
    observation: { type: String, required: false }
});

const HabitLogSchema = new mongoose.Schema(
    {
        routine_id: { type: mongoose.Schema.Types.ObjectId, ref: "Routine", required: false },
        habit_id: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true },
        date: { type: Date, required: true },
        completionTime: { type: String, required: false },
        variables: { type: [VariableSchema], required: false }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            getters: true,
            virtuals: true,
            transform: (doc, ret) => {
                ret.id = ret._id.toString();
                return ret;
            }
        },
        toObject: {
            getters: true,
            virtuals: true,
            transform: (doc, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
                return ret;
            }
        }
    }
);

const HabitLog = mongoose.model("HabitLog", HabitLogSchema);
export default HabitLog;
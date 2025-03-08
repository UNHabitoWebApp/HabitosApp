import mongoose from "../config/mongoConfig.js";

const VariableSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["enum", "integer", "boolean", "open"], required: true },
    config: {
        allowedValues: {
            type: [String],
            default: function () { return this.type === "enum" ? ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] : undefined; }
        },
        min: {
            type: Number,
            default: function () { return this.type === "integer" ? 1 : undefined; }
        },
        max: {
            type: Number,
            default: function () { return this.type === "integer" ? 1000 : undefined; }
        },
        maxLength: {
            type: Number,
            default: function () { return this.type === "open" ? 255 : undefined; } // Puedes cambiar 255 por el valor que prefieras
        }
    }
});

VariableSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
    }
});

const HabitSchema = new mongoose.Schema(
    {
        userId: { type: String, required: false },
        name: { type: String, required: true },
        exerciseType: { type: String, required: false },
        beginTime: { type: String, required: false },
        endTime: { type: String, required: false },
        days: { type: [String], required: false },
        notifyMe: { type: Boolean, required: false, default: false },
        variables: { type: [VariableSchema], required: false },
        personalized: { type: Boolean, required: false, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id.toString();
                ret.userId = ret.userId ? ret.userId.toString() : null;
                delete ret._id;
                return ret;
            }
        }
    }
);


const Habit = mongoose.model("Habit", HabitSchema);
export default Habit;
import mongoose from "../config/mongoConfig.js";

const RoutineSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true }, // Convertido a string
		name: { type: String, required: true },
		beginTime: { type: String, required: false }, // Formato HH:mm
		endTime: { type: String, required: false },
		days: { type: [String], required: false },
		notifyMe: { type: Boolean, required: false, default: false },
		exercises: [{ type: String, ref: "Habit" }] // Convertido a string
	},
	{
		timestamps: true,
		versionKey: false,
		toJSON: {
			transform: (doc, ret) => {
				ret.id = ret._id.toString();
				ret.userId = ret.userId.toString();
				ret.exercises = ret.exercises.map(e => e.toString());
				delete ret._id;
				return ret;
			}
		}
	}
);

const Routine = mongoose.model("Routine", RoutineSchema);
export default Routine;

import mongoose from "../config/mongoConfig.js";

const VariableSchema = new mongoose.Schema({
	name: { type: String, required: true },
	type: { type: String, enum: ["enum", "integer", "boolean", "open"], required: true },
	config: {
		allowedValues: { type: [String], required: function () { return this.type === "enum"; } },
		min: { type: Number, required: function () { return this.type === "integer"; } },
		max: { type: Number, required: function () { return this.type === "integer"; } },
		maxLength: { type: Number, required: function () { return this.type === "open"; } }
	}
});

const HabitSchema = new mongoose.Schema(
	{
		userId: { type: String, required: false }, // Convertido a string
		name: { type: String, required: true },
		exerciseType: { type: String, required: false },
		beginTime: { type: String, required: false }, // Formato HH:mm
		endTime: { type: String, required: false },
		days: { type: [String], required: false },
		notifyMe: { type: Boolean, required: false, default: false },
		variables: { type: [VariableSchema], required: false }
	},
	{
		timestamps: true,
		versionKey: false,
		toJSON: {
			transform: (doc, ret) => {
				ret.id = ret._id.toString();
				ret._userId = ret.userId ? ret.userId : null;
				ret.userId = ret.userId ? ret.userId.toString() : null;
				return ret;
			}
		}
	}
);

const Habit = mongoose.model("Habit", HabitSchema);
export default Habit;

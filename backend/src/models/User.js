import mongoose from "../config/mongoConfig.js";

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		lastLogin: {
			type: Date,
			default: Date.now
		}
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
				return ret;
			}
		}
	}
);

const User = mongoose.model("User", UserSchema);

export default User;
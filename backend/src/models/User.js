import mongoose from "../config/mongoConfig.js";

const transform = (doc, ret) => {
	ret.id = ret._id.toString();
	delete ret._id;
	return ret;
};

const modifyOptions = {
	getters: true,
	virtuals: true,
	transform
};

const UserSchema = new mongoose.Schema(
	{
		correo: {
			type: String,
			required: true,
			unique: true
		},
		contrasena: {
			type: String,
			required: true
		},
		nombre: {
			type: String,
			required: true
		},
		apellido: {
			type: String,
			required: true
		},
		ultimaVez: {
			type: Date,
			default: Date.now
		}
	},
	{
		timestamps: true,   // Agrega createdAt y updatedAt automáticamente
		versionKey: false,  // Elimina el campo __v
		toJSON: modifyOptions,
		toObject: modifyOptions
	}
);

const User = mongoose.model("User", UserSchema);

export default User;
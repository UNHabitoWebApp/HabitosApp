import mongoose from "../config/mongoConfig.js";

const UsuarioSchema = new mongoose.Schema(
	{
		correo: {
			type: String,
			required: true,
			unique: true
		},
		contraseña: {
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
		timestamps: true,
		versionKey: false
	}
);

const Usuario = mongoose.model("Usuario", UsuarioSchema);

export default Usuario;

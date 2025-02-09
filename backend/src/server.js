import app from "./app.js";
import { port } from "./config/config.js";
import { connectToDatabase } from "./config/mongoConfig.js";
//import User from "./models/User.js";

const startServer = async () => {
	try {

		await connectToDatabase()
			.catch((error) => {
				console.error("Error en MongoDB:", error.message);
				throw error;
			});
		/*
		await User.create({
			correo: "usuario@example.com",
			contrasena: "123456",
			nombre: "Usuario",
			apellido: "Ejemplo"
		});

		const nuevoUsuario = await User.findOne({ correo: "usuario@example.com" });

		if (nuevoUsuario) {
			console.log(nuevoUsuario.toJSON().nombre);
		}*/

		app.listen(port, () => {
			console.log(`Servidor encendido! Escuchando en el puerto: http://localhost:${port}`);
		});
	} catch (error) {
		console.error("Error al iniciar la aplicación:", error);
		process.exit(1);
	}
};

startServer();
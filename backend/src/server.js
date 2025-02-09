import app from "./app.js";
import { port } from "./config/config.js";
import { connectToDatabase } from "./config/mongoConfig.js";

const startServer = async () => {
	try {

		await connectToDatabase()
			.catch((error) => {
				console.error("Error en MongoDB:", error.message);
				throw error;
			});

		app.listen(port, () => {
			console.log(`Servidor encendido! Escuchando en el puerto: http://localhost:${port}`);
		});
	} catch (error) {
		console.error("Error al iniciar la aplicación:", error);
		process.exit(1);
	}
};

startServer();
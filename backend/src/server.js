import app from "./app.js";
import { port } from "./config/index.js";

const startServer = async () => {
	try {
		app.listen(port, () => {
			console.log(`Servidor encendido! Escuchando en el puerto: http://localhost:${port}`);
		});
	} catch (error) {
		console.error("Error al iniciar la aplicación:", error);
		process.exit(1);
	}
};

startServer();
import app from "./app.js";

const startServer = async () => {
    try {
        const port = process.env.PORT || 8080;

        app.listen(port, () => {
            console.log(`Servidor encendido! Escuchando en el puerto: ${port}`);
        });
    } catch (error) {
        console.error("Error al iniciar la aplicación:", error);
        process.exit(1);
    }
};

startServer();
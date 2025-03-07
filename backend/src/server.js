import app from "./app.js";
import { port } from "./config/config.js";
import { connectToDatabase } from "./config/mongoConfig.js";
import redisClient from "./config/redisConfig.js";
import mailerWorker from "./BullMQ/workers/emailWorker.js";
import { mailerQueue } from "./BullMQ/queues/mailerQueue.js";
import { cleanQueue } from "./utils/BullUtils.js";
import { cleanRedisKeys } from "./utils/RedisUtils.js";
import { createExample } from "./utils/crearHabito.js";
import { eventQueue } from "./BullMQ/queues/eventQueue.js";
import eventWorker from "./BullMQ/workers/eventWorker.js";
import sendEmail from "./utils/sendEmail.js";

const startServer = async () => {
    try {

        console.log("Iniciando servidor...");
        await connectToDatabase().then(
            () => console.log("✅ Conexión a MongoDB establecida.")
        ).catch((error) => {
            console.error("Error en MongoDB:", error.message);
            throw error;
        });

        redisClient.ping()
            .then(() => {
                console.log("✅ Conexión a Redis establecida. ");
                app.listen(port, () => {
                    console.log(`Servidor encendido! Escuchando en: http://localhost:${port}`);
                    console.log("");
                });
            })
            .catch((err) => console.error("❌ Error al conectar con Redis:", err));

        mailerWorker;
        eventWorker;
        // Enviar un correo de prueba
        //await createExample();
        //await cleanQueue(mailerQueue);
        //await cleanQueue(eventQueue);
        //await cleanRedisKeys();
    } catch (error) {
        console.error("❌ Error al iniciar la aplicación:", error);
        process.exit(1);
    }
};

startServer();

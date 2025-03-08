import redisClient from "../config/redisConfig.js";

export async function cleanRedisKeys() {
    const keys = await redisClient.keys("emailQueue:*"); // Obtiene todas las listas de emails
    if (keys.length > 0) {
        await redisClient.del(...keys); // Borra todas las listas
    }
    console.log("Claves de Redis eliminadas");
}
import mongoose from "mongoose";
import { mongoConfig } from "./config.js";

const { dbHost, dbPort, dbUsername, dbPassword, dbDatabase } = mongoConfig;

// Construcción dinámica del URI de conexión
const credentials = dbUsername && dbPassword ? `${dbUsername}:${dbPassword}@` : "";
const mongoURI = `mongodb://${credentials}${dbHost}:${dbPort}`;

// Función para conectar a la base de datos
export const connectToDatabase = async () => {
    try {
        // Conectar al servidor MongoDB
        await mongoose.connect(mongoURI, {
            dbName: dbDatabase,
        });
    } catch (error) {
        throw new Error(`Error al conectar a MongoDB: ${error}`);
    }
};

export default mongoose;
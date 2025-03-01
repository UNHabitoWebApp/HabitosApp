// config.js
import dotenv from "dotenv";

dotenv.config();

export const port = parseInt(process.env.PORT || "8080");
export const SECRET_KEY = process.env.JWT_SECRET || "tu_secreto_super_seguro";
export const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET || "tu_secreto_super_seguro_refresh";

export const mongoConfig =  {
    dbHost: process.env.MONGO_HOST || "localhost",
    dbPort: parseInt(process.env.MONGO_PORT || "27017"),
    dbUsername: process.env.MONGO_USERNAME || "root",
    dbPassword: process.env.MONGO_PASSWORD || "habit_un",
    dbDatabase: process.env.MONGO_DATABASE  || "habit_un",
};
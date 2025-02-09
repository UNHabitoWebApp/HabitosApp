// config.js
import dotenv from "dotenv";

dotenv.config();

export const port = parseInt(process.env.PORT || "8080");

export const mongoConfig =  {
	dbHost: process.env.MONGO_HOST || "localhost",
	dbPort: parseInt(process.env.MONGO_PORT || "27017"),
	dbUsername: process.env.MONGO_USERNAME || "",
	dbPassword: process.env.MONGO_PASSWORD || "",
	dbDatabase: process.env.MONGO_DATABASE  || "",
};
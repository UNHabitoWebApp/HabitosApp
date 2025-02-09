import cors from "cors";
import morgan from "morgan";
import express from "express";
import initializeRoutes from "./routes/index.js";

const app = express();

app.use(
	cors({
    	origin: true,
    	credentials: true,
    	allowedHeaders: "Content-Type, Authorization",
    	allowOrigin: "http://localhost:3000",
	})
);

app.use(express.json());
app.use(morgan("dev"));

initializeRoutes(app);

export default app;
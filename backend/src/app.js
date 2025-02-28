import cors from "cors";
import morgan from "morgan";
import express from "express";
import initializeRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(
    cors({
    	origin: true,
    	credentials: true,
    	allowedHeaders: "Content-Type, Authorization",
    	allowOrigin: "*",
    })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

initializeRoutes(app);

export default app;
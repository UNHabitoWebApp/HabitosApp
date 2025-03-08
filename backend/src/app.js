import cors from "cors";
import morgan from "morgan";
import express from "express";
import initializeRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";
import { enqueueCreateEvent } from "./BullMQ/producers/eventProducer.js";
import { eventQueue } from "./BullMQ/queues/eventQueue.js";
//import { authenticateUser } from "./middlewares/authMiddleware.js";

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
//app.use(authenticateUser());

initializeRoutes(app);

export default app;
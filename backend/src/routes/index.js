import { Router } from "express";
import pingRouter from "./pingRouter.js";
import authRouter from "./authRouter.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import calendarRouter from "./calendarRouter.js";
import createHabitsRouter from "./createHabitsRouter.js";

export default function initializeRoutes(app) {
    /*
    the idea is to use this function in the future to initialize all the routers that we create in routes folder
    example:
        router.use(*imported router*)
        router.use("/*prefix*", *imported router*)
    */
    const router = Router();
    router.use("/auth",authRouter);
    router.use("/ping",pingRouter);
    router.use("events/",calendarRouter);
    //router.use(authenticateUser);
    router.use("/create_habits",createHabitsRouter);
    app.use(router);
}
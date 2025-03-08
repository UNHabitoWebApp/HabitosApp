import { Router } from "express";
import { createHabit , createRoutine } from "../controllers/createHabit.js";
const createHabitsRouter = Router();

createHabitsRouter.post("/personalized/", createHabit);
createHabitsRouter.post("/routine/", createRoutine);
export default createHabitsRouter;
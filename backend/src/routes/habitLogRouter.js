import { Router } from "express";
import { getHabitLogByHabit, patchHabitLog, createHabitLog } from "../controllers/habitLog.js";
const habitLogRouter = Router();

habitLogRouter.get("/habitLog/", getHabitLogByHabit);
habitLogRouter.patch("/habitLog/:id", patchHabitLog);
habitLogRouter.post("/habitLog/", createHabitLog);
habitLogRouter.get("/habitLog/:id", getHabitLogByHabit);
export default habitLogRouter;
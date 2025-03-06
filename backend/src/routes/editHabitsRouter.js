import { Router } from "express";
import { getHabitByUser, patchHabit, createHabit } from "../controllers/editHabit.js";
const editHabitsRouter = Router();

editHabitsRouter.patch("/edit/:id", patchHabit);
editHabitsRouter.get("/edit/", getHabitByUser);
editHabitsRouter.post("/edit/", createHabit);
export default editHabitsRouter;
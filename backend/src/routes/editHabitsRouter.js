import { Router } from "express";
import { getHabitByUser, patchHabit, createHabit, getHabitById } from "../controllers/editHabit.js";
const editHabitsRouter = Router();

editHabitsRouter.patch("/edit/:id", patchHabit);
editHabitsRouter.get("/edit/", getHabitByUser);
editHabitsRouter.post("/edit/", createHabit);
editHabitsRouter.get("/edit/:id", getHabitById);

export default editHabitsRouter;
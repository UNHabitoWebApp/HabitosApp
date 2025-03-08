import {Router} from "express";
import {patchRoutine, getRoutineByUser, createRoutine, deleteRoutine, getRoutineById} from "../controllers/routine.js"

const routineRouter = Router();

routineRouter.patch("/routine/:id", patchRoutine);
routineRouter.get("/routine/", getRoutineByUser);
routineRouter.get("/routine/:id", getRoutineById);
routineRouter.post("/routine/", createRoutine);
routineRouter.delete("/routine/:id", deleteRoutine);

export default routineRouter;

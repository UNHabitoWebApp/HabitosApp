import { Router } from "express";
import { getPing } from "../middlewares/controllers/pingMiddleware.js";

const pingRouter = Router();

pingRouter.get("/ping", getPing);

export default pingRouter;
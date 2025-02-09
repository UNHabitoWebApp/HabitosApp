import { Router } from "express";
import { getPing } from "../middlewares/pingMiddleware.js";

const pingRouter = Router();

pingRouter.get("/ping", getPing);

export default pingRouter;
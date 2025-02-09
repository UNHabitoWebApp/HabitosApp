import { Router } from "express";
import pingRouter from "./pingRouter.js";

export default function initializeRoutes(app) {
    /*
    the idea is to use this function in the future to initialize all the routers that we create in routes folder
    example:
        router.use(*imported router*)
        router.use("/*prefix*", *imported router*)
    */
    const router = Router();
    app.use(router);
    router.use(pingRouter);
}
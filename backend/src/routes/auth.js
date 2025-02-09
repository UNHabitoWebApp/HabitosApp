import { Router } from "express";
import { login, register, refreshToken  } from "../controllers/auth.js";
const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/refresh", refreshToken);

export default authRouter;
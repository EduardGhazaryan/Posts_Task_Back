import { Router } from "express";
import { validateInput } from "../Middlwares/registerMiddlware.js";
import AuthController from "../Controller/authController.js"
import authMiddleware from "../Middlwares/authMiddlware.js";

const AuthRouter = Router()

AuthRouter.get("/user", authMiddleware, AuthController.getUser)

AuthRouter.post("/signUp", validateInput, AuthController.signUp);

AuthRouter.post("/signIn", AuthController.signIn);


export default AuthRouter
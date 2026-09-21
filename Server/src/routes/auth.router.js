import { Router } from "express";
import { loginController, refreshController, registerContoller, getMeController } from "../controllers/auth.controller.js";
import { loginValidation, registerValidation } from "../validation/auth.validation.js";
import authHandler from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/register", registerValidation, registerContoller);
router.post("/login", loginValidation, loginController);
router.post("/refresh", refreshController);
router.get("/me", authHandler, getMeController)

export default router;
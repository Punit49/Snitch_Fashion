import { Router } from "express";
import { registerContoller } from "../controllers/auth.controller.js";
import { registerValidation } from "../validation/auth.validation.js";
const router = Router();

router.post("/register", registerValidation, registerContoller);

export default router;
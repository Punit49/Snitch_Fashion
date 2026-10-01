import { Router } from "express"
import { addToCartController, getCartController } from "../controllers/cart.controller.js";
import authHandler from "../middlewares/auth.middleware.js";
import cartValidation from "../validation/cart.validation.js";
const router = Router();

router.post("/", authHandler, cartValidation, addToCartController);
router.get("/", authHandler, getCartController);

export default router;
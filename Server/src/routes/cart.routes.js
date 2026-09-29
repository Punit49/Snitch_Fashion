import { Router } from "express"
import addToCart, { addToCartController, getCartController } from "../controllers/cart.controller";
import authHandler from "../middlewares/auth.middleware";
import cartValidation from "../validation/cart.validation";
const router = Router();

router.post("/", authHandler, cartValidation, addToCartController);
router.get("/", authHandler, getCartController);

export default router;
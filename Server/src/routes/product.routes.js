import { Router } from "express";
import authHandler from "../middlewares/auth.middleware.js";
import isSeller from "../middlewares/isSeller.middleware.js";
import { createProduct, getAllProductsController, getSellerProductsController, listProductController, unlistProductController } from "../controllers/product.controller.js";
import upload from "../config/multer.config.js";
import { listProductValidation, productValidation, unlistProductValiation } from "../validation/product.validation.js";
import parseProductData from "../middlewares/parseProductData.middleware.js";
const router = Router();

router.post("/",
    authHandler, 
    isSeller, 
    upload.array('images', 5), 
    parseProductData,
    productValidation, 
    createProduct
);
 
router.get("/", authHandler, getAllProductsController);
router.patch("/unlist/:id", authHandler, unlistProductValiation, isSeller, unlistProductController);
router.patch("/list/:id", authHandler, listProductValidation, isSeller, listProductController);
router.get("/seller", authHandler, isSeller, getSellerProductsController);

export default router;

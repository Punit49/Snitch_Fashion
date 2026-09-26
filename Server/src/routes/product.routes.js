import { Router } from "express";
import authHandler from "../middlewares/auth.middleware.js";
import isSeller from "../middlewares/isSeller.middleware.js";
import { createProduct } from "../controllers/product.controller.js";
import upload from "../config/multer.config.js";
import { productValidation } from "../validation/product.validation.js";
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

router.get("/", authHandler, getAllProducts)

export default router;

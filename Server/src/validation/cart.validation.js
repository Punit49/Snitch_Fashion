import { body } from "express-validator"
import expressValidation from "../middlewares/express.validator.js";

const cartValidation = [
    body('productId')
        .exists().withMessage("Product ID is required").bail()
        .isString().withMessage("Product ID must be a string").bail()
        .trim().notEmpty().withMessage("Product ID can't be Empty").bail()
        .isMongoId().withMessage("Product ID must be a valid MongoDB ID"),
    body('quantity')
        .exists().withMessage("Quantity is required").bail()
        .isInt({min: 1}).withMessage("Product ID Must be an integer and should be at least 1"),
    body('size')
        .exists("Size is required").bail()
        .isString().withMessage("Size must be a string").bail()
        .trim().notEmpty().withMessage("Size can't be empty").bail()
        .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("Size can only be - XS, S, M, L, XL, XXL"),
    expressValidation
]  

export default cartValidation;

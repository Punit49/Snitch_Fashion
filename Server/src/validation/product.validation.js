import { param, body } from "express-validator";
import expressValidation from "../middlewares/express.validator.js";

export const productValidation = [
    body("title")   
        .exists().withMessage("Title is required")
        .isString().withMessage("Title must be string").bail()
        .trim().notEmpty().withMessage("Title can't be empty").bail()
        .isLength({min: 20, max: 100}).withMessage("Title must be between 20 and 100 characters")
        .isAlpha("en-IN", {ignore: [" ", "-"]}).withMessage("Title must be a valid alphabet character"),
    body("description")
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description must be string").bail()
        .trim().notEmpty().withMessage("Description can't be empty").bail()
        .isLength({min: 80, max: 200}).withMessage("Description must be between 80 and 200 characters"),
    body('price')
        .exists().withMessage("Price Field is Required").bail()
        .isObject().withMessage("Price field must be an object"),
    body("price.amount") 
        .exists().withMessage("Price Is required").bail()
        .isNumeric().withMessage("Price must be number").bail()
        .isFloat({min: 0.1}).withMessage("Price must be a float number"),        
    body("price.currency")
        .exists().withMessage("Currency Is required").bail()
        .isString().withMessage("Currency must be String").bail()
        .isIn(["INR", "USD"]).withMessage("Currency must be either INR or USD"),
    body("sizes")
        .exists().withMessage("Sizes are required")
        .isArray().withMessage("Sizes field must be an array of objects"),
    body("sizes.*.size")
        .exists().withMessage("Size is required in every size object").bail()
        .isString().withMessage("Size must be string").bail()
        .trim().notEmpty().withMessage("Size can't be empty").bail()
        .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("Invalid Size - Size can only be one of theese XS, S, M, L, XL, XXL"),
    body("sizes.*.stock")
        .exists().withMessage("Stock is required in every stock object").bail()
        .isNumeric().withMessage("Stock must be of number type").bail()
        .isInt({min: 0}).withMessage("Minimum value of stock must be 0"),
        // images
    expressValidation
] 

export const unlistProductValiation = [
    param('id')
        .exists().withMessage("Product ID is required").bail()
        .isString().withMessage("Product ID must be a string").bail()
        .trim().notEmpty().withMessage("Product ID can't be empty").bail()
        .isMongoId().withMessage("Product ID must be a valid Mongo ID"),
    expressValidation
]

export const listProductValidation = [
    param('id')
        .exists().withMessage("Product ID is required").bail()
        .isString().withMessage("Product ID must be a string").bail()
        .trim().notEmpty().withMessage("Product ID can't be empty").bail()
        .isMongoId().withMessage("Product ID must be a valid Mongo ID"),
    expressValidation
]
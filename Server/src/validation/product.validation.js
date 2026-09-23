import { body } from "express-validator";

export const productValidation = [
    body("title")   
        .exists().withMessage("Title is required")
        .isString().withMessage("Title must be string").bail()
        .trim().notEmpty().withMessage("Title can't be empty").bail()
        .isLength({min: 30, max: 100}).withMessage("Title must be between 30 and 100 characters")
        .isAlpha("en-IN", {ignore: " "}).withMessage("Title must be a valid alphabet character"),
    body("description")
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description must be string").bail()
        .trim().notEmpty().withMessage("Description can't be empty").bail()
        .isLength({min: 80, max: 200}).withMessage("Description must be between 80 and 200 characters"),
    body("price.amount")
        .exists().withMessage("Price Is required").bail()
        .isNumeric().withMessage("Price must be number").bail()
        .isFloat({min: 0.1}).withMessage("Price must be a float number"),        
    body("price.currency")
        .exists().withMessage("Currency Is required").bail()
        .isString().withMessage("Currency must be String").bail()
        .isIn(["INR", "USD"]).withMessage("Currency must be either INR or USD"),
    body("sizes.size")
        .exists().withMessage("Sizes are required").bail()
        .isString().withMessage("Size must be string").bail()
        .trim().withMessage("Size can't be empty")
] 
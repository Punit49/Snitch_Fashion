import {body } from "express-validator"
import expressValidation from "../middlewares/express.validator.js";

const registerValidation = [
    body("email")
        .trim().notEmpty().withMessage("Email is required").bail()
        .isEmail().withMessage("Email is Invalid"),
    body("name")
        .isString().withMessage("Name must be a string").bail().trim().notEmpty()
        .withMessage("Name is required").bail()
        .isLength({min: 3, max: 50}).withMessage("Name must be between 3 to 50 characters"),
    body("password")
        .isString().withMessage("Password must be a string").bail()
        .trim().notEmpty().withMessage("Password is required").bail()
        .isLength({min: 6, max: 20}).withMessage("Password should be between 6 to 20 characters"),
    expressValidation
]

const loginValidation = [
    body("email")
        .trim().notEmpty().withMessage("Email is required").bail()
        .isEmail().withMessage("Invalid email address"),
    body("password")
        .isString().withMessage("Password Must be a of string type").bail()
        .trim().notEmpty().withMessage("Password is required").bail()
        .isLength({min: 6, max: 30}).withMessage("Password should be between 6 to 30 characters"),
    expressValidation
]

export {
    registerValidation,
    loginValidation
}
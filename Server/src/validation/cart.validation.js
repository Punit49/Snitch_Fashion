import { body, validationResult } from "express-validator"

const cartValidation = [
    body('productId')
        .exists().withMessage("Product ID is required")
        .isString().withMessage("Product ID must be a string")
        .trim().notEmpty().withMessage("Product ID can't be Empty")
        .isMongoId().withMessage("Product ID must be a valid MongoDB ID"),
    body('quantity')
        .exists().withMessage("Quantity is required")
        .isInt({min: 1}).withMessage("Product ID Must be an integer")
        .isInt({min: 1, max: 10}).withMessage("Product Quanitity must be between 1 and 10"),
    body('size')
        .exists("Size is required")
        .isString().withMessage("Size must be a string")
        .trim().notEmpty().withMessage("Size can't be empty")
        .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("Size can only be - XS, S, M, L, XL, XXL"),
    (req, res, next) => {
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(422).json({
                success: false, 
                message: "Validation Failed", 
                error: err.array()
            })
        }
        next();
    }
]  

export default cartValidation;

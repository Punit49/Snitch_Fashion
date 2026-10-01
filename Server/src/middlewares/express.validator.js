import { validationResult } from "express-validator";

const expressValidation = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation Failed",
            errors: err.array()
        })
    }
    next();
}

export default expressValidation;

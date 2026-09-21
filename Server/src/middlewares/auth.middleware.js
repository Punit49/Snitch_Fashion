import { verifyAccessToken } from "../utils/token.utils.js";

const authHandler = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];

        if(!accessToken){
            return res.status(422).json({
                success: false,
                message: "Access Token is required",
            });
        }

        const decoded = verifyAccessToken(accessToken);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            errors: error.message,
        });
    }
}

export default authHandler
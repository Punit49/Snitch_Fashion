import jwt from "jsonwebtoken";
import config from "../config/dotenv.config.js";

const generateTokens = (id, role) => {
    return {
        accessToken: jwt.sign({id, role}, config.ACCESS_TOKEN_KEY, {expiresIn: "15m"}),
        refreshToken: jwt.sign({id, role}, config.REFRESH_TOKEN_KEY, {expiresIn: "7d"}),
    }
} 

export {
    generateTokens
}
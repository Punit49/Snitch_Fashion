import jwt from "jsonwebtoken";
import config from "../config/dotenv.config.js";

const generateTokens = (id, role) => {
    return {
        accessToken: jwt.sign({id, role}, config.ACCESS_TOKEN_KEY, {expiresIn: "15m"}),
        refreshToken: jwt.sign({id, role}, config.REFRESH_TOKEN_KEY, {expiresIn: "7d"}),
    }
} 

const verifyRefreshToken = (token) => {
    return jwt.verify(token, config.REFRESH_TOKEN_KEY);
} 

const verifyAccessToken = (token) => {
    return jwt.verify(token, config.ACCESS_TOKEN_KEY);
} 

export {
    generateTokens,
    verifyRefreshToken, 
    verifyAccessToken
}
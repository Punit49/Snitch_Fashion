import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateTokens, verifyRefreshToken } from "../utils/token.utils.js";

const registerContoller = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const isUserExists = await UserModel.findOne({ email });

        if (isUserExists) {
            return res.status(409).json({
                success: false,
                message: "Email Conflict",
                errors: [
                    {
                        field: "email",
                        message: "User with this email already exists",
                    },
                ],
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const user = await UserModel.create({ name, email, passwordHash });

        const { accessToken, refreshToken } = generateTokens(user._id, user.role);
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, { httpOnly: true });

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            data: {
                user: { name, email, id: user._id },
                accessToken,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            errors: error.message,
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email Or Password",
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.passwordHash);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email Or Password",
            });
        }

        const { accessToken, refreshToken } = generateTokens(user._id, user.role);

        res.cookie("refreshToken", refreshToken, { httpOnly: true });

        await UserModel.findByIdAndUpdate(user._id, { refreshToken });

        return res.status(200).json({
            success: true,
            message: "User Logged In Succesfully",
            data: {
                user: { email, name: user.name, id: user._id },
                accessToken,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            errors: error.message,
        });
    }
};

const refreshController = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh Token is required"
            })
        }

        const decoded = verifyRefreshToken(refreshToken);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token"
            })
        }

        const { id, role } = decoded;
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token"
            })
        }

        if (refreshToken != user.refreshToken) {
            await UserModel.findByIdAndUpdate(id, { refreshToken: null });
            return res.status(401).json({
                success: false,
                message: "Refresh token mistmatch"
            })
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(id, role);
        await UserModel.findByIdAndUpdate(id, { refreshToken: newRefreshToken });
        res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

        return res.status(200).json({
            success: true,
            message: "Tokens rotated successfully",
            data: {
                user: { email: user.email, name: user.name, id: user._id },
                accessToken
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            errors: error.message,
        });
    }
};

const getMeController = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                    id
                }
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            errors: error.message,
        });
    }
}

export {
    registerContoller,
    loginController,
    refreshController,
    getMeController
};

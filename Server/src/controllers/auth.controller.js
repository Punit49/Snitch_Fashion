import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import { generateTokens } from "../utils/token.utils.js";

const registerContoller = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(password, typeof password);

        const isUserExists = await UserModel.findOne({email});

        if(isUserExists){
            return res.status(409).json({
                success: false,
                message: "Email Conflict",
                errors: [
                    {
                        field: "email", 
                        message: "User with this email already exists"
                    }
                ]
            })
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const user = await UserModel.create({name, email, passwordHash});

        const {accessToken, refreshToken} = generateTokens(user._id, user.role);
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {httpOnly: true});

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            data: {
                user: {name, email},
                accessToken
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error", 
            errors: error.message
        })
    }
}

export {
    registerContoller
}
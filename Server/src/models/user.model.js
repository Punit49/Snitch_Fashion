import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    }, 
    email: {
        type: String, 
        unique: true,
        required: true
    }, 
    passwordHash: {
        type: String, 
        required: true
    }, 
    refreshToken: {
        type: String,
        unique: true
    }, 
    role: {
        type: String,
        default: "user",
        enums: ["user", "seller"]
    }
})

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
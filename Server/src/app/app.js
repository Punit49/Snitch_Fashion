import express, { Router } from "express"
import authRouter from "../routes/auth.router.js";
import cookieParser from "cookie-parser"
const app = express();

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true, 
        message: "API Working"
    })
})

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter)

export default app;
import { Router } from "express";
const router = Router();

app.post("/", (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error"
        })
    }
})

export default router;

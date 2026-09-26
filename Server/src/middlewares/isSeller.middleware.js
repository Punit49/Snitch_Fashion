const isSeller = (req, res, next) => {
    try {
        const user = req.user;
        if(!user || user.role != "seller"){
            return res.status(403).json({
                success: false,
                message: "Access Denied, Seller Resources only"
            })
        }
        next();
    } catch (error) {
        console.error("Error in isSeller middleware:", error.message);
        return res.status(500).json({
            sucess: false, 
            message: "Internal Server Error"
        })
    }
}

export default isSeller;
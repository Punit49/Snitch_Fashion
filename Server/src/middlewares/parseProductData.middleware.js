const parseProductData = async (req, res, next) => {
    try {
        req.body?.price && (req.body.price = JSON.parse(req.body.price));
        req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON format in product data"
        })
    }
}
export default parseProductData;
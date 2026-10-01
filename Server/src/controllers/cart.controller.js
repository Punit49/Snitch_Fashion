import CartModel from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";

const addToCartController = async (req, res) => {
    try {
        const { productId, quantity, size } = req.body;
        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                messsage: "Product Not Found"
            })
        }

        const selectedSize = product.sizes.find(s => s.size === size);

        if (!selectedSize) {
            return res.status(404).json({
                success: false,
                message: "This Size is not available"
            })
        }

        if (quantity > selectedSize.stock) {
            return res.status(422).json({
                success: false,
                message: "Insufficient Stock"
            })
        }

        const cart = (await CartModel.findOne({ user: req.user.id })) ?? (await CartModel.create({ user: req.user.id }));

        const productInCart = cart.products.find(p => (p.product.toString() === productId) && (p.size === size));

        if (productInCart) {
            console.log(productInCart);
            if ((productInCart.quantity + quantity) > selectedSize.stock) {
                return res.status(422).json({
                    success: false,
                    message: "Insufficient Stock"
                })
            }

            await CartModel.updateOne({
                user: req.user.id,
                "products.product": productId,
                "products.size": size
            }, {
                $inc: {
                    "products.$.quantity": quantity
                }
            })
        }

        else {
            await CartModel.findOneAndUpdate({
                user: req.user.id,
            }, {
                $push: {
                    products: {
                        product: productId,
                        quantity,
                        size
                    }
                }
            })
        }

        return res.status(200).json({
            success: false,
            message: "Product added to the cart",
        })

    } catch (error) {
        console.log(`Error in addtocart controller - ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getCartController = async (req, res) => {
    try {
        const cart = await CartModel.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                cart: {
                    products: []
                }
            })
        }
        return res.status(200).json({
            success: true,
            message: "Cart Fetched Successfully",
            cart
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
    addToCartController, getCartController
}
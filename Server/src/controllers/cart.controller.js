import CartModel from "../models/cart.model";
import ProductModel from "../models/product.model";

const addToCartController = async (req, res) => {
    try {
        const { productId, quantity, size} = req.body();

        const product = await ProductModel.findById(productId);

        if(!product){
            return res.status(404).json({
                success: false, 
                message: "Product Not Found"
            })
        }
        
        const selectedSize = product.sizes.find(s => s.size === size); 
        
        if(!selectedSize){
            return res.status(422).json({
                success: false, 
                message: `${size} is not available`
            })
        }

        if(selectedSize.stock < quantity){
            return res.status(422).json({
                success: false, 
                message: `Insufficient Stock of ${size} size, there is only ${selectedSize.stock} available`
            })
        }

        const cart = (await CartModel.findOne({user: req.user.id})) ?? (await CartModel. create({user: req.user.id}));
        
        const cartProduct = cart.products.find(p => (p.product.toString() === productId) && (selectedSize.size === size));

        if(cartProduct){
            if(cartProduct.quantity + quantity > selectedSize.stock){
                return res.status(422).json({
                    success: false, 
                    message: "Insufficient stock"
                })
            }

            await CartModel.updateOne({
                user: req.user.id, 
                "products.product": productId, 
                "products.size": size
            }, {
                $inc: {
                    "products.$.quanity": quantity
                }
            });

            return res.status(200).json({
                success: true, 
                message: "Product Quantity Updated in the cart"
            })
        }

        await CartModel.updateOne({
            user: req.user.id
        }, {
            $push: {
                products: {
                    product: productId, 
                    size: size, 
                    quantity: quantity
                }
            }
        });

        return res.status(200).json({
            success: true, 
            message: "Product Added to the cart"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            errors: error.message,
        });
    }
}

const getCartController = async (req, res) => {
    try {
        const cart = await CartModel.findOne({user: req.user.id});
        if(!cart){
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

// testin postman and rebuild it - 

export {
    addToCartController, getCartController
}
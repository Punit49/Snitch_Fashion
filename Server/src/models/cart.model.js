import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true
            }, 
            size: {
                type: String, 
                required: true,
                enum: ["XS", "S", "M", "L", "XL", "XXL"]
            }, 
            quantity: {
                type: Number,
                default: 1, 
                min: 1
            }
        }
    ], 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    }
})

const CartModel = mongoose.model("Cart", cartSchema);
export default CartModel;
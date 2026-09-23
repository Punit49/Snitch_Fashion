import mongoose from "mongoose";

const productSchema = new mongoose.Schame({
    title: {
        type: String, 
        minLength: [30, "Minimum length of product title should be 30 characters"],
        minLength: [100, "Maximum length of product title can be 100 characters"],
        required: [true, "Product title is required"]
    }, 
    description: {
        type: String,
        required: [true, "Product Description is required"],
        minLength: [80, "Minimum length of description should be 80 characters"],
        maxLength: [200, "Maximum length of description can be 200 characters"],
    }, 
    images: [{
        type: String, 
        validate: {
            validator: images => images.length >= 1 && images.length <= 5 ,
            message: "A product can only have 1 to 5 images"
        }
    }],
    price: {
        amount: {
            type: String, 
            required: true
        }, 
        currency: {
            type: String, 
            enum: ["INR", "USD"], 
            default: "INR"
        }
    }, 
    sizes: [
        {
            size: {
                type: String, 
                enum: ["XS", "S", "M", "L", "XL", "XXL"],
                required: true
            }, 
            stock: {
                type: Number, 
                min: 0, 
                default: 0
            }
        }
    ], 
    seller: {
        type: mongoose.Types.ObjectId, 
        ref: "users", 
        required: true
    }
})

const ProductModel = mongoose.model("Products", productSchema);
export default ProductModel;
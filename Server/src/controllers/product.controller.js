import ProductModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

const createProduct = async (req, res) => {
    try {
        const {title, description, price: {amount, currency}, sizes } = req.body;
        if(!req.files || req.files.length == 0){
            return res.status(422).json({
                success: false, 
                message: "Files Not Found"
            })
        } 

        const fileUrls = await Promise.all(req.files.map(async (file) => {
            const response = await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname
            })
            return response.url;
        }))

        const product = await ProductModel.create({
            title, description, price: { amount, currency }, sizes, images: fileUrls, seller: req.user.id
        })

        res.status(201).json({
            success: false, 
            message: "Product created successfully",
            data: {
                product
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: `Internal Server Error - ${error.message}`
        })
    }
}

const getAllProductsController = async (req, res) => {
    try {
        const products = await ProductModel.find({published: true});

        return res.status(200).json({
            success: true, 
            message: "Products Fetched successfully", 
            data: {
                products
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: `Internal Server Error`
        })
    }
}

const getSellerProductsController = async (req, res) => {
    try {
        const products = await ProductModel.find();

        if(!products){
            return res.status(200).json({
                success: true, 
                message: "No Products Yet"
            })
        } 

        return res.status(200).json({
            success: true, 
            message: "All Products Fetched Successfully", 
            data: {
                products
            }
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: `Internal Server Error`
        })
    }
}

const unlistProductController = async (req, res) => {
    try {
        const {id} = req.params;

        const product = await ProductModel.findById(id);

        if(!product){
            return res.status(404).json({
                success: false, 
                message: "Product Not Found"
            })
        }

        await ProductModel.updateOne({_id: id}, {
            published: false
        })

        return res.status(200).json({
            success: true, 
            message: "Product Unlisted Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: `Internal Server Error`
        })
    }
}

const listProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = ProductModel.findById(id);
        if(!product){
            return res.status(404).json({
                success: false, 
                message: "Product Not Found"
            })
        }

        await ProductModel.updateOne({_id: id}, {published: true});

        return res.status(200).json({
            success: true, 
            message: "Product Listed Successfully"
        })

    } catch (error) {
        console.log("error in list controller - ", error.message);
        return res.status(500).json({
            success: false, 
            message: `Internal Server Error`
        })
    }
}

export {
    createProduct, 
    getAllProductsController, 
    unlistProductController, 
    listProductController, 
    getSellerProductsController
}
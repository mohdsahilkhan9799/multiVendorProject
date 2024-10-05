import express from "express";
import {createProduct,getProduct} from "../controller/product.js";
import upload from "../multer.js";

const route=express.Router()
route.post("/create_product",upload.single("Brand_image"),createProduct)
route.get("/get_Product",getProduct)

export default route
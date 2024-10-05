import express from "express";
import {createcategory,getcategory} from "../controller/category.js";
import upload from "../multer.js";


const route=express.Router()
route.post("/create_category",upload.single("product_image"),createcategory)
route.get("/getcategory",getcategory)

export default route
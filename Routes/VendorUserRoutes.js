import express from "express";
import {VendorRegisterUser,LoginVendorUser,LogoutVendorUser,getVendorRegister}  from "../controller/VendorUserController.js";
import {createProduct,getvenderProduct,getCategoryvenderProduct,getsinglVenderPrduct}  from "../controller/CreateVendorProduct.js";
import { authMiddleware } from "../middleware/auth.js"; 
import upload from "../multer.js";


const router=express.Router()

router.post("/VendorRegister",upload.single("profile_image"), VendorRegisterUser,);
router.post("/VendorLogin", LoginVendorUser);
router.get("/VendorLogout", LogoutVendorUser);
router.get("/getVendorRegisterUser",authMiddleware, getVendorRegister);

// section Product
router.post("/createVenderProduct",upload.single("product_image"),createProduct)
router.get("/getVendorProduct",getvenderProduct,)
router.get("/getCategoryvenderProduct/:id",getCategoryvenderProduct,)
router.get("/getsinglVenderPrduct/:id",getsinglVenderPrduct,)


export default router

import express from "express";
import {CustomerRegisterUser,CustomerLoginUser,CustomerLogoutUser,getCustomerRegister}  from "../controller/CustomerController.js";
import { authMiddleware } from "../middleware/auth.js"; 
import upload from "../multer.js";


const router=express.Router()

router.post("/CustomeruserRegister",upload.single("profile_image"), CustomerRegisterUser,);
router.post("/CustomerUserLogin", CustomerLoginUser);
router.get("/CustomerUserLogout", CustomerLogoutUser);
router.get("/getCustomerRegisterUser",authMiddleware, getCustomerRegister);

export default router

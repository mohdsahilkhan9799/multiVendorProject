import express from "express";
import {RegisterUser,LoginUser,LogoutUser,getRegister}  from "../controller/userController.js";
import { authMiddleware } from "../middleware/auth.js"; 
import upload from "../multer.js";


const router=express.Router()

router.post("/userRegister",upload.single("profile_image"), RegisterUser,);
router.post("/UserLogin", LoginUser);
router.get("/UserLogout", LogoutUser);
router.get("/getRegisterUser",authMiddleware, getRegister);

export default router

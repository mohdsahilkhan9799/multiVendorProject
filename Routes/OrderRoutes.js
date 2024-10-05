import express from "express"
import {CreateOrder,GetAllOrder} from "../controller/orderController.js"
import upload from "../multer.js"

const route=express.Router()

route.post("/Create_Order",upload.single("order_image"),CreateOrder)
route.get("/Get_All_Order",GetAllOrder)

export default route

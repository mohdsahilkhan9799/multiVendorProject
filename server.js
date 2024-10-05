import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import user from "./Routes/userRoutes.js";
import product from "./Routes/productRoutes.js"
import category from "./Routes/categoryRoutes.js"
import coupans from "./Routes/CoupansRoutes.js"
import vendor from "./Routes/VendorUserRoutes.js"
import customer from "./Routes/CustomerRoutes.js"
import order from "./Routes/OrderRoutes.js"


env.config()
const app=express()
app.use(express.json())
app.use(cors())
app.use(express.static("public"))

const Port=process.env.PORT
const String_url=process.env.mongodb_Url

try {
    mongoose.connect(String_url)
    console.log("Mongose_String:",String_url)
} catch (error) {
    console.log(error)
}

app.use('/api/user',user)
app.use('/api/category',category)
app.use('/api/product',product)
app.use('/api/coupans',coupans)
app.use('/api/vendor',vendor)
app.use('/api/customer',customer)
app.use('/api/order',order)
app.listen(Port,()=>{
    console.log(`server is running Port: ${Port}`)
})


import mongoose from "mongoose";

const categorySchema=mongoose.Schema({
    name:{
        type:String
    },
    product_image:{
        type:String
    }
})

const category=mongoose.model("CategoryList",categorySchema)
export default category
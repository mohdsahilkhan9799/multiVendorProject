import mongoose from "mongoose";

const productSchema=mongoose.Schema({

    Brand_name:{
        type:String
    },
    Brand_image:{
        type:String
    },

})

const product=mongoose.model("Brands",productSchema)
export default product
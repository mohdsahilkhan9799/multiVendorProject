import mongoose from "mongoose";


const DispatchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    pin_number: { type: String, required: true }
  });
  
const OrderSchema=mongoose.Schema({
    order_name:{
        type:String
    },
    order_price:{
        type:String
    },
    order_discount:{
        type:String
    },
    total_price:{
        type:String
    },

    order_image:{
        type:String
    },
    order_quantity:{
        type:Number
    },

    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"CustomerData"
    },
    VendorProductId:{
        type:mongoose.Schema.ObjectId,
        ref:"VendorProduct"
    },
    status:{
        type:Boolean,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    dispatch:DispatchSchema
})


const myorder=mongoose.model("Order",OrderSchema)
export default myorder
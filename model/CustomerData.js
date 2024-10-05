import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    address: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },

    profile_image: {
        type: String,
    },
    
});

const Customer = mongoose.model("CustomerData", CustomerSchema); 
export default Customer;

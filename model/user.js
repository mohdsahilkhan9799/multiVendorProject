import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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
    role: {
        type: String,
        enum: ["superAdmin", "admin", "employees"],
        default: "employees",  
    },

    profile_image: {
        type: String,
    },
    
});

const User = mongoose.model("AdminData", userSchema); 
export default User;

import mongoose from "mongoose";

const VendoruserSchema = mongoose.Schema({
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

    // Company details
    company_name: {
        type: String,
    },
    company_address: {
        type: String,
    },
    gst_number: {
        type: String,
    },
    account_number: {
        type: String,
    },
    bank_name: {
        type: String,
    },
    ifsc_code: {
        type: String,
    },
    pan_card: {
        type: String,
    },
    adhar_card: {
        type: String,
    },
    country_name: {
        type: String,
    },
    state_name: {
        type: String,
    },
    pin_number: {
        type: String,
    },
});

const Vendor = mongoose.model("VendorData", VendoruserSchema); 
export default Vendor;

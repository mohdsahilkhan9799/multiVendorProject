import mongoose from "mongoose";

const CoupansSchema = mongoose.Schema({
    Coupans_name: {
        type: String,
        required: true, 
    },
    discount: {
        type: String,
        required: true, 
    },
});

const Coupans = mongoose.model("Coupans", CoupansSchema);
export default Coupans;

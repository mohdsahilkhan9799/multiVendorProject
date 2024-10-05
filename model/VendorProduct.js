import mongoose from "mongoose";

const VendorProductSchema = mongoose.Schema({
  product_name: {
    type: String,
    
  },
  product_price: {
    type: String,
    
  },
  discount_price: {
    type: String,
    
  },
  product_image: {
    type: String,
    
  },
  product_quantity: {
    type: String,
    
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CategoryList",  
    
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brands",  
    
  },
  couponsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coupans",  
  },



}, { timestamps: true });

const VendorProduct = mongoose.model("VendorProduct", VendorProductSchema);
export default VendorProduct;

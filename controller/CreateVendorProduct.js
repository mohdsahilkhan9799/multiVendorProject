import VendorProduct from "../model/VendorProduct.js";

export const createProduct = async (req, res) => {
  const { product_name,discount_price, product_price,product_quantity, categoryId, brandId, couponsId } = req.body;
  const product_image = req?.file?.filename;
  if (!product_name || !discount_price || !product_price || !categoryId || !brandId || !product_image) {
    return res.status(400).json({
      success: false,
      message: "All required fields (product_name, product_price, categoryId, brandId, product_image) must be provided."
    });
  }

  try {
    const vendorProductData = new VendorProduct({
      product_name,
      product_price,
      discount_price,
      product_quantity,
      categoryId,
      brandId,
      couponsId,
      product_image
    });

    await vendorProductData.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      vendorProductData
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getvenderProduct = async (req, res) => {
  const url = process.env.URL;

  try {
      const findVenderdata = await VendorProduct.find()
          .populate("categoryId")  
          .populate("brandId")     
          .populate("couponsId");  

      findVenderdata.forEach(element => {
          element.product_image = element.product_image
              ? `${url}/images/${element.product_image}`
              : null;
      });
      return res.status(200).json({
          success: true,
          data: findVenderdata, 
          message: "Products fetched successfully",
      });
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: "Failed to fetch product data",
          error: error.message,
      });
  }
};
export const getCategoryvenderProduct = async (req, res) => {
  const url = process.env.URL;
  const {id}=req?.params
  console.log("find category id :",req?.params)


  try {
      const findVenderdata = await VendorProduct.find({categoryId:id})
          .populate("categoryId")  
          .populate("brandId")     
          .populate("couponsId");  

      findVenderdata.forEach(element => {
          element.product_image = element.product_image
              ? `${url}/images/${element.product_image}`
              : null;
      });

      return res.status(200).json({
          success: true,
          data: findVenderdata, 
          message: "Products fetched successfully",
          
      });
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: "Failed to fetch product data",
          error: error.message,
      });
  }
};

export const getsinglVenderPrduct = async (req, res) => {
  const url = process.env.URL;

  try {
    const { id } = req.params; // Destructure 'id' from req.params
    const singleVenderData = await VendorProduct.findById(id); // Use findById to find a product by ID

    // Check if the product exists
    if (!singleVenderData) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update the product image URL if it exists
    singleVenderData.product_image = singleVenderData.product_image
      ? `${url}/images/${singleVenderData.product_image}`
      : null;

    // Respond with the product data
    return res.status(200).json({
      success: true,
      data: singleVenderData,
      message: "Product fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product data",
      error: error.message,
    });
  }
};



import Product from "../model/product.js"

export const createProduct=async(req,res)=>{
    const {Brand_name}=req?.body
    const Brand_image = req?.file?.filename;

   
    try {
        const ProductData=new Product({
            Brand_name:Brand_name,
            Brand_image:Brand_image,
        })
       await ProductData.save()
       res.status(200).json({
        success: true,
        ProductData,
        message: "ProductData add successfully",
    });
    } catch (error) {
    res.status(400).json({
        success: false,
        message: error.message, 
    });
    }
}

export const getProduct = async (req, res) => {
    const url = process.env.URL;

    try {
        const findProductData = await Product.find();
        console.log("Fetched products:", findProductData);

        findProductData.forEach(element => {
            element.Brand_image = element.Brand_image
                ? `${url}/images/${element.Brand_image}`
                : null;
        });

        return res.status(200).json({
            success: true,
            data: findProductData,
            message: "Products fetched successfully",
        });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        
        return res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message,
        });
    }
};


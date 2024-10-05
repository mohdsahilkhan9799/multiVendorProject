import Category from "../model/category.js"


export const createcategory=async(req,res)=>{
const {name}=req?.body
const product_image = req?.file?.filename;
console.log("name",req?.file)
try {
    const categoryData=new Category({
        name:name,
        product_image
    })
    console.log("categoryData",categoryData)
   await categoryData.save()
   res.status(200).json({
    success: true,
    categoryData,
    message: "categoryData add successfully",
});
} catch (error) {
res.status(400).json({
    success: false,
    message: error.message, 
});
}

}

export const getcategory=async(req,res)=>{
    const url = process.env.URL || 'http://localhost:1999';
    try {
       const findCategoryData= await Category.find()

       findCategoryData.forEach(element => {
        element.product_image = element.product_image
            ? `${url}/images/${element.product_image}`
            : null;
    });
       res.status(200).json({
        success: true,
        findCategoryData,
        message: "get successfully",
    });
    } catch (error) {
    res.status(400).json({
        success: false,
        message: error.message, 
    });
    }

    }
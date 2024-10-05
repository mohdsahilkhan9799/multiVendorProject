import Order from "../model/Order.js"


export const CreateOrder=async(req,res)=>{
    const {order_name,order_price,order_discount,userId,total_price,order_quantity,order_image,VendorProductId,dispatch}=req?.body 
    // const order_image=req?.file?.filename

    try {
        const OrderData= new Order({
            order_name,order_price,order_discount,order_image,userId,total_price,order_quantity,
            VendorProductId,dispatch
        })
        await OrderData.save()
        res.status(200).json({
            message:"successfull create order",
            OrderData,
            status:true
        })
    } catch (error) {
        res.status(401).json({
            message:error.message,
            status:false
        })
        
    }
}


export const GetAllOrder=async(req,res)=>{
    const url=process.env.URL
    try {
        
        const allOrder= await Order.find()
   

        console.log("All Order :",allOrder)
     
        // allOrder.forEach(element => {
        //     element.order_image=element.order_image?`${url}/images/${element?.order_image}`:null
        // });


        
      return  res.status(200).json({
            message:"find all order",
            allOrder
        })
    } catch (error) {
        
     return   res.status(401).json({
            message:"error",
        })
    }
}

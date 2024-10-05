import Coupans from "../model/Coupans.js";

// Create Coupans
export const createCoupans = async (req, res) => {
    console.log("Request Body check!!!!:", req.body);
    const { Coupans_name, discount } = req.body;
    console.log("Request Body:", req.body);

    try {
        const coupans_data = new Coupans({
            Coupans_name,
            discount,
        });
        
        await coupans_data.save();

        res.status(201).json({
            success: true,
            coupans_data,
            message: "Coupan added successfully",
        });
    } catch (error) {
        console.error("Error creating coupan:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to add coupan.",
            error: error.message,
        });
    }
};

// Get Coupans
export const getCoupanss = async (req, res) => {
    try {
        const findCoupans = await Coupans.find();
        console.log("Fetched Coupanss:", findCoupans);

        return res.status(200).json({
            success: true,
            data: findCoupans, 
            message: "Coupans fetched successfully", 
        });
    } catch (error) {
        console.error("Error fetching Coupanss:", error.message);
        
        return res.status(500).json({
            success: false,
            message: "Failed to fetch coupans",
            error: error.message,
        });
    }
};

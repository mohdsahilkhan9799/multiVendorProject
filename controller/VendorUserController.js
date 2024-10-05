import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import VendorUser from "../model/VendorUser.js";

export const VendorRegisterUser = async (req, res) => {
    const {
      name,
      address,
      email,
      password,
      phone,
      company_name,
      company_address,
      gst_number,
      account_number,
      bank_name,
      ifsc_code,
      pan_card,
      adhar_card,
      country_name,
      state_name,
      pin_number,
    } = req.body;
  
    const profile_image = req?.file?.filename;
  
    try {
      // Check if the user already exists
      const existingUser = await VendorUser.findOne({ email: email });
  
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this email address",
        });
      }
  
      // Hash the password
      const hashPassword = await bcrypt.hash(password, 10);
  
      // Create a new vendor user
      const createVendorUser = new VendorUser({
        name,
        address,
        email,
        password: hashPassword,
        phone,
        profile_image,
        company_name,
        company_address,
        gst_number,
        account_number,
        bank_name,
        ifsc_code,
        pan_card,
        adhar_card,
        country_name,
        state_name,
        pin_number,
      });
  
      // Save the user to the database
      await createVendorUser.save();
  
      // Return success response
      res.status(201).json({
        success: true,
        createVendorUser,
        message: "Vendor registered successfully",
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error: " + error.message,
      });
    }
  };

// export const LoginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }
//         if (user.password !== password) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid credentials",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             user,
//             message: "User login successful",
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };


export const LoginVendorUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await VendorUser.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token with expiration
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_Expair } // Add expiration as an option here
    );

    res.status(200).json({
      success: true,
      message: "User login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  };
  
  
  


export const LogoutVendorUser = async (req, res) => {
  try {
    // Respond with a success message
    res.status(200).json({
      success: true,
      message: "Logout successful!",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Logout failed. Please try again.",
    });
  }
};

export const getVendorRegister = async (req, res) => {
  const url = process.env.URL;

  try {
    const user = await VendorUser.findById(req.user.id); 

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("The user value is:", user);
    console.log("user.profileImage", user.profile_image);

    user.profile_image = user.profile_image
      ? `${url}/images/${user.profile_image}`
      : null;

    console.log("user after ", user);

 return   res.status(200).json({
      success: true,
      user,
      message: "User retrieved successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

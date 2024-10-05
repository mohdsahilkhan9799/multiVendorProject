import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/CustomerData.js";

export const CustomerRegisterUser = async (req, res) => {
  const { name, address, email, password, phone} = req.body;
  const profile_image = req?.file?.filename;
  console.log("req?.file", req?.file);

  let exisitingUser = await User.find({ email: email });

  if (!exisitingUser) {
    res.status(400).json({
      success: false,
      message: "User is Already Exists with this Email Addresss",
    });
    return;
  }
  try {
   
    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = new User({
      name,
      address,
      email,
      password: hashPassword,
      phone,

      profile_image,
    });

    await createUser.save();

    res.status(200).json({
      success: true,
      createUser,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const CustomerLoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

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

export const CustomerLogoutUser = async (req, res) => {
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

export const getCustomerRegister = async (req, res) => {
  const url = process.env.URL;

  try {
    const user = await User.findById(req.user.id); 

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

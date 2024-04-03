import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Login to access this resource",
      });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(data._id); 
    console.log(user)

    req.user = user;

    next();
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Login to access this resource",
    });
  }
};

import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log(req.body);

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }
    // console.log("Hii")
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 10 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Logged In Successfully",
        token,
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const userLogout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: false,
        secure: false,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.find({ _id: req.user[0]._id });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      success: false,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { email, password } = req.body;

    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "user updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      success: false,
    });
  }
};

// export const getUser = async(req,res)=>{
//     try{
//         const user = await User.find({});
//         res.status(200).json({
//             success: false,
//             user
//         })

//     }catch(e){
//         res.status(400).json({
//             success: false,
//         })
//     }
// }

// export const createUser = async(req,res)=>{
//     try{
//         const user = new User(req.body);
//         await user.save();
//         res.status(200).json({
//             success: true,
//             user
//         })

//     }catch(e){
//         res.status(400).json({
//             success: false,
//         })
//     }
// }

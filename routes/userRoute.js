import express from "express";
import {
  // createUser,
  // getUser,
  myProfile,
  updateUser,
  userLogin,
  userLogout,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRoute = express.Router();
userRoute.post("/login", userLogin);
// userRoute.post("/create", createUser);
// userRoute.get("/getUser", getUser);
userRoute.get("/me",isAuthenticated, myProfile);
userRoute.get("/logout", userLogout);
userRoute.put("/update", isAuthenticated,updateUser);

export default userRoute;

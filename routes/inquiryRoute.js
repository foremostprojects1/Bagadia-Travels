import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { addInquiry, addSmallInquiry, getInquiries, recentInquiries } from "../controllers/inquiryController.js";

const userRoute = express.Router();
userRoute.post("/addInquiry", addInquiry);
userRoute.post("/addSmallInquiry", addSmallInquiry);
userRoute.get("/getInquiries",isAuthenticated, getInquiries);
userRoute.get("/getRecentInquiries",isAuthenticated, recentInquiries);

export default userRoute;

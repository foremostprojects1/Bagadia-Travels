import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { addInquiry, addSmallInquiry, getInquiries, recentInquiries } from "../controllers/inquiryController.js";

const userRoute = express.Router();
userRoute.post("/addInquiry", addInquiry);
userRoute.post("/addSmallInquiry", addSmallInquiry);
userRoute.get("/getInquiries", getInquiries);
userRoute.get("/getRecentInquiries", recentInquiries);

export default userRoute;

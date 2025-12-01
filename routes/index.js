import express from "express";
import userRoute from "./userRoute.js";
import tourRoute from "./tourRoute.js";
import inquiryRoute from "./inquiryRoute.js";
import cabRoute from "./cabRoute.js"
const router = express.Router();

router.use("/user",userRoute);
router.use("/tour",tourRoute);
router.use("/inquiry",inquiryRoute);
router.use("/cab",cabRoute);


export default router;
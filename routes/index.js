import express from "express";
import userRoute from "./userRoute.js";
import tourRoute from "./tourRoute.js";
import inquiryRoute from "./inquiryRoute.js";

const router = express.Router();

router.use("/user",userRoute);
router.use("/tour",tourRoute);
router.use("/inquiry",inquiryRoute);


export default router;
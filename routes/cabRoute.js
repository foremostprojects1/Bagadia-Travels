import express from "express";
import {
  addCab,
  updateCab,
  deleteCab,
  toggleCabStatus,
  getAllCabs,
  getActiveCabs,
} from "../controllers/cabController.js";

const router = express.Router();

router.post("/", addCab);
router.get("/", getAllCabs);
router.get("/active", getActiveCabs);
router.put("/:id", updateCab);
router.delete("/:id", deleteCab);
router.patch("/:id/status", toggleCabStatus);

export default router;

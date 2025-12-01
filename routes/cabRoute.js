import express from "express";
import {
  addCab,
  updateCab,
  deleteCab,
  toggleCabStatus,
  getAllCabs,
} from "../controllers/cabController.js";

const router = express.Router();

router.post("/", addCab);
router.get("/", getAllCabs);
router.put("/:id", updateCab);
router.delete("/:id", deleteCab);
router.patch("/:id/status", toggleCabStatus);

export default router;

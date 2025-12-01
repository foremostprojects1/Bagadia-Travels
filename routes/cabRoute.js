import express from "express";
import {
  addCab,
  updateCab,
  deleteCab,
  toggleCabStatus,
} from "../controllers/cab.controller.js";

const router = express.Router();

router.post("/", addCab);
router.put("/:id", updateCab);
router.delete("/:id", deleteCab);
router.patch("/:id/status", toggleCabStatus);

export default router;

import express from "express";
import { addTour, getTourById, getTours,deleteTourById,getToursByName, updateTour } from "../controllers/tourController.js";
import { isAuthenticated } from "../middleware/auth.js";

const tourRoute = express.Router();
tourRoute.post("/create", addTour);
tourRoute.put("/update/:id", updateTour);
tourRoute.get("/getTours",getTours);
tourRoute.get("/getTour/:id",getTourById);
tourRoute.delete("/deleteTour/:id",deleteTourById);
tourRoute.get("/getToursByName/:destination",getToursByName);

export default tourRoute;

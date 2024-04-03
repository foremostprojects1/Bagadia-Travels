import express from "express";
import { addTour, getTourById, getTours,deleteTourById,getToursByName } from "../controllers/tourController.js";
import { isAuthenticated } from "../middleware/auth.js";

const tourRoute = express.Router();
tourRoute.post("/create", addTour);
tourRoute.get("/getTours",getTours);
tourRoute.get("/getTour/:id",getTourById);
tourRoute.delete("/deleteTour/:id",deleteTourById);
tourRoute.get("/getToursByName/:destination",getToursByName);

export default tourRoute;

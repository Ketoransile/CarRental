import { Router } from "express";
import {
  createCar,
  getSingleCar,
  deleteSingleCar,
  editSingleCar,
  getAllCars,
  // editSingleCar,
} from "../controller/CarController.js";
import { authenticatedUser } from "../middlewares/authenticatedUser.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const route = Router();
route.post("/create", isAdmin, createCar);
// route.get("/getCar/:id", getSingleCar);
route.get("/getCar/:id", getSingleCar);
route.get("/getAllCars", getAllCars);
route.delete("/deleteCar/:id", isAdmin, deleteSingleCar);
route.patch("/editCar/:id", isAdmin, editSingleCar);

export default route;

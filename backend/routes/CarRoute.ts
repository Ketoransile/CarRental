import { Router } from "express";
import {
  createCar,
  getSingleCar,
  deleteSingleCar,
  editSingleCar,
  getAllCars,
  // editSingleCar,
} from "../controller/carController";
import { authenticatedUser } from "../middlewares/authenticatedUser";

const route = Router();
route.post("/create", createCar);
route.get("/getCar/:id", getSingleCar);
route.get("/getAllCars", authenticatedUser, getAllCars);
route.delete("/deleteCar/:id", deleteSingleCar);
route.patch("/editCar/:id", editSingleCar);

export default route;

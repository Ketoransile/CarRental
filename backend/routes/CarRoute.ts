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
import {
  carIdParamValidation,
  createCarValidation,
} from "../middlewares/validationMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const route = Router();
route.post("/create", isAdmin, createCarValidation, validateRequest, createCar);
// route.get("/getCar/:id", getSingleCar);
route.get("/getCar/:id", carIdParamValidation, validateRequest, getSingleCar);
route.get("/getAllCars", getAllCars);
route.delete(
  "/deleteCar/:id",
  isAdmin,
  carIdParamValidation,
  validateRequest,
  deleteSingleCar
);
route.patch(
  "/editCar/:id",
  isAdmin,
  carIdParamValidation,
  validateRequest,
  editSingleCar
);

export default route;

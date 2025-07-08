import { Router } from "express";
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  // cancelBooking,
  getBookingById,
  // checkCarAvailability,
  getVehicleBookings,
} from "../controller/BookingController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { authenticatedUser } from "../middlewares/authenticatedUser.js";
import {
  bookingIdParamValidation,
  bookingValidation,
  userIdParamValidation,
  vehicleIdParamValidation,
} from "../middlewares/validationMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = Router();

router.get("/", isAdmin, getAllBookings);

router.post(
  "/",
  authenticatedUser,
  bookingValidation,
  validateRequest,
  createBooking
);

router.get(
  "/:bookingId",
  authenticatedUser,
  bookingIdParamValidation,
  validateRequest,
  getBookingById
);

router.get(
  "/user/:userId",
  authenticatedUser,
  userIdParamValidation,
  validateRequest,
  getUserBookings
);
router.get(
  "/vehicle/:vehicleId",
  authenticatedUser,
  vehicleIdParamValidation,
  validateRequest,
  getVehicleBookings
);

// router.delete("/:bookingId", cancelBooking);

// router.get("/availability/car/:carId", checkCarAvailability);

export default router;

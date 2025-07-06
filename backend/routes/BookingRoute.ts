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

const router = Router();

router.get("/", isAdmin, getAllBookings);

router.post("/", authenticatedUser, createBooking);

router.get("/:bookingId", authenticatedUser, getBookingById);

router.get("/user/:userId", authenticatedUser, getUserBookings);
router.get("/vehicle/:vehicleId", authenticatedUser, getVehicleBookings);

// router.delete("/:bookingId", cancelBooking);

// router.get("/availability/car/:carId", checkCarAvailability);

export default router;

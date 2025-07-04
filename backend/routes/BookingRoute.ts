import { Router } from "express";
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  // cancelBooking,
  getBookingById,
  checkCarAvailability,
} from "../controller/BookingController";
import { isAdmin } from "../middlewares/isAdmin";
import { authenticatedUser } from "../middlewares/authenticatedUser";

const router = Router();

router.get("/", isAdmin, getAllBookings);

router.post("/", authenticatedUser, createBooking);

router.get("/:bookingId", authenticatedUser, getBookingById);

router.get("/user/:userId", authenticatedUser, getUserBookings);

// router.delete("/:bookingId", cancelBooking);

router.get("/availability/car/:carId", checkCarAvailability);

export default router;

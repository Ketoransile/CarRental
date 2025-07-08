import { body } from "express-validator";
import { param } from "express-validator";
//Auth validation
export const registerValidation = [
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("INvalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Passwird must be at least 6 charcaters"),
];

export const loginValidation = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const bookingValidation = [
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),

  body("address").notEmpty().withMessage("Address is required"),

  body("city").notEmpty().withMessage("City is required"),

  body("confirmationTerms")
    .isArray({ min: 1 })
    .withMessage("You must agree to at least one confirmation term"),

  body("confirmationTerms.*")
    .isString()
    .withMessage("Each confirmation term must be a string"),

  body("vehicleId")
    .notEmpty()
    .withMessage("Vehicle ID is required")
    .isMongoId()
    .withMessage("Vehicle ID must be a valid Mongo ID"),

  body("pickUpDate")
    .notEmpty()
    .withMessage("Pick-up date is required")
    .isISO8601()
    .withMessage("Pick-up date must be a valid date"),

  body("dropOffDate")
    .notEmpty()
    .withMessage("Drop-off date is required")
    .isISO8601()
    .withMessage("Drop-off date must be a valid date"),

  body("pickUpLocation").notEmpty().withMessage("Pick-up location is required"),

  body("dropOffLocation")
    .notEmpty()
    .withMessage("Drop-off location is required"),

  body("totalPrice")
    .notEmpty()
    .withMessage("Total price is required")
    .isNumeric()
    .withMessage("Total price must be a number"),
];
export const bookingIdParamValidation = [
  param("bookingId")
    .notEmpty()
    .withMessage("Booking ID is required")
    .isMongoId()
    .withMessage("Booking ID must be a valid Mongo ID"),
];

// Validate :userId in GET /user/:userId
export const userIdParamValidation = [
  param("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("User ID must be a valid Mongo ID"),
];

// Validate :vehicleId in GET /vehicle/:vehicleId
export const vehicleIdParamValidation = [
  param("vehicleId")
    .notEmpty()
    .withMessage("Vehicle ID is required")
    .isMongoId()
    .withMessage("Vehicle ID must be a valid Mongo ID"),
];
export const carIdParamValidation = [
  param("id")
    .notEmpty()
    .withMessage("Car ID is required")
    .isMongoId()
    .withMessage("Car ID must be a valid Mongo ID"),
];
export const createCarValidation = [
  body("make").notEmpty().withMessage("Make is required"),
  body("model").notEmpty().withMessage("Model is required"),
  body("year")
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage("Year must be a valid year"),
  body("type").notEmpty().withMessage("Type is required"),
  body("transmission").notEmpty().withMessage("Transmission is required"),
  body("seats").isInt({ min: 1 }).withMessage("Seats must be at least 1"),
  body("doors").isInt({ min: 1 }).withMessage("Doors must be at least 1"),
  body("pricePerDay")
    .isFloat({ gt: 0 })
    .withMessage("Price per day must be greater than 0"),
  body("available").isBoolean().withMessage("Available must be boolean"),
  // Optional fields
  body("mileage")
    .optional()
    .isNumeric()
    .withMessage("Mileage must be a number"),
  body("fuelType").optional().isString(),
  body("ac").optional().isBoolean(),
  body("image").optional().isString(),
  body("features").optional().isArray(),
  body("description").optional().isString(),
];

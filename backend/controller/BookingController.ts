import { Request, Response, NextFunction } from "express"; // Import NextFunction
import { AppError } from "../middlewares/errorHandler";
import { Booking } from "../models/Booking";
import { Car } from "../models/car";
import { auth } from "../utils/auth";
import { fromNodeHeaders } from "better-auth/node";
import { connectDB } from "../config/db";
import { ObjectId } from "mongodb";

// export const createBooking = async (
//   req: Request,
//   res: Response,
//   next: NextFunction // Add next to the function signature
// ): Promise<void> => {
//   try {
//     // console.log("req ", req); // Often not needed in production, can be noisy
//     if (!req.body) {
//       throw new AppError("Empty request body", 400); // More descriptive message
//     }
//     const userId = req.user?.id;
//     const {
//       fullName,
//       phoneNumber,
//       address,
//       city,
//       confirmationTerms,
//       vehicleId,
//       pickUpDate,
//       dropOffDate,
//       pickUpLocation,
//       dropOffLocation,
//       totalPrice,
//     } = req.body;

//     if (
//       !userId ||
//       !fullName ||
//       !phoneNumber ||
//       !address ||
//       !city ||
//       !confirmationTerms ||
//       confirmationTerms.length === 0 ||
//       !vehicleId ||
//       !pickUpDate ||
//       !dropOffDate ||
//       !pickUpLocation ||
//       !dropOffLocation ||
//       !totalPrice
//     ) {
//       throw new AppError("Missing required fields or invalid data", 400);
//     }

//     const parsedPickUpDate = new Date(pickUpDate);
//     const parsedDropOffDate = new Date(dropOffDate);

//     if (
//       isNaN(parsedPickUpDate.getTime()) ||
//       isNaN(parsedDropOffDate.getTime())
//     ) {
//       throw new AppError(
//         "Invalid date format for pick-up or drop-off dates",
//         400
//       );
//     }

//     if (parsedPickUpDate >= parsedDropOffDate) {
//       throw new AppError("Drop-off date must be after pick-up date", 400);
//     }

//     // It's more robust to check for *overlapping* bookings, not just if a car is booked at all
//     // This assumes `pickUpDate` and `dropoffDate` are Date objects or can be compared
//     const existingBooking = await Booking.findOne({
//       vehicleId,
//       $or: [
//         {
//           pickUpDate: { $lte: dropOffDate },
//           dropOffDate: { $gte: pickUpDate },
//         },
//       ],
//     });

//     if (existingBooking) {
//       throw new AppError("Car is already booked for the selected dates", 409); // Use 409 Conflict for resource conflict
//     }

//     const newBooking = new Booking({
//       userId,
//       fullName, // Added
//       phoneNumber, // Added
//       address, // Added
//       city, // Added
//       confirmationTerms, // Added
//       vehicleId,
//       pickUpDate: parsedPickUpDate, // Use the parsed Date object
//       dropOffDate: parsedDropOffDate, // Use the parsed Date object
//       pickUpLocation,
//       dropOffLocation,
//       totalPrice,
//     });
//     const savedBooking = await newBooking.save();

//     if (!savedBooking) {
//       // This case is unlikely if save doesn't throw, but good for explicit checks
//       throw new AppError("Failed to save booking. Please try again.", 500); // 500 for server-side issue
//     }

//     res.status(201).json({
//       // Use 201 Created for successful resource creation
//       success: true,
//       message: "Successfully booked the car",
//       data: savedBooking,
//     });
//   } catch (error) {
//     // Pass the error to the next middleware (your errorHandler)
//     // This ensures your centralized error handling logic is applied.
//     next(error);
//   }
// };
export const getAuthenticatedUser = async (req: Request) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  console.log("sessio from booking controller is", session);
  if (!session?.user?.id) {
    throw new AppError("Unauthenticated", 401);
  }

  const client = await connectDB();
  const db = client.db();

  const user = await db.collection("user").findOne({
    _id: new ObjectId(session.user.id),
  });
  // console.log("user from booking controller is ", user);

  if (!user) {
    throw new AppError("User not found in database", 404);
  }

  return user;
};
export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.body) {
      throw new AppError("Empty request body", 400);
    }

    const userId = req.user?.id; // Get userId from authenticated user session

    const {
      fullName,
      phoneNumber,
      address,
      city,
      confirmationTerms,
      vehicleId,
      pickUpDate,
      dropOffDate,
      pickUpLocation,
      dropOffLocation,
      totalPrice,
    } = req.body;

    // 1. Basic field validation
    const missingFields: string[] = [];

    if (!userId) missingFields.push("userId");
    if (!fullName) missingFields.push("fullName");
    if (!phoneNumber) missingFields.push("phoneNumber");
    if (!address) missingFields.push("address");
    if (!city) missingFields.push("city");
    if (!confirmationTerms || confirmationTerms.length === 0)
      missingFields.push("confirmationTerms");
    if (!vehicleId) missingFields.push("vehicleId");
    if (!pickUpDate) missingFields.push("pickUpDate");
    if (!dropOffDate) missingFields.push("dropOffDate");
    if (!pickUpLocation) missingFields.push("pickUpLocation");
    if (!dropOffLocation) missingFields.push("dropOffLocation");
    if (!totalPrice) missingFields.push("totalPrice");

    if (missingFields.length > 0) {
      throw new AppError(
        `Missing or invalid fields: ${missingFields.join(", ")}`,
        400
      );
    }

    const parsedPickUpDate = new Date(pickUpDate);
    const parsedDropOffDate = new Date(dropOffDate);

    // Date format and logic validation
    if (
      isNaN(parsedPickUpDate.getTime()) ||
      isNaN(parsedDropOffDate.getTime())
    ) {
      throw new AppError(
        "Invalid date format for pick-up or drop-off dates",
        400
      );
    }
    if (parsedPickUpDate >= parsedDropOffDate) {
      throw new AppError("Drop-off date must be after pick-up date", 400);
    }
    if (parsedPickUpDate < new Date()) {
      // Cannot book in the past
      throw new AppError("Pick-up date cannot be in the past", 400);
    }

    // 2. User existence check
    // const user = await User.findById(userId);
    // if (!user) {
    //   throw new AppError("Authenticated user not found in the database.", 404);
    // }

    const user = getAuthenticatedUser(req);
    if (!user) {
      throw new AppError("Authenticated user not found in the  .", 404);
    }

    // 3. Vehicle existence and general availability check
    const vehicle = await Car.findById(vehicleId); // Using Car model name as per recent discussion
    if (!vehicle) {
      throw new AppError("Vehicle not found with the provided ID.", 404);
    }
    if (!vehicle.available) {
      // Assuming 'available' is a boolean field on your Car model
      throw new AppError(
        "Selected vehicle is not currently available for general booking.",
        409
      );
    }

    // 4. Final Car Availability Check (against existing bookings)
    const overlappingBookings = await Booking.find({
      vehicleId,
      // Overlap logic: A booking exists if its period [pickupDate, dropoffDate]
      // overlaps with the requested period [parsedPickUpDate, parsedDropOffDate].
      // This covers all 3 overlap scenarios (requested period inside existing,
      // existing inside requested, or partial overlap).
      $or: [
        {
          pickUpDate: { $lt: parsedDropOffDate }, // Existing starts before requested ends
          dropOffDate: { $gt: parsedPickUpDate }, // Existing ends after requested starts
        },
      ],
      // Exclude confirmed/completed bookings if they are considered "available" after their period
      // and only care about "pending" or "confirmed" for actual conflicts
      // This is crucial to prevent re-booking a car that's already completed its booking
      // status: { $in: ["pending", "confirmed"] } // Example: only check pending/confirmed bookings
    });

    if (overlappingBookings.length > 0) {
      throw new AppError("Car is already booked for the selected dates.", 409); // 409 Conflict
    }

    // 5. Pricing Consistency Check (calculate on backend and compare)
    // Assuming vehicle.dailyRate exists and dates are in days
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const durationDays = Math.ceil(
      (parsedDropOffDate.getTime() - parsedPickUpDate.getTime()) /
        millisecondsPerDay
    );
    const expectedTotalPrice = vehicle.dailyRate * durationDays; // Adjust based on your pricing logic (e.g., hourly, fixed fees)

    // Allow for small floating point discrepancies, or use a fixed-point arithmetic library
    const priceTolerance = 0.01;
    if (Math.abs(totalPrice - expectedTotalPrice) > priceTolerance) {
      // You might log this discrepancy for fraud detection
      throw new AppError("Price mismatch. Please refresh and try again.", 400);
    }

    // 6. Confirmation Terms Check (ensure specific terms were agreed if needed)
    const requiredTerms = ["terms", "news"]; // Example: define what terms must be agreed
    const hasAgreedToAllRequired = requiredTerms.every((term) =>
      confirmationTerms.includes(term)
    );
    if (!hasAgreedToAllRequired) {
      throw new AppError(
        "You must agree to all required terms and conditions.",
        400
      );
    }

    // Create the new booking document
    const newBooking = new Booking({
      userId,
      fullName,
      phoneNumber,
      address,
      city,
      confirmationTerms,
      vehicleId,
      pickUpDate: parsedPickUpDate, // Use the parsed Date object
      dropOffDate: parsedDropOffDate, // Use the parsed Date object
      pickUpLocation,
      dropOffLocation,
      totalPrice,
      // status will default to "pending" as per schema
    });

    const savedBooking = await newBooking.save();

    if (!savedBooking) {
      throw new AppError("Failed to save booking. Please try again.", 500);
    }

    res.status(201).json({
      // 201 Created for successful resource creation
      success: true,
      message: "Successfully booked the car",
      data: savedBooking,
    });
  } catch (error) {
    next(error); // Pass the error to the next middleware (your errorHandler)
  }
};
export const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings = await Booking.find();
    if (!bookings || bookings.length === 0) {
      throw new AppError("No bookings found in the database", 404);
    }
    res.status(200).json({
      success: true,
      message: "Boookings are fetched successfully",
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};
export const getUserBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (req.user && req.user.id !== userId && req.user.role !== "admin") {
      throw new AppError("You are not authorized to view these bookings.", 403);
    }

    const userBooking = await Booking.find({ userId });

    if (!userBooking || userBooking.length === 0) {
      throw new AppError("No booking found for the user", 404);
    }

    res.status(200).json({
      success: true,
      message: "User bookings are fetched successfully",
      data: userBooking,
    });
  } catch (error) {
    next(error);
  }
};
export const getBookingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      res.status(400).json({
        success: false,
        status: "fail",
        message: "Missing booking ID",
        data: null,
      });
      return;
    }

    const booking = await Booking.findById(bookingId);

    res.status(200).json({
      success: true,
      message: booking
        ? "Booking was fetched successfully"
        : "No booking found with that ID",
      data: booking || null,
    });
  } catch (error) {
    next(error);
  }
};

export const getVehicleBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the vehicleId (or vehicleId) from the request parameters
    const { vehicleId } = req.params;

    // Validate if vehicleId is provided
    if (!vehicleId) {
      // If vehicleId is missing, throw an AppError with a 400 status
      throw new AppError("Missing car ID", 400);
    }

    // Find all bookings where the vehicleId matches the provided vehicleId
    // Note: This will return an array of bookings, not just one.
    const bookings = await Booking.find({ vehicleId: vehicleId });
    console.log("bookings from bookcontroller functino", bookings);
    // If no bookings are found for the given vehicleId

    // If bookings are found, send a success response
    res.status(200).json({
      success: true,
      message: "Bookings for the car were fetched successfully",
      data: bookings, // Send the array of bookings
    });
  } catch (error) {
    // Pass any caught error to the next middleware (error handling middleware)
    next(error);
  }
};
export const checkCarAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { vehicleId } = req.params;
    const { pickUpDate, dropoffDate } = req.query;

    if (!vehicleId) {
      throw new AppError("Missing car ID", 400);
    }

    const car = await Car.findOne({ _id: vehicleId });
    if (!car) {
      throw new AppError("No car was found with that ID", 404);
    }

    if (!car.available) {
      res.status(200).json({
        success: true,
        message: `Car with the ID ${vehicleId} is currently not generally available.`,
        data: { vehicleId: car._id, isAvailable: false },
      });
      return;
    }

    let isDateAvailable = true;
    let message = `Car with the ID ${vehicleId} is available.`;

    if (pickUpDate && dropoffDate) {
      const requestedPickUp = new Date(pickUpDate as string);
      const requestedDropoff = new Date(dropoffDate as string);

      if (requestedPickUp >= requestedDropoff) {
        throw new AppError("Drop-off date must be after pick-up date", 400);
      }

      const overlappingBookings = await Booking.find({
        vehicleId: vehicleId,
        $or: [
          {
            pickUpDate: { $lt: requestedDropoff },
            dropoffDate: { $gt: requestedPickUp },
          },
        ],
      });

      if (overlappingBookings.length > 0) {
        isDateAvailable = false;
        message = `Car with the ID ${vehicleId} is booked for some part of the requested dates (${pickUpDate} to ${dropoffDate}).`;
      }
    } else {
      message = `Car with the ID ${vehicleId} is generally available (no specific dates checked).`;
    }

    res.status(200).json({
      success: true,
      message: message,
      data: {
        vehicleId: car._id,
        isAvailable: isDateAvailable,
      },
    });
  } catch (error) {
    next(error);
  }
};
// export const cancelBooking = async () => {};

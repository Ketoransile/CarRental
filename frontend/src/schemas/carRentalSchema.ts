import { z } from "zod";
const objectIdRegex = /^[a-f\d]{24}$/i;
export const CarRentalSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full Name is required" }),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" })
      .regex(/^\+?[0-9\s-()]*$/, { message: "Invalid phone number format." }),
    address: z.string().min(1, { message: "Address is required." }),
    city: z.string().min(1, { message: "City is required" }),
    pickUpLocation: z
      .string()
      .min(1, { message: "Pickup Location is required" }),
    pickUpDate: z
      .string()
      .min(1, { message: "Pick-up date is required" })
      .refine(
        (val) => {
          // Parse the pick-up date string into a Date object
          const pickUp = new Date(val);
          // Get the current date and add one week
          const oneWeekFromNow = new Date();
          oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
          oneWeekFromNow.setHours(0, 0, 0, 0); // Normalize to start of day for accurate comparison

          // Normalize pickUp date to start of day as well
          pickUp.setHours(0, 0, 0, 0);

          // Check if pick-up date is at least one week from now
          return pickUp >= oneWeekFromNow;
        },
        {
          message: "Pick-up date must be at least one week from today.",
        }
      ),
    dropOffLocation: z
      .string()
      .min(1, { message: "Drop-off location is required" }),
    // Remove the cross-field validation from here, it will be moved to superRefine
    dropOffDate: z.string().min(1, { message: "Drop-off date is required" }),
    vehicleId: z
      .string()
      .min(1, { message: "vehicleId is required" })
      .regex(objectIdRegex, { message: "Invalid MongoDB ObjectId format" }),
    totalPrice: z
      .number({ required_error: "Total price is required" })
      .min(0.01, "Total price must be greater than 0"),

    confirmationTerms: z
      .array(z.string())
      .transform((arr) => arr.map((s) => s.trim().toLowerCase()))
      .refine((val) => val.includes("terms") && val.includes("news"), {
        message: "You must agree with our terms, conditions and policies.",
      }),
  })
  .superRefine((data, ctx) => {
    // Only perform this validation if both dates are present and valid strings
    if (data.pickUpDate && data.dropOffDate) {
      const pickUp = new Date(data.pickUpDate);
      const dropOff = new Date(data.dropOffDate);

      if (dropOff <= pickUp) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Drop-off date must be after the pick-up date.",
          path: ["dropOffDate"], // This targets the error to the dropOffDate field
        });
      }
    }
  });

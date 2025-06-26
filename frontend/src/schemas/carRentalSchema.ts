import { z } from "zod";

export const CarRentalSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
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

    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    cardNumber: z
      .string()
      .min(16, { message: "Card Number must be 16 digits" })
      .max(16, { message: "Card Number must be 16 digits" })
      .regex(/^[0-9]{16}$/, {
        message: "Invalid card number format. Must be 16 digits.",
      }),
    expiryDate: z
      .string()
      .min(1, { message: "Expiry date is required." })
      .regex(/^\d{2}\/\d{2}$/, { message: "Format must be MM/YY." })
      .refine(
        (val) => {
          const [month, year] = val.split("/").map(Number);
          if (isNaN(month)) return false;
          if (isNaN(year)) return false;

          // Convert 2-digit year to full year (e.g., "25" -> 2025)
          const fullYear = 2000 + year;
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth() + 1;

          return (
            fullYear > currentYear ||
            (fullYear === currentYear && month >= currentMonth)
          );
        },
        { message: "Expiry date must be in the future." }
      ),
    cvc: z
      .string()
      .min(3, { message: "CVC is required and must be 3 or 4 digits." })
      .max(4, { message: "CVC must be 3 or 4 digits." })
      .regex(/^[0-9]{3,4}$/, { message: "Invalid CVC format." }),

    // Confirmation Checkboxes
    confirmationTerms: z
      .array(z.string())
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

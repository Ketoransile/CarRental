import { Schema, model, Types } from "mongoose";

const BookingSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    vehicleId: { type: Types.ObjectId, ref: "Vehicle", required: true },

    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    confirmationTerms: { type: [String], required: true },

    pickUpDate: { type: Date, required: true },
    dropOffDate: { type: Date, required: true },
    pickUpLocation: { type: String, required: true },
    dropOffLocation: { type: String, required: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    },

    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Booking = model("Booking", BookingSchema);

import { Schema, model, Types } from "mongoose";

const BookingSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    vehicleId: { type: Types.ObjectId, ref: "Vehicle", required: true },

    pickupDate: { type: Date, required: true },
    dropoffDate: { type: Date, required: true },
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },

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

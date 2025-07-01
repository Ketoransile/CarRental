import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  doors: {
    type: Number,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  mileage: {
    type: Number,
  },
  fuelType: {
    type: String,
  },
  ac: {
    type: Boolean,
  },
  image: {
    type: String,
  },
  features: {
    type: [String],
  },
  description: {
    type: String,
  },
});
export const Car = mongoose.models.Car || mongoose.model("Car", carSchema);

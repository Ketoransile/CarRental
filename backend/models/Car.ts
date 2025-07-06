import mongoose, { Schema, model, Document } from "mongoose";

// 1. Define TypeScript interface
export interface ICar extends Document {
  make: string;
  carModel: string; // Renamed from 'model'
  year: number;
  type: string;
  transmission: string;
  seats: number;
  doors: number;
  pricePerDay: number;
  available: boolean;
  mileage?: number;
  fuelType?: string;
  ac?: boolean;
  image?: string;
  features?: string[];
  description?: string;
}

// 2. Define the schema
const carSchema = new Schema<ICar>({
  make: { type: String, required: true },
  carModel: { type: String, required: true },
  year: { type: Number, required: true },
  type: { type: String, required: true },
  transmission: { type: String, required: true },
  seats: { type: Number, required: true },
  doors: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  available: { type: Boolean, default: true },
  mileage: { type: Number },
  fuelType: { type: String },
  ac: { type: Boolean },
  image: { type: String },
  features: [{ type: String }],
  description: { type: String },
});

// 3. Export the model using mongoose.models
export const Car =
  (mongoose.models.Car as mongoose.Model<ICar>) ||
  model<ICar>("Car", carSchema);

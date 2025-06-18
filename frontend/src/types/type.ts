export interface ICar {
  id: number;
  make: string;
  model: string;
  year: number;
  type: string;
  transmission: "Automatic" | "Manual"; // Assuming only these two options
  seats: number;
  doors: number;
  pricePerDay: number;
  available: boolean;
  mileage: number;
  fuelType: "Gasoline" | "Electric" | "Diesel" | "Hybrid"; // Common fuel types
  ac: boolean;
  image: string; // This will hold the imported image path/URL
  features: string[];
}

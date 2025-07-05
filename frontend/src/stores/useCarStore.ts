// import { create } from "zustand";

// import axios from "axios";
// export type FCar = {
//   _id: string;
//   make: string;
//   model: string;
//   year: number;
//   type: string;
//   transmission: "Automatic" | "Manual"; // Assuming only these two options
//   seats: number;
//   doors: number;
//   pricePerDay: number;
//   available: boolean;
//   mileage: number;
//   fuelType: "Gasoline" | "Electric" | "Diesel" | "Hybrid"; // Common fuel types
//   ac: boolean;
//   image: string; // This will hold the imported image path/URL
//   features: string[];
//   description: string;
// };

// type CarStore = {
//   cars: FCar[];
//   loading: boolean;
//   error: string | null;
//   fetchCars: () => Promise<void>;
// };

// export const useCarStore = create<CarStore>((set) => ({
//   cars: [],
//   loading: false,
//   error: null,
//   fetchCars: async () => {
//     try {
//       set({ loading: true, error: null });
//       const res = await axios.get(
//         "http://localhost:5000/api/v1/car/getAllCars",
//         { withCredentials: true }
//       );
//       // console.log("res from fetchCars function ", res);
//       set({ cars: res.data.data, loading: false });
//     } catch (error: any) {
//       set({
//         error:
//           error?.response?.data?.message ||
//           error.message ||
//           "Something went wrong",
//         loading: false,
//       });
//     }
//   },
// }));
// src/stores/useCarStore.ts
import { create } from "zustand";
import axios from "axios";

// Define the type for a single car
export type FCar = {
  _id: string;
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
  description: string;
};

// --- START: Previously defined types and initial state ---
type CarStore = {
  cars: FCar[];
  loading: boolean; // For the 'cars' list
  error: string | null; // For the 'cars' list
  fetchCars: () => Promise<void>;
  // --- END: Previously defined types and initial state ---

  // --- START: Newly added properties and actions for single car ---
  selectedCar: FCar | null;
  loadingSelectedCar: boolean; // Specific loading for selected car
  errorSelectedCar: string | null; // Specific error for selected car
  fetchSingleCar: (id: string) => Promise<void>;
  setSelectedCarFromList: (id: string) => void; // To pick from already fetched list
  clearSelectedCar: () => void; // To clear selected car state
  // --- END: Newly added properties and actions for single car ---
};

// Centralize your API base URL
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1/car`; // Assuming '/car' endpoint for single operations

export const useCarStore = create<CarStore>((set, get) => ({
  // --- START: Previously defined initial state and action ---
  cars: [],
  loading: false, // Initial state for 'cars' list loading
  error: null, // Initial state for 'cars' list error

  fetchCars: async () => {
    try {
      set({ loading: true, error: null }); // Use 'loading' and 'error' for the 'cars' list
      const res = await axios.get(
        `${API_BASE_URL}/getAllCars`, // Use the centralized base URL
        { withCredentials: true }
      );
      set({ cars: res.data.data, loading: false });
    } catch (error: any) {
      console.error("Failed to fetch all cars:", error);
      set({
        error:
          error?.response?.data?.message ||
          error.message ||
          "Failed to fetch car list. Something went wrong.",
        loading: false,
      });
    }
  },
  // --- END: Previously defined initial state and action ---

  // --- START: Newly added initial state and actions for single car ---
  selectedCar: null,
  loadingSelectedCar: false,
  errorSelectedCar: null,

  fetchSingleCar: async (id) => {
    set({ loadingSelectedCar: true, errorSelectedCar: null });
    try {
      const res = await axios.get(
        `${API_BASE_URL}/getCar/${id}`, // Corrected URL with base and dynamic ID
        { withCredentials: true }
      );
      set({ selectedCar: res.data.data, loadingSelectedCar: false });
    } catch (error: any) {
      console.error(`Failed to fetch car with ID ${id}:`, error);
      set({
        errorSelectedCar:
          error?.response?.data?.message ||
          error.message ||
          `Failed to load car details for ID: ${id}. Something went wrong.`,
        loadingSelectedCar: false,
      });
    }
  },

  setSelectedCarFromList: (id: string) => {
    const { cars } = get(); // Use get() to access the current 'cars' state
    const car = cars.find((c) => c._id === id);
    if (car) {
      set({ selectedCar: car, errorSelectedCar: null });
    } else {
      // If car not found in list, consider fetching it or setting an error
      set({
        selectedCar: null,
        errorSelectedCar:
          "Car not found in the loaded list. You might need to fetch it.",
      });
    }
  },

  clearSelectedCar: () => {
    set({
      selectedCar: null,
      errorSelectedCar: null,
      loadingSelectedCar: false,
    });
  },
  // --- END: Newly added initial state and actions for single car ---
}));

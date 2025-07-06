import { create } from "zustand";
import axios from "axios";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export type FCar = {
  _id: string;
  make: string;
  model: string;
  year: number;
  type: string;
  transmission: "Automatic" | "Manual";
  seats: number;
  doors: number;
  pricePerDay: number;
  available: boolean;
  mileage: number;
  fuelType: "Gasoline" | "Electric" | "Diesel" | "Hybrid";
  ac: boolean;
  image: string;
  features: string[];
  description: string;
};

type FilterParams = {
  make?: string; // "Toyota,Hyundai"
  type?: string; // "SUV,Sedan"
  transmission?: string; // "Automatic"
  fuelType?: string; // "Diesel,Electric"
  page?: number;
  limit?: number;
};

type CarStore = {
  /* list state */
  cars: FCar[];
  loading: boolean;
  error: string | null;
  fetchCars: (filters?: FilterParams) => Promise<void>;

  /* single‑car state */
  selectedCar: FCar | null;
  loadingSelectedCar: boolean;
  errorSelectedCar: string | null;
  fetchSingleCar: (id: string) => Promise<void>;
  setSelectedCarFromList: (id: string) => void;
  clearSelectedCar: () => void;
};

/* ------------------------------------------------------------------ */
/*  Config                                                            */
/* ------------------------------------------------------------------ */

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`; // ← no trailing slash
//   list  →  `${API_BASE_URL}/cars`
//   single→  `${API_BASE_URL}/car/:id`

/* ------------------------------------------------------------------ */
/*  Store                                                             */
/* ------------------------------------------------------------------ */

export const useCarStore = create<CarStore>((set, get) => ({
  /* ─────────────── list ─────────────── */
  cars: [],
  loading: false,
  error: null,

  fetchCars: async (filters = {}) => {
    try {
      set({ loading: true, error: null });

      /* build URL with query‑string */
      const url = new URL(`${API_BASE_URL}/car/getAllCars`);
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== null && `${v}`.length > 0)
          url.searchParams.set(k, `${v}`);
      });

      const { data } = await axios.get(url.toString(), {
        withCredentials: true,
      });

      set({ cars: data.data, loading: false });
    } catch (err: any) {
      console.error("Failed to fetch cars:", err);
      set({
        loading: false,
        error:
          err?.response?.data?.message ||
          err.message ||
          "Failed to fetch cars. Something went wrong.",
      });
    }
  },

  /* ─────────────── single car ─────────────── */
  selectedCar: null,
  loadingSelectedCar: false,
  errorSelectedCar: null,

  fetchSingleCar: async (id) => {
    try {
      set({ loadingSelectedCar: true, errorSelectedCar: null });

      const { data } = await axios.get(`${API_BASE_URL}/car/getCar/${id}`, {
        withCredentials: true,
      });

      set({ selectedCar: data.data, loadingSelectedCar: false });
    } catch (err: any) {
      console.error(`Failed to fetch car ${id}:`, err);
      set({
        loadingSelectedCar: false,
        errorSelectedCar:
          err?.response?.data?.message ||
          err.message ||
          `Failed to load car ${id}.`,
      });
    }
  },

  setSelectedCarFromList: (id) => {
    const car = get().cars.find((c) => c._id === id);
    if (car) {
      set({ selectedCar: car, errorSelectedCar: null });
    } else {
      set({
        selectedCar: null,
        errorSelectedCar:
          "Car not found in the loaded list. Try fetching it first.",
      });
    }
  },

  clearSelectedCar: () =>
    set({
      selectedCar: null,
      loadingSelectedCar: false,
      errorSelectedCar: null,
    }),
}));

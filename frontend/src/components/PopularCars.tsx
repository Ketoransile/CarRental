import { useEffect } from "react";
import type { ICar } from "../types/car";
import { cars } from "../utils/dummyCarDetails";
import { CarCard } from "./CarCard";
import { useCarStore, type FCar } from "../stores/useCarStore";
import { LoadingSpinner } from "./LoadingSpinner";

export const PopularCars = () => {
  const { cars, loading, error, fetchCars } = useCarStore();
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="w-full flex flex-col gap-x-10 gap-y-4 items-start py-20 ">
      <h1 className="font-bold text-xl pb-4">
        Popular <span className="text-blue-600">Cars</span>
      </h1>
      <div className="w-full grid grid-cols-3 gap-x-10 gap-y-10 items-center justify-between ">
        {cars.slice(0, 3).map((car: FCar) => (
          <CarCard car={car} key={car._id} />
        ))}
      </div>
    </div>
  );
};

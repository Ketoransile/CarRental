import type { ICar } from "../types/car";
import { cars } from "../utils/dummyCarDetails";
import { CarCard } from "./CarCard";

export const PopularCars = () => {
  return (
    <div className="w-full flex flex-col gap-x-10 gap-y-4 items-start py-20 ">
      <h1 className="font-bold text-xl pb-4">
        Popular <span className="text-blue-600">Cars</span>
      </h1>
      <div className="w-full grid grid-cols-3 gap-x-10 gap-y-10 items-center justify-between ">
        {cars.slice(0, 3).map((car: ICar, index) => (
          <CarCard car={car} key={index} />
        ))}
      </div>
    </div>
  );
};

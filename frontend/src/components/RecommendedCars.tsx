import { Button } from "@heroui/react";
import type { ICar } from "../types/type";
import { cars } from "../utils/dummyCarDetails";
import { CarCard } from "./CarCard";

export const RecommendedCars = () => {
  return (
    <div className="w-full flex flex-col gap-x-10 gap-y-4 items-start py-20 ">
      <h1 className="font-bold text-xl pb-4">
        Recommended <span className="text-blue-600">Cars</span>
      </h1>
      <div className="w-full grid grid-cols-3 gap-x-10 gap-y-10 items-center justify-between ">
        {cars.slice(4, 8).map((car: ICar, index) => (
          <CarCard car={car} key={index} />
        ))}
      </div>
      <Button className="px-32 mt-10 bg-blue-600 text-white self-center">
        Show More Cars
      </Button>
    </div>
  );
};

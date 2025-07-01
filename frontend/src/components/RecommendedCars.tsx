import { Button } from "@heroui/react";
import { Link } from "react-router";
import type { ICar } from "../types/car";
import { cars } from "../utils/dummyCarDetails";
import { CarCard } from "./CarCard";
import {
  FaArrowRight,
  FaLongArrowAltRight,
  FaAngleRight,
  FaChevronRight,
} from "react-icons/fa";

export const RecommendedCars = () => {
  return (
    <div className="w-full flex flex-col gap-x-10 gap-y-4 items-start py-20 ">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-xl pb-4">
          Recommended <span className="text-blue-600">Cars</span>
        </h1>
        <Link
          to="/all-cars"
          className="font-bold cursor-pointer flex items-center gap-2 text-blue-600"
        >
          <span className="pr-2">View All</span>
          <FaLongArrowAltRight size={20} />
        </Link>
      </div>
      <div className="w-full grid grid-cols-3 gap-x-10 gap-y-10 items-center justify-between ">
        {cars.slice(4, 8).map((car: ICar, index) => (
          <CarCard car={car} key={index} />
        ))}
      </div>

      <Link to="/all-cars" className="text-white self-center">
        <Button className="px-32 mt-10 bg-blue-600  text-white ">
          Show More Cars
        </Button>
      </Link>
    </div>
  );
};

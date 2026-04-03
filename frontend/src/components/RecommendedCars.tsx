import { Button } from "@heroui/react";
import { Link } from "react-router";
// import type { ICar } from "../types/car";
// import { cars } from "../utils/dummyCarDetails";
import { CarCard } from "./CarCard";
import {
  // FaArrowRight,
  FaLongArrowAltRight,
  // FaAngleRight,
  // FaChevronRight,
} from "react-icons/fa";
import { useEffect } from "react";
import { useCarStore, type FCar } from "../stores/useCarStore";
import { LoadingSpinner } from "./LoadingSpinner";

export const RecommendedCars = () => {
  const { cars, loading, error, fetchCars } = useCarStore();
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 px-4">
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-red-100 shadow-sm max-w-2xl w-full mx-auto">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-red-500 text-3xl font-bold">!</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load cars</h3>
          <p className="text-gray-500 text-center mb-6">{error}</p>
          <button
            onClick={() => fetchCars()}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 px-4">
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-2xl w-full mx-auto">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <div className="text-gray-400 text-3xl">📭</div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No cars available</h3>
          <p className="text-gray-500 text-center mb-6">We couldn't find any recommended cars at the moment.</p>
          <Link to="/all-cars">
            <Button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm">
              View All Vehicles
            </Button>
          </Link>
        </div>
      </div>
    );
  }
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
        {cars.slice(4, 8).map((car: FCar, index) => (
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

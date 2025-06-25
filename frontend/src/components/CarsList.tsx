import type { ICar } from "../types/car";
import { CarCard } from "./CarCard";

interface CarListProps {
  cars: ICar[];
}
export const CarsList = ({ cars }: CarListProps) => {
  console.log("cars array is ", cars);
  return (
    <>
      {cars.length > 0 ? (
        <div className="min-h-screen bg-neutral-100 px-4 rounded-xl">
          <div className="w-full grid grid-cols-3 gap-x-10 gap-y-10 items-center justify-between p-4">
            {cars.map((car: ICar) => (
              <CarCard car={car} key={car.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-8 rounded-xl text-center">
          {/* A large, expressive icon or emoji */}
          <div className="text-6xl text-blue-400 mb-4 animate-bounce-slow">
            🚗💨
          </div>
          {/* Main heading */}
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            No Cars Match Your Search!
          </h1>
          {/* Subtitle with more context */}
          <p className="text-xl text-gray-600 mb-6 max-w-lg">
            It looks like there are no vehicles available that match your
            current filter selections.
          </p>
          {/* Call to action or suggestion */}
          <p className="text-lg text-gray-500">
            Try adjusting your filters, clearing some selections, or broadening
            your search criteria.
          </p>
        </div>
      )}
    </>
  );
};

// import { useSearchParams } from "react-router-dom";
// import { CarCard } from "../../components/CarCard";
// import { CarsList } from "../../components/CarsList";
// import type { ICar } from "../../types/car";
// import { cars } from "../../utils/dummyCarDetails";
// import { Tabs, Tab } from "@heroui/tabs";
// import { useEffect } from "react";
// import { useCarStore, type FCar } from "../../stores/useCarStore";
// import { LoadingSpinner } from "../../components/LoadingSpinner";
// export const CarsPage = () => {
//   const [searchParams] = useSearchParams();
//   const { cars, loading, error, fetchCars } = useCarStore();
//   useEffect(() => {
//     fetchCars();
//   }, [fetchCars]);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <p>Error: {error}</p>;

//   const selectedMakes = searchParams.get("make")?.split(",") || [];
//   const selectedTypes = searchParams.get("type")?.split(",") || [];
//   const selectedTransmissions =
//     searchParams.get("transmission")?.split(",") || [];
//   const selectedFuelTypes = searchParams.get("fuelType")?.split(",") || [];

//   const filterCars = (carsToFilter: FCar[]) => {
//     return carsToFilter.filter((car) => {
//       // Check if the car's make is in the selected makes list, or if no makes are selected
//       const isMakeMatch =
//         selectedMakes.length === 0 || selectedMakes.includes(car.make);

//       // Check if the car's type is in the selected types list, or if no types are selected
//       const isTypeMatch =
//         selectedTypes.length === 0 || selectedTypes.includes(car.type);

//       // Check if the car's transmission is in the selected transmissions list, or if no transmissions are selected
//       const isTransmissionMatch =
//         selectedTransmissions.length === 0 ||
//         selectedTransmissions.includes(car.transmission);

//       // Check if the car's fuel type is in the selected fuel types list, or if no fuel types are selected
//       const isFuelTypeMatch =
//         selectedFuelTypes.length === 0 ||
//         (car.fuelType !== undefined &&
//           selectedFuelTypes.includes(car.fuelType));

//       // A car matches if it satisfies all active filter criteria
//       return (
//         isMakeMatch && isTypeMatch && isTransmissionMatch && isFuelTypeMatch
//       );
//     });
//   };

//   // Apply the filtering to the original car data
//   const filteredCars = filterCars(cars);
//   return <CarsList cars={filteredCars} />;
// };
import { useSearchParams } from "react-router-dom";
import { CarsList } from "../../components/CarsList";
import { useCarStore } from "../../stores/useCarStore";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useEffect } from "react";

export const CarsPage = () => {
  const [searchParams] = useSearchParams();
  const { cars, loading, error, fetchCars } = useCarStore();

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner className="text-blue-600" size="lg" />
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">Error: {error}</p>
          </div>
        </div>
      </div>
    );

  const selectedMakes = searchParams.get("make")?.split(",") || [];
  const selectedTypes = searchParams.get("type")?.split(",") || [];
  const selectedTransmissions =
    searchParams.get("transmission")?.split(",") || [];
  const selectedFuelTypes = searchParams.get("fuelType")?.split(",") || [];

  const filterCars = (carsToFilter: FCar[]) => {
    return carsToFilter.filter((car) => {
      const isMakeMatch =
        selectedMakes.length === 0 || selectedMakes.includes(car.make);
      const isTypeMatch =
        selectedTypes.length === 0 || selectedTypes.includes(car.type);
      const isTransmissionMatch =
        selectedTransmissions.length === 0 ||
        selectedTransmissions.includes(car.transmission);
      const isFuelTypeMatch =
        selectedFuelTypes.length === 0 ||
        (car.fuelType !== undefined &&
          selectedFuelTypes.includes(car.fuelType));

      return (
        isMakeMatch && isTypeMatch && isTransmissionMatch && isFuelTypeMatch
      );
    });
  };

  const filteredCars = filterCars(cars);
  return <CarsList cars={filteredCars} />;
};

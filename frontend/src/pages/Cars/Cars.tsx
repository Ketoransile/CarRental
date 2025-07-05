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
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useCarStore, type FCar } from "../../stores/useCarStore";
import { CarsList } from "../../components/CarsList";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const CarsPage = () => {
  const [searchParams] = useSearchParams();
  const { cars, loading, error, fetchCars } = useCarStore();

  useEffect(() => {
    // fetch once per mount – the store keeps data cached
    fetchCars();
  }, [fetchCars]);

  /* --------- Derive active filters from the URL --------- */
  const selectedMakes = searchParams.get("make")?.split(",") ?? [];
  const selectedTypes = searchParams.get("type")?.split(",") ?? [];
  const selectedTransmissions =
    searchParams.get("transmission")?.split(",") ?? [];
  const selectedFuelTypes = searchParams.get("fuelType")?.split(",") ?? [];

  /* --------- Memoised filtering --------- */
  const filteredCars = useMemo(() => {
    const match = (arr: string[], value?: string) =>
      arr.length === 0 || (value && arr.includes(value));

    return cars.filter(
      (c: FCar) =>
        match(selectedMakes, c.make) &&
        match(selectedTypes, c.type) &&
        match(selectedTransmissions, c.transmission) &&
        match(selectedFuelTypes, c.fuelType)
    );
  }, [
    cars,
    selectedMakes,
    selectedTypes,
    selectedTransmissions,
    selectedFuelTypes,
  ]);

  /* --------- UI states --------- */
  if (loading) return <LoadingSpinner />;
  if (error)
    return <p className="p-8 text-center text-red-600">Error: {error}</p>;

  return <CarsList cars={filteredCars} />;
};

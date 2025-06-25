import { useSearchParams } from "react-router-dom";
import { CarCard } from "../../components/CarCard";
import { CarsList } from "../../components/CarsList";
import type { ICar } from "../../types/car";
import { cars } from "../../utils/dummyCarDetails";
import { Tabs, Tab } from "@heroui/tabs";
export const CarsPage = () => {
  const [searchParams] = useSearchParams();

  const selectedMakes = searchParams.get("make")?.split(",") || [];
  const selectedTypes = searchParams.get("type")?.split(",") || [];
  const selectedTransmissions =
    searchParams.get("transmission")?.split(",") || [];
  const selectedFuelTypes = searchParams.get("fuelType")?.split(",") || [];

  const filterCars = (carsToFilter: ICar[]) => {
    return carsToFilter.filter((car) => {
      // Check if the car's make is in the selected makes list, or if no makes are selected
      const isMakeMatch =
        selectedMakes.length === 0 || selectedMakes.includes(car.make);

      // Check if the car's type is in the selected types list, or if no types are selected
      const isTypeMatch =
        selectedTypes.length === 0 || selectedTypes.includes(car.type);

      // Check if the car's transmission is in the selected transmissions list, or if no transmissions are selected
      const isTransmissionMatch =
        selectedTransmissions.length === 0 ||
        selectedTransmissions.includes(car.transmission);

      // Check if the car's fuel type is in the selected fuel types list, or if no fuel types are selected
      const isFuelTypeMatch =
        selectedFuelTypes.length === 0 ||
        selectedFuelTypes.includes(car.fuelType);

      // A car matches if it satisfies all active filter criteria
      return (
        isMakeMatch && isTypeMatch && isTransmissionMatch && isFuelTypeMatch
      );
    });
  };

  // Apply the filtering to the original car data
  const filteredCars = filterCars(cars);
  return <CarsList cars={filteredCars} />;
};

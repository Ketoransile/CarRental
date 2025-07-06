import { CheckboxGroup, Checkbox } from "@heroui/react";
// import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useCallback, useEffect, useState } from "react";

const MAKES = [
  "BMW",
  "Chevrolet",
  "Ford",
  "Honda",
  "Hyundai",
  "Jeep",
  "Kia",
  "Mazda",
  "Mercedes-Benz",
  "Nissan",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
];

const TYPES = [
  "Crossover",
  "Electric Sedan",
  "Luxury Sedan",
  "Pickup Truck",
  "SUV",
  "Sedan",
  "Wagon",
];

const TRANSMISSIONS = ["Automatic"];
const FUEL_TYPES = ["Electric", "Gasoline"];

interface FilterPanelProps {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}

export const FilterPanel = ({
  searchParams,
  setSearchParams,
}: FilterPanelProps) => {
  // const [searchParams, setSearchParams] = useSearchParams();

  const [selectedMakes, setSelectedMakes] = useState<string[]>(
    searchParams.get("make")?.split(",") || []
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    searchParams.get("type")?.split(",") || []
  );
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>(
    searchParams.get("transmission")?.split(",") || []
  );
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>(
    searchParams.get("fuelType")?.split(",") || []
  );

  useEffect(() => {
    setSelectedMakes(searchParams.get("make")?.split(",") || []);
    setSelectedTypes(searchParams.get("type")?.split(",") || []);
    setSelectedTransmissions(
      searchParams.get("transmission")?.split(",") || []
    );
    setSelectedFuelTypes(searchParams.get("fuelType")?.split(",") || []);
  }, [searchParams]);

  const [debouncedMakes] = useDebounce(selectedMakes, 400);
  const [debouncedTypes] = useDebounce(selectedTypes, 400);
  const [debouncedTransmissions] = useDebounce(selectedTransmissions, 400);
  const [debouncedFuelTypes] = useDebounce(selectedFuelTypes, 400);

  useEffect(() => {
    const p = new URLSearchParams(searchParams);

    if (debouncedMakes.length) {
      p.set("make", debouncedMakes.join(","));
    } else {
      p.delete("make");
    }
    if (debouncedTypes.length) {
      p.set("type", debouncedTypes.join(","));
    } else {
      p.delete("type");
    }
    if (debouncedTransmissions.length > 0) {
      p.set("transmission", debouncedTransmissions.join(","));
    } else {
      p.delete("transmission");
    }
    if (debouncedFuelTypes.length > 0) {
      p.set("fuelType", debouncedFuelTypes.join(","));
    } else {
      p.delete("fuelType");
    }

    setSearchParams(p);
  }, [
    debouncedMakes,
    debouncedTypes,
    debouncedTransmissions,
    debouncedFuelTypes,
    searchParams,
    setSearchParams,
  ]);

  const makeChange = useCallback((v: string[]) => setSelectedMakes(v), []);
  const typeChange = useCallback((v: string[]) => setSelectedTypes(v), []);
  const transChange = useCallback(
    (v: string[]) => setSelectedTransmissions(v),
    []
  );
  const fuelChange = useCallback((v: string[]) => setSelectedFuelTypes(v), []);

  return (
    <div className="space-y-6">
      {/* Make */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Make
        </h3>
        <CheckboxGroup
          value={selectedMakes}
          onValueChange={makeChange}
          className="gap-3"
        >
          <div className="grid grid-cols-2 gap-3">
            {MAKES.map((m) => (
              <Checkbox
                key={m}
                value={m}
                className="[&>div]:border-gray-300 [&>div[data-state=checked]]:border-blue-600 [&>div[data-state=checked]]:bg-blue-600"
              >
                <span className="text-sm font-medium text-gray-700">{m}</span>
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>
      </div>

      {/* Type */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Vehicle Type
        </h3>
        <CheckboxGroup
          value={selectedTypes}
          onValueChange={typeChange}
          className="gap-3"
        >
          <div className="grid grid-cols-2 gap-3">
            {TYPES.map((t) => (
              <Checkbox
                key={t}
                value={t}
                className="[&>div]:border-gray-300 [&>div[data-state=checked]]:border-blue-600 [&>div[data-state=checked]]:bg-blue-600"
              >
                <span className="text-sm font-medium text-gray-700">{t}</span>
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>
      </div>

      {/* Transmission & Fuel */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Transmission
          </h3>
          <CheckboxGroup
            value={selectedTransmissions}
            onValueChange={transChange}
            className="space-y-2"
          >
            {TRANSMISSIONS.map((tr) => (
              <Checkbox
                key={tr}
                value={tr}
                className="[&>div]:border-gray-300 [&>div[data-state=checked]]:border-blue-600 [&>div[data-state=checked]]:bg-blue-600"
              >
                <span className="text-sm font-medium text-gray-700">{tr}</span>
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Fuel Type
          </h3>
          <CheckboxGroup
            value={selectedFuelTypes}
            onValueChange={fuelChange}
            className="space-y-2"
          >
            {FUEL_TYPES.map((f) => (
              <Checkbox
                key={f}
                value={f}
                className="[&>div]:border-gray-300 [&>div[data-state=checked]]:border-blue-600 [&>div[data-state=checked]]:bg-blue-600"
              >
                <span className="text-sm font-medium text-gray-700">{f}</span>
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      </div>
    </div>
  );
};

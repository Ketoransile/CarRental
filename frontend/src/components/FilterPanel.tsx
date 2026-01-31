import { CheckboxGroup, Checkbox, Button } from "@heroui/react";
import { useDebounce } from "use-debounce";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaCar, FaGasPump, FaCogs, FaPlus, FaMinus } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

const MAKES = [
  "BMW", "Chevrolet", "Ford", "Honda", "Hyundai", "Jeep", "Kia",
  "Mazda", "Mercedes-Benz", "Nissan", "Subaru", "Tesla", "Toyota", "Volkswagen"
];

const TYPES = [
  "Crossover", "Electric Sedan", "Luxury Sedan", "Pickup Truck", "SUV", "Sedan", "Wagon"
];

const TRANSMISSIONS = ["Automatic", "Manual"];
const FUEL_TYPES = ["Electric", "Gasoline", "Hybrid", "Diesel"];

interface FilterPanelProps {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}

const FilterSection = ({
  title,
  icon,
  children,
  isOpenDefault = true
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpenDefault?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="border-b border-gray-100 last:border-0 pb-4 mb-4 last:mb-0 last:pb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 group hover:text-blue-600 transition-colors"
      >
        <div className="flex items-center gap-2 font-semibold text-gray-700 group-hover:text-blue-600">
          <span className="text-gray-400 group-hover:text-blue-500">{icon}</span>
          <span>{title}</span>
        </div>
        {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper component for limited lists
const LimitedCheckboxGroup = ({
  items,
  selected,
  onChange,
  initialLimit = 4
}: {
  items: string[];
  selected: string[];
  onChange: (val: string[]) => void;
  initialLimit?: number
}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, initialLimit);

  // If we have selected items that are hidden, show them anyway
  const visibleWithSelected = [
    ...new Set([
      ...visibleItems,
      ...items.filter(item => selected.includes(item))
    ])
  ].sort((a, b) => items.indexOf(a) - items.indexOf(b));

  return (
    <div className="flex flex-col gap-2">
      <CheckboxGroup
        value={selected}
        onValueChange={onChange}
        classNames={{
          wrapper: "grid grid-cols-1 gap-2"
        }}
      >
        {visibleWithSelected.map((item) => (
          <Checkbox
            key={item}
            value={item}
            size="sm"
            classNames={{
              label: "text-sm text-gray-600",
            }}
          >
            {item}
          </Checkbox>
        ))}
      </CheckboxGroup>

      {items.length > initialLimit && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 mt-1 w-fit"
        >
          {showAll ? (
            <><FaMinus size={8} /> Show Less</>
          ) : (
            <><FaPlus size={8} /> Show More ({items.length - initialLimit})</>
          )}
        </button>
      )}
    </div>
  );
};

export const FilterPanel = ({
  searchParams,
  setSearchParams,
}: FilterPanelProps) => {
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
    setSelectedTransmissions(searchParams.get("transmission")?.split(",") || []);
    setSelectedFuelTypes(searchParams.get("fuelType")?.split(",") || []);
  }, [searchParams]);

  const [debouncedMakes] = useDebounce(selectedMakes, 400);
  const [debouncedTypes] = useDebounce(selectedTypes, 400);
  const [debouncedTransmissions] = useDebounce(selectedTransmissions, 400);
  const [debouncedFuelTypes] = useDebounce(selectedFuelTypes, 400);

  useEffect(() => {
    const p = new URLSearchParams(searchParams);

    if (debouncedMakes.length) p.set("make", debouncedMakes.join(","));
    else p.delete("make");

    if (debouncedTypes.length) p.set("type", debouncedTypes.join(","));
    else p.delete("type");

    if (debouncedTransmissions.length) p.set("transmission", debouncedTransmissions.join(","));
    else p.delete("transmission");

    if (debouncedFuelTypes.length) p.set("fuelType", debouncedFuelTypes.join(","));
    else p.delete("fuelType");

    setSearchParams(p);
  }, [
    debouncedMakes, debouncedTypes, debouncedTransmissions, debouncedFuelTypes,
    searchParams, setSearchParams
  ]);

  const resetFilters = () => {
    setSelectedMakes([]);
    setSelectedTypes([]);
    setSelectedTransmissions([]);
    setSelectedFuelTypes([]);
    setSearchParams(new URLSearchParams());
  };

  const hasFilters = selectedMakes.length > 0 || selectedTypes.length > 0 || selectedTransmissions.length > 0 || selectedFuelTypes.length > 0;

  return (
    <div className="flex flex-col h-full">
      {hasFilters && (
        <div className="mb-4 flex justify-between items-center bg-blue-50 p-3 rounded-lg">
          <span className="text-xs font-semibold text-blue-700">Active Filters</span>
          <button
            onClick={resetFilters}
            className="text-xs text-blue-600 hover:text-blue-800 underline font-medium"
          >
            Clear All
          </button>
        </div>
      )}

      <div className="space-y-1">
        {/* Reordered: Transmission & Fuel first as requested */}
        <FilterSection title="Transmission" icon={<FaCogs />}>
          <CheckboxGroup
            value={selectedTransmissions}
            onValueChange={setSelectedTransmissions}
            className="gap-2"
          >
            {TRANSMISSIONS.map((tr) => (
              <Checkbox key={tr} value={tr} size="sm" classNames={{ label: "text-sm text-gray-600" }}>
                {tr}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </FilterSection>

        <FilterSection title="Fuel Type" icon={<FaGasPump />}>
          <CheckboxGroup
            value={selectedFuelTypes}
            onValueChange={setSelectedFuelTypes}
            className="gap-2"
          >
            {FUEL_TYPES.map((f) => (
              <Checkbox key={f} value={f} size="sm" classNames={{ label: "text-sm text-gray-600" }}>
                {f}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </FilterSection>

        <FilterSection title="Vehicle Type" icon={<BiCategory />}>
          <LimitedCheckboxGroup
            items={TYPES}
            selected={selectedTypes}
            onChange={setSelectedTypes}
            initialLimit={5}
          />
        </FilterSection>

        <FilterSection title="Make" icon={<FaCar />}>
          <LimitedCheckboxGroup
            items={MAKES}
            selected={selectedMakes}
            onChange={setSelectedMakes}
            initialLimit={5}
          />
        </FilterSection>
      </div>
    </div>
  );
};

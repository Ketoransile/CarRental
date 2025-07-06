// import { CheckboxGroup, Checkbox } from "@heroui/react";
// // import { cars } from "../utils/dummyCarDetails";
// import { useSearchParams } from "react-router-dom";
// import { useDebounce } from "use-debounce";
// import { useCallback, useEffect, useState } from "react";
// import type { ICar } from "../types/car";

// // Utility to get unique values
// const unique = (arr: string[]) => [...new Set(arr)];

// // const makes = unique(cars.map((car) => car.make));
// // const types = unique(cars.map((car) => car.type));
// // const transmissions = unique(cars.map((car) => car.transmission));
// // const fuelTypes = unique(cars.map((car) => car.fuelType));
// declare const cars: ICar[];

// // Typed values using ICar properties
// const makes: string[] = unique(cars.map((car: ICar) => car.make));
// const types: string[] = unique(cars.map((car: ICar) => car.type));
// const transmissions = unique(cars.map((car: ICar) => car.transmission));
// const fuelTypes = unique(cars.map((car: ICar) => car.fuelType));
// export const FilterPanel = ({ car }: { car: ICar }) => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const [selectedMakes, setSelectedMakes] = useState<string[]>(
//     searchParams.get("make")?.split(",") || []
//   );
//   const [selectedTypes, setSelectedTypes] = useState<string[]>(
//     searchParams.get("type")?.split(",") || []
//   );
//   const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>(
//     searchParams.get("transmission")?.split(",") || []
//   );
//   const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>(
//     searchParams.get("fuelType")?.split(",") || []
//   );

//   const [debouncedMakes] = useDebounce(selectedMakes, 500);
//   const [debouncedTypes] = useDebounce(selectedTypes, 500);
//   const [debouncedTransmissions] = useDebounce(selectedTransmissions, 500);
//   const [debouncedFuelTypes] = useDebounce(selectedFuelTypes, 500);

//   useEffect(() => {
//     const newSearchParams = new URLSearchParams(searchParams);
//     if (debouncedMakes.length > 0) {
//       newSearchParams.set("make", debouncedMakes.join(","));
//     } else {
//       newSearchParams.delete("make");
//     }

//     if (debouncedTypes.length > 0) {
//       newSearchParams.set("type", debouncedTypes.join(","));
//     } else {
//       newSearchParams.delete("type");
//     }
//     if (debouncedTransmissions.length > 0) {
//       newSearchParams.set("transmission", debouncedTransmissions.join(","));
//     } else {
//       newSearchParams.delete("transmission");
//     }
//     if (debouncedFuelTypes.length > 0) {
//       newSearchParams.set("fuelType", debouncedFuelTypes.join(","));
//     } else {
//       newSearchParams.delete("fuelType");
//     }
//     // Set the search params
//     setSearchParams(newSearchParams);
//   }, [
//     debouncedMakes,
//     debouncedFuelTypes,
//     debouncedTransmissions,
//     debouncedTypes,
//     searchParams,
//     setSearchParams,
//   ]);

//   const handleMakeChange = useCallback((values: string[]) => {
//     setSelectedMakes(values);
//   }, []);
//   const handleTypeChange = useCallback((values: string[]) => {
//     setSelectedTypes(values);
//   }, []);
//   const handleTransmissionChange = useCallback((values: string[]) => {
//     setSelectedTransmissions(values);
//   }, []);
//   const handleFuelTypeChange = useCallback((values: string[]) => {
//     setSelectedFuelTypes(values);
//   }, []);

//   return (
//     <div className="w-full p-4 bg-white rounded-lg shadow-sm border border-gray-100">
//       <h1 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
//         Filter By
//       </h1>

//       <div className="space-y-6">
//         {/* ✅ Make Filter */}
//         <CheckboxGroup
//           label="Make"
//           defaultValue={selectedMakes}
//           onValueChange={handleMakeChange}
//           className="space-y-2"
//         >
//           <div className="grid grid-cols-2 gap-3">
//             {makes.map((make) => (
//               <Checkbox
//                 key={make}
//                 value={make}
//                 className="[&>div]:border-gray-300 [&>div[data-state=checked]]:border-blue-600 [&>div[data-state=checked]]:bg-blue-600"
//               >
//                 <span className="text-gray-700 group-hover:text-gray-900">
//                   {make}
//                 </span>
//               </Checkbox>
//             ))}
//           </div>
//         </CheckboxGroup>

//         {/* ✅ Type Filter */}
//         <CheckboxGroup
//           label="Type"
//           defaultValue={selectedTypes}
//           onValueChange={handleTypeChange}
//           className="space-y-2"
//         >
//           <div className="grid grid-cols-2 gap-3">
//             {types.map((type) => (
//               <Checkbox
//                 key={type}
//                 value={type}
//                 className="[&>div]:border-gray-300 [&>div[data-state=checked]]:border-blue-600 [&>div[data-state=checked]]:bg-blue-600"
//               >
//                 <span className="text-gray-700 group-hover:text-gray-900">
//                   {type}
//                 </span>
//               </Checkbox>
//             ))}
//           </div>
//         </CheckboxGroup>

//         <div className="grid grid-cols-2 gap-6">
//           {/* ✅ Transmission Filter */}
//           <CheckboxGroup
//             label="Transmission"
//             defaultValue={selectedTransmissions}
//             onValueChange={handleTransmissionChange}
//             className="space-y-2"
//           >
//             <div className="space-y-2">
//               {transmissions.map((trans) => (
//                 <Checkbox
//                   key={trans}
//                   value={trans}
//                   className="[&>div]:border-gray-300 [&>div[data-state=checked]]:border-blue-600 [&>div[data-state=checked]]:bg-blue-600"
//                 >
//                   <span className="text-gray-700 group-hover:text-gray-900">
//                     {trans}
//                   </span>
//                 </Checkbox>
//               ))}
//             </div>
//           </CheckboxGroup>

//           {/* ✅ Fuel Type Filter */}
//           <CheckboxGroup
//             label="Fuel Type"
//             defaultValue={selectedFuelTypes}
//             onValueChange={handleFuelTypeChange}
//             className="space-y-2"
//           >
//             <div className="space-y-2">
//               {fuelTypes.map((fuel) => (
//                 <Checkbox
//                   key={fuel}
//                   value={fuel}
//                   className="[&>div]:border-gray-300 [&>div[data-state=checked]]:border-blue-600 [&>div[data-state=checked]]:bg-blue-600"
//                 >
//                   <span className="text-gray-700 group-hover:text-gray-900">
//                     {fuel}
//                   </span>
//                 </Checkbox>
//               ))}
//             </div>
//           </CheckboxGroup>
//         </div>
//       </div>
//     </div>
//   );
// };
import { CheckboxGroup, Checkbox } from "@heroui/react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCarStore } from "../stores/useCarStore";
import type { FCar } from "../stores/useCarStore";

const unique = (arr: string[]) => [...new Set(arr)];

export const FilterPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cars } = useCarStore(); // use fetched data instead of a dummy array

  // 🧠 Build options from actual fetched cars
  const makes = useMemo(() => unique(cars.map((car) => car.make)), [cars]);
  const types = useMemo(() => unique(cars.map((car) => car.type)), [cars]);
  const transmissions = useMemo(
    () => unique(cars.map((car) => car.transmission)),
    [cars]
  );
  const fuelTypes = useMemo(
    () => unique(cars.map((car) => car.fuelType)),
    [cars]
  );

  // 🌱 Load from URL
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

  const [debouncedMakes] = useDebounce(selectedMakes, 500);
  const [debouncedTypes] = useDebounce(selectedTypes, 500);
  const [debouncedTransmissions] = useDebounce(selectedTransmissions, 500);
  const [debouncedFuelTypes] = useDebounce(selectedFuelTypes, 500);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    debouncedMakes.length > 0
      ? newParams.set("make", debouncedMakes.join(","))
      : newParams.delete("make");

    debouncedTypes.length > 0
      ? newParams.set("type", debouncedTypes.join(","))
      : newParams.delete("type");

    debouncedTransmissions.length > 0
      ? newParams.set("transmission", debouncedTransmissions.join(","))
      : newParams.delete("transmission");

    debouncedFuelTypes.length > 0
      ? newParams.set("fuelType", debouncedFuelTypes.join(","))
      : newParams.delete("fuelType");

    setSearchParams(newParams);
  }, [
    debouncedMakes,
    debouncedTypes,
    debouncedTransmissions,
    debouncedFuelTypes,
    searchParams,
    setSearchParams,
  ]);

  const handleMakeChange = useCallback((values: string[]) => {
    setSelectedMakes(values);
  }, []);
  const handleTypeChange = useCallback((values: string[]) => {
    setSelectedTypes(values);
  }, []);
  const handleTransmissionChange = useCallback((values: string[]) => {
    setSelectedTransmissions(values);
  }, []);
  const handleFuelTypeChange = useCallback((values: string[]) => {
    setSelectedFuelTypes(values);
  }, []);

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Filter By
      </h1>

      <div className="space-y-6">
        {/* ✅ Make */}
        <CheckboxGroup
          label="Make"
          defaultValue={selectedMakes}
          onValueChange={handleMakeChange}
        >
          <div className="grid grid-cols-2 gap-3">
            {makes.map((make) => (
              <Checkbox
                key={make}
                value={make}
                className="[&>div]:border-gray-300 [&>div[data-state=checked]]:border-blue-600 [&>div[data-state=checked]]:bg-blue-600"
              >
                {make}
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>

        {/* ✅ Type */}
        <CheckboxGroup
          label="Type"
          defaultValue={selectedTypes}
          onValueChange={handleTypeChange}
        >
          <div className="grid grid-cols-2 gap-3">
            {types.map((type) => (
              <Checkbox
                key={type}
                value={type}
                className="[&>div]:border-gray-300 [&>div[data-state=checked]]:border-blue-600 [&>div[data-state=checked]]:bg-blue-600"
              >
                {type}
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>

        <div className="grid grid-cols-2 gap-6">
          {/* ✅ Transmission */}
          <CheckboxGroup
            label="Transmission"
            defaultValue={selectedTransmissions}
            onValueChange={handleTransmissionChange}
          >
            <div className="space-y-2">
              {transmissions.map((trans) => (
                <Checkbox
                  key={trans}
                  value={trans}
                  className="[&>div]:border-gray-300 [&>div[data-state=checked]]:border-blue-600 [&>div[data-state=checked]]:bg-blue-600"
                >
                  {trans}
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>

          {/* ✅ Fuel Type */}
          <CheckboxGroup
            label="Fuel Type"
            defaultValue={selectedFuelTypes}
            onValueChange={handleFuelTypeChange}
          >
            <div className="space-y-2">
              {fuelTypes.map((fuel) => (
                <Checkbox
                  key={fuel}
                  value={fuel}
                  className="[&>div]:border-gray-300 [&>div[data-state=checked]]:border-blue-600 [&>div[data-state=checked]]:bg-blue-600"
                >
                  {fuel}
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>
        </div>
      </div>
    </div>
  );
};

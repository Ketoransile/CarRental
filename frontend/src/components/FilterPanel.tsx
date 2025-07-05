// import { CheckboxGroup, Checkbox } from "@heroui/react";
// import { cars } from "../utils/dummyCarDetails";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useDebounce } from "use-debounce";
// import { useCallback, useEffect, useState } from "react";

// // Utility to get unique values
// const unique = (arr: string[]) => [...new Set(arr)];

// const makes = unique(cars.map((car) => car.make));
// const types = unique(cars.map((car) => car.type));
// const transmissions = unique(cars.map((car) => car.transmission));
// const fuelTypes = unique(cars.map((car) => car.fuelType));

// export const FilterPanel = () => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const [selectedMakes, setSelectedMakes] = useState<string[]>(
//     searchParams.get("make")?.split(",") || []
//   );
//   const [selectedTypes, setSelectedTypes] = useState<string[]>(
//     searchParams.get("type")?.split(",") || []
//   );
//   const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>(
//     searchParams.get("tranmission")?.split(",") || []
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
//     <div className="w-full flex flex-col gap-4 text-sm">
//       {/* ✅ Make Filter */}
//       <h1 className="text-black font-bold text-center -py-2">Filter By</h1>
//       <CheckboxGroup
//         label="Make"
//         defaultValue={selectedMakes}
//         onValueChange={handleMakeChange}
//       >
//         <div className="grid grid-cols-2 gap-2">
//           {makes.map((make) => (
//             <Checkbox key={make} value={make}>
//               {make}
//             </Checkbox>
//           ))}
//         </div>
//       </CheckboxGroup>

//       {/* ✅ Type Filter */}
//       <CheckboxGroup
//         label="Type"
//         defaultValue={selectedTypes}
//         onValueChange={handleTypeChange}
//       >
//         <div className="grid grid-cols-2 gap-2">
//           {types.map((type) => (
//             <Checkbox key={type} value={type}>
//               {type}
//             </Checkbox>
//           ))}
//         </div>
//       </CheckboxGroup>

//       {/* ✅ Transmission Filter */}
//       <div className="grid grid-cols-2">
//         <CheckboxGroup
//           label="Transmission"
//           defaultValue={selectedTransmissions}
//           onValueChange={handleTransmissionChange}
//         >
//           {transmissions.map((trans) => (
//             <Checkbox key={trans} value={trans}>
//               {trans}
//             </Checkbox>
//           ))}
//         </CheckboxGroup>

//         {/* ✅ Fuel Type Filter */}
//         <CheckboxGroup
//           label="Fuel Type"
//           defaultValue={selectedFuelTypes}
//           onValueChange={handleFuelTypeChange}
//         >
//           {fuelTypes.map((fuel) => (
//             <Checkbox key={fuel} value={fuel}>
//               {fuel}
//             </Checkbox>
//           ))}
//         </CheckboxGroup>
//       </div>
//     </div>
//   );
// };
import { CheckboxGroup, Checkbox } from "@heroui/react";
import { cars } from "../utils/dummyCarDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useCallback, useEffect, useState } from "react";

// Utility to get unique values
const unique = (arr: string[]) => [...new Set(arr)];

const makes = unique(cars.map((car) => car.make));
const types = unique(cars.map((car) => car.type));
const transmissions = unique(cars.map((car) => car.transmission));
const fuelTypes = unique(cars.map((car) => car.fuelType));

export const FilterPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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
    const newSearchParams = new URLSearchParams(searchParams);
    if (debouncedMakes.length > 0) {
      newSearchParams.set("make", debouncedMakes.join(","));
    } else {
      newSearchParams.delete("make");
    }

    if (debouncedTypes.length > 0) {
      newSearchParams.set("type", debouncedTypes.join(","));
    } else {
      newSearchParams.delete("type");
    }
    if (debouncedTransmissions.length > 0) {
      newSearchParams.set("transmission", debouncedTransmissions.join(","));
    } else {
      newSearchParams.delete("transmission");
    }
    if (debouncedFuelTypes.length > 0) {
      newSearchParams.set("fuelType", debouncedFuelTypes.join(","));
    } else {
      newSearchParams.delete("fuelType");
    }
    // Set the search params
    setSearchParams(newSearchParams);
  }, [
    debouncedMakes,
    debouncedFuelTypes,
    debouncedTransmissions,
    debouncedTypes,
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
        {/* ✅ Make Filter */}
        <CheckboxGroup
          label="Make"
          defaultValue={selectedMakes}
          onValueChange={handleMakeChange}
          className="space-y-2"
        >
          <div className="grid grid-cols-2 gap-3">
            {makes.map((make) => (
              <Checkbox
                key={make}
                value={make}
                className="[&>div]:border-gray-300 [&>div[data-state=checked]]:border-blue-600 [&>div[data-state=checked]]:bg-blue-600"
              >
                <span className="text-gray-700 group-hover:text-gray-900">
                  {make}
                </span>
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>

        {/* ✅ Type Filter */}
        <CheckboxGroup
          label="Type"
          defaultValue={selectedTypes}
          onValueChange={handleTypeChange}
          className="space-y-2"
        >
          <div className="grid grid-cols-2 gap-3">
            {types.map((type) => (
              <Checkbox
                key={type}
                value={type}
                className="[&>div]:border-gray-300 [&>div[data-state=checked]]:border-blue-600 [&>div[data-state=checked]]:bg-blue-600"
              >
                <span className="text-gray-700 group-hover:text-gray-900">
                  {type}
                </span>
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>

        <div className="grid grid-cols-2 gap-6">
          {/* ✅ Transmission Filter */}
          <CheckboxGroup
            label="Transmission"
            defaultValue={selectedTransmissions}
            onValueChange={handleTransmissionChange}
            className="space-y-2"
          >
            <div className="space-y-2">
              {transmissions.map((trans) => (
                <Checkbox
                  key={trans}
                  value={trans}
                  className="[&>div]:border-gray-300 [&>div[data-state=checked]]:border-blue-600 [&>div[data-state=checked]]:bg-blue-600"
                >
                  <span className="text-gray-700 group-hover:text-gray-900">
                    {trans}
                  </span>
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>

          {/* ✅ Fuel Type Filter */}
          <CheckboxGroup
            label="Fuel Type"
            defaultValue={selectedFuelTypes}
            onValueChange={handleFuelTypeChange}
            className="space-y-2"
          >
            <div className="space-y-2">
              {fuelTypes.map((fuel) => (
                <Checkbox
                  key={fuel}
                  value={fuel}
                  className="[&>div]:border-gray-300 [&>div[data-state=checked]]:border-blue-600 [&>div[data-state=checked]]:bg-blue-600"
                >
                  <span className="text-gray-700 group-hover:text-gray-900">
                    {fuel}
                  </span>
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>
        </div>
      </div>
    </div>
  );
};

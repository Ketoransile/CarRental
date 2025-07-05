// import type { FCar } from "../stores/useCarStore";
// import { CarCard } from "./CarCard";

// interface CarListProps {
//   cars: FCar[];
// }

// export const CarsList = ({ cars }: CarListProps) => {
//   return (
//     <>
//       {cars.length > 0 ? (
//         <div className="min-h-[60vh]">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {cars.map((car: FCar) => (
//               <CarCard car={car} key={car._id} />
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 sm:p-8 text-center">
//           <div className="text-6xl text-blue-400 mb-4 animate-bounce-slow">
//             🚗💨
//           </div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
//             No Cars Match Your Search!
//           </h1>
//           <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-lg">
//             Try adjusting your filters or broadening your search criteria.
//           </p>
//           <div className="flex gap-3">
//             <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
//               Clear Filters
//             </button>
//             <button className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
//               Browse All
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
import type { FCar } from "../stores/useCarStore";
import { CarCard } from "./CarCard";
import { useSearchParams } from "react-router-dom";

interface CarListProps {
  cars: FCar[];
}

export const CarsList = ({ cars }: CarListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClearFilters = () => {
    setSearchParams({});
  };

  const handleBrowseAll = () => {
    // Implement browse all functionality if needed
  };

  return (
    <>
      {cars.length > 0 ? (
        <div className="min-h-[60vh] px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
            {cars.map((car: FCar) => (
              <div key={car._id} className="w-full">
                <CarCard car={car} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-8 sm:px-6 sm:py-12 text-center">
          <div className="text-5xl xs:text-6xl sm:text-7xl text-blue-400 mb-3 sm:mb-4 animate-bounce-slow">
            🚗💨
          </div>
          <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
            No Cars Match Your Search!
          </h1>
          <p className="text-sm xs:text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 max-w-xs sm:max-w-lg">
            Try adjusting your filters or broadening your search criteria.
          </p>
          <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 w-full xs:w-auto justify-center">
            <button
              onClick={handleClearFilters}
              className="px-3 py-1.5 xs:px-4 xs:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              Clear Filters
            </button>
            <button
              onClick={handleBrowseAll}
              className="px-3 py-1.5 xs:px-4 xs:py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              Browse All
            </button>
          </div>
        </div>
      )}
    </>
  );
};

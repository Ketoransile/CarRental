import type { FCar } from "../stores/useCarStore";
import { CarCard } from "./CarCard";
// import { useSearchParams } from "react-router-dom";

import type { SetURLSearchParams } from "react-router-dom"; // Import necessary types

interface Props {
  cars: FCar[];
  setSearchParams: SetURLSearchParams;
  searchParams: URLSearchParams;
}

export const CarsList = ({ cars, searchParams, setSearchParams }: Props) => {
  // const [searchParams, setSearchParams] = useSearchParams();

  /* ---------- Helpers ---------- */
  const clearFilters = () => {
    // Create a new URLSearchParams object with no parameters
    const newSearchParams = new URLSearchParams();
    setSearchParams(newSearchParams);
  };

  const activeFilters: [string, string][] = Array.from(searchParams.entries());

  return (
    <>
      {/* ------- active filter pills (if any) ------- */}
      {activeFilters.length > 0 && (
        <div className="mx-4 mb-2 flex flex-wrap gap-2 sm:mx-6">
          {activeFilters.map(([k, v]) => (
            <span
              key={k}
              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
            >
              {k}: {v}
            </span>
          ))}
          <button
            onClick={clearFilters}
            className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-200"
          >
            Clear all
          </button>
        </div>
      )}

      {/* ------- cars / empty state ------- */}
      {cars.length > 0 ? (
        <section className="min-h-[60vh] px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        </section>
      ) : (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 py-8 text-center sm:px-6">
          <div className="text-6xl animate-bounce-slow">🚗💨</div>
          <h1 className="text-2xl font-bold text-gray-800">
            No Cars Match Your Search
          </h1>
          <p className="max-w-md text-gray-600">
            Try adjusting your filters or broadening your search criteria.
          </p>
          <button
            onClick={clearFilters}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
};

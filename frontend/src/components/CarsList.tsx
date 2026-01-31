import type { FCar } from "../stores/useCarStore";
import { CarCard } from "./CarCard";
import type { SetURLSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaInbox } from "react-icons/fa";

interface Props {
  cars: FCar[];
  setSearchParams: SetURLSearchParams;
  searchParams: URLSearchParams;
}

export const CarsList = ({ cars, searchParams, setSearchParams }: Props) => {
  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const activeFilters: [string, string][] = Array.from(searchParams.entries());

  return (
    <>
      <AnimatePresence mode="wait">
        {/* ------- active filter pills ------- */}
        {activeFilters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 flex flex-wrap gap-2"
          >
            {activeFilters.map(([k, v]) => (
              <span
                key={k}
                className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 border border-blue-100"
              >
                <span className="opacity-60 capitalize">{k}:</span> {v}
              </span>
            ))}
            <button
              onClick={clearFilters}
              className="text-xs font-medium text-gray-500 hover:text-red-500 transition-colors underline"
            >
              Clear all
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------- cars / empty state ------- */}
      {cars.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
        >
          {cars.map((car) => (
            <motion.div
              key={car._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex min-h-[400px] flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 text-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
            <FaInbox size={32} className="text-gray-300" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">No vehicles found</h3>
            <p className="max-w-xs text-sm text-gray-500 mx-auto">
              We couldn't find any cars matching your current filters. Try adjusting your search criteria.
            </p>
          </div>
          <button
            onClick={clearFilters}
            className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </>
  );
};

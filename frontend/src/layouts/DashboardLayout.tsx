import { Outlet, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { LuX } from "react-icons/lu";
import { FilterPanel } from "../components/FilterPanel";
import { motion, AnimatePresence } from "framer-motion";

export const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* ------------ DESKTOP GRID ------------ */}
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        {/* --- Static sidebar on ≥lg --- */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h1 className="mb-6 text-xl font-bold text-gray-900 flex items-center gap-2">
              <FiFilter className="text-blue-600" />
              Filters
            </h1>
            <FilterPanel
              key={searchParams.toString()}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
        </aside>

        {/* --- Main content --- */}
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>

      {/* ------------ MOBILE FLOATING BUTTON ------------ */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-700 lg:hidden"
        aria-label="Open Filters"
      >
        <FiFilter size={24} />
      </motion.button>

      {/* ------------ MOBILE SLIDE‑OVER ------------ */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            {/* overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            {/* panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 p-5">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FiFilter className="text-blue-600" />
                  Filter Vehicles
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  aria-label="Close Filters"
                >
                  <LuX size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <FilterPanel
                  key={searchParams.toString()}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              </div>
              <div className="border-t border-gray-100 p-5 bg-gray-50/50">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  View Results
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

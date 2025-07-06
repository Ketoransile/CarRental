import { Outlet, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { LuX } from "react-icons/lu";
import { FilterPanel } from "../components/FilterPanel";

export const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ------------ DESKTOP GRID ------------ */}
      <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[20rem_1fr] lg:gap-8 lg:px-8">
        {/* --- Static sidebar on ≥lg --- */}
        <aside className="hidden lg:block">
          <div className="sticky top-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">Filters</h1>
            <FilterPanel
              key={searchParams.toString()}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
        </aside>

        {/* --- Main content --- */}
        <main className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <Outlet
          // searchParams={searchParams}
          // setSearchParams={setSearchParams}
          />
        </main>
      </div>

      {/* ------------ MOBILE FLOATING BUTTON ------------ */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl active:scale-95 lg:hidden"
        aria-label="Open Filters"
      >
        <FiFilter size={24} />
      </button>

      {/* ------------ MOBILE SLIDE‑OVER ------------ */}
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
          />
          {/* panel */}
          <div className="relative ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close Filters"
              >
                <LuX size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <FilterPanel
                key={searchParams.toString()}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
            <div className="border-t p-4">
              <button
                onClick={() => setOpen(false)}
                className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

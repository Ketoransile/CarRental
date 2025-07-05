// import { Outlet } from "react-router-dom";
// import { FilterPanel } from "../components/FilterPanel";

// export const DashboardLayout = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Sidebar Filter Section */}
//           <div className="lg:w-72 xl:w-80 flex-shrink-0">
//             <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
//               <FilterPanel />
//             </div>
//           </div>

//           {/* Main Content Area */}
//           <div className="flex-1">
//             <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
//               <Outlet />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { LuX } from "react-icons/lu";
import { FilterPanel } from "../components/FilterPanel";

/** Wraps the Cars page with a responsive sidebar‑filter layout */
export const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 max-md:-mx-4">
      {/* ------------ DESKTOP GRID ------------ */}
      <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[18rem_1fr] lg:gap-8 lg:px-8">
        {/* --- Static sidebar on ≥lg --- */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <FilterPanel />
          </div>
        </aside>

        {/* --- Main content --- */}
        <main className="rounded-xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
          <Outlet />
        </main>
      </div>

      {/* ------------ MOBILE FLOATING BUTTON ------------ */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl ring-2 ring-white/80 lg:hidden"
        aria-label="Open Filters"
      >
        <FiFilter size={22} />
      </button>

      {/* ------------ MOBILE SLIDE‑OVER ------------ */}
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* panel */}
          <div className="relative ml-auto flex h-full w-80 flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h2 className="text-base font-semibold">Filters</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-neutral-600 hover:text-neutral-900"
                aria-label="Close Filters"
              >
                <LuX size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <FilterPanel />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

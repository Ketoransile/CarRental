// import { Outlet } from "react-router-dom";
// import { CheckboxGroup, Checkbox } from "@heroui/react";
// import { FilterPanel } from "../components/FilterPanel";
// export const DashboardLayout = () => {
//   return (
//     <div className="min-h-screen flex flex-col gap-2  ">
//       <div className="w-full sticky top-20  flex flex-col gap-4 items-start self-start shadow-md p-4 rounded-xl drop-shadow-blue-400 border border-neutral-100 ">
//         <FilterPanel />
//       </div>
//       <div className=" flex flex-col pt-6 p-4">
//         <Outlet />
//       </div>
//     </div>
//   );
// };
// import { Outlet } from "react-router-dom";
// import { FilterPanel } from "../components/FilterPanel";

// export const DashboardLayout = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
//         {/* Sidebar Filter Section */}
//         <div className="lg:w-72 xl:w-80 flex-shrink-0">
//           <div className=" bg-white p-5 rounded-xl shadow-sm border border-gray-200">
//             <FilterPanel />
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div className="flex-1">
//           <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
import { Outlet } from "react-router-dom";
import { FilterPanel } from "../components/FilterPanel";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filter Section */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <FilterPanel />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

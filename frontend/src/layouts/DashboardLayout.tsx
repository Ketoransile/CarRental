import { Outlet } from "react-router-dom";
import { CheckboxGroup, Checkbox } from "@heroui/react";
import { FilterPanel } from "../components/FilterPanel";
export const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex gap-2  ">
      <div className="w-96 sticky top-20  flex flex-col gap-4 items-start self-start shadow-md p-4 rounded-xl drop-shadow-blue-400 border border-neutral-100 ">
        <FilterPanel />
      </div>
      <div className=" flex flex-col pt-6 p-4">
        <Outlet />
      </div>
    </div>
  );
};

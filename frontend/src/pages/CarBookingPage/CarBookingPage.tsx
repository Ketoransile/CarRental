import { useLoaderData } from "react-router-dom";
import { RentalSummary } from "../../components/RentalSummary";
// import RentalProcess from "../../components/rental-form";
import { CarRentalForm } from "../../components/CarRentalForm";

export const CarBookingPage = () => {
  const data = useLoaderData();
  console.log("loader data from booking page is", data);
  return (
    <div className=" w-full grid grid-cols-5 items-start  gap-4 bg-neutral-100 px-4 py-4">
      <div className=" z-10 col-span-3">
        {/* <RentalProcess />
         */}
        <CarRentalForm />
      </div>

      <div className=" col-span-2 sticky top-20">
        <RentalSummary car={data} />
      </div>
    </div>
  );
};

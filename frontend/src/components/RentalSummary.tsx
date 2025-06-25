import { Button, Image, Input } from "@heroui/react";
import type { ICar } from "../types/car";
interface carRentalProps {
  car: ICar;
}
export const RentalSummary = ({ car }: carRentalProps) => {
  console.log("Car from rentalsummary component is ", car);
  return (
    <div className="w-full  flex flex-col gap-2 bg-white rounded-xl p-4 ">
      <h1 className="text-blue-600  font-bold text-lg">Rental Summary</h1>
      <p className="text-xs text-neutral-400 ">
        Prices may change depending on the length of the rental and the price of
        your rental car
      </p>
      <div className="grid grid-cols-2 items-center gap-2">
        <Image src={car.image} width={200} height={200} />
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">
            {car.make} {car.model}
          </h1>
          <p className="text-xs text-neutral-500">{car.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold ">Subtotal</h1>
        <h1 className="font-bold">$80.00</h1>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Tax</h1>
        <h1 className="font-bold">$0</h1>
      </div>
      <div className="px-4 py-2 rounded-md flex items-center justify-between bg-neutral-100">
        <Input
          placeholder="Apply Promo Code"
          className=" placeholder:text-neutral-400 placeholder:text-xs bg-parent shadow-none focus:border-none border-none hover:border-none"
        />
        <Button className="bg-parent font-bold">Apply Now</Button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Total Rental Price</h1>
          <p className="text-xs text-neutral-400">
            Overall price & includes rental discount{" "}
          </p>
        </div>
        <h2 className="font-bold">$80.0</h2>
      </div>
    </div>
  );
};

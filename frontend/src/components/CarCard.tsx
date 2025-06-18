import { Button, Image } from "@heroui/react";
import type { ICar } from "../types/type";
import { FaUserFriends } from "react-icons/fa"; // Seat: Group of users
import { LuGauge } from "react-icons/lu"; // Mileage: Gauge for distance or speed
import { FaGasPump } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
export const CarCard = ({ car }: { car: ICar }) => {
  return (
    <div className="group flex flex-col gap-2  rounded-xl py-4 transition-shadow ">
      <Image
        src={car.image}
        alt="car-image"
        width={400}
        height={200}
        className="transition-transform duration-300 group-hover:scale-105"
      />
      <div className="flex flex-col gap-4 px-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">
              {car.make} {car.model}
            </h1>
            <h2 className="text-md font-semibold text-neutral-500">
              {car.type}
            </h2>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-blue-600 font-bold text-xl">
              ${car.pricePerDay}{" "}
            </h1>
            <h2 className="text-neutral-500">Per Day</h2>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaUserFriends />
            {car.seats}
          </div>
          <div className="flex items-center gap-2">
            <GiGearStickPattern />
            {car.transmission}
          </div>
          <div className="flex items-center gap-2">
            <LuGauge />
            {car.mileage}
          </div>
          <div className="flex items-center gap-2">
            <FaGasPump />
            {car.fuelType}
          </div>
        </div>
        <Button className="bg-blue-600 text-white">View Details</Button>
      </div>
    </div>
  );
};

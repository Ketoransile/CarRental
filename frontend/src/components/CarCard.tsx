import { Button, Image } from "@heroui/react";
import { Link } from "react-router";
import type { ICar } from "../types/car";
import { FaUserFriends } from "react-icons/fa"; // Seat: Group of users
import { LuGauge } from "react-icons/lu"; // Mileage: Gauge for distance or speed
import { FaGasPump } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import type { FCar } from "../stores/useCarStore";
export const CarCard = ({ car }: { car: FCar }) => {
  return (
    <div className="relative group flex flex-col gap-2  rounded-xl py-4 transition-shadow ">
      {car.available && (
        <div className="absolute top-0  bg-blue-100 text-blue-600 font-bold px-4 text-xs rounded-full py-1 ml-8">
          {car.available && "Available Now"}
        </div>
      )}
      <div className="flex justify-center items-center">
        <Image
          src={car.image}
          alt="car-image"
          width={400}
          height={200}
          className="max-w-64 max-h-64 transition-transform duration-300 group-hover:scale-105 "
        />
      </div>
      <div className="flex flex-col gap-4 px-8">
        <div className="flex items-center justify-between border-b border-neutral-400 pb-4">
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
        <div className="flex gap-2 items-center justify-between flex-wrap">
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
        <Link to={`/all-cars/${car._id}`} className="w-full ">
          <Button className="w-full bg-blue-600 text-white">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

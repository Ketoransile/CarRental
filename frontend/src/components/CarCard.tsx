import { Button, Image } from "@heroui/react";
import { Link } from "react-router-dom";
import { FaUserFriends, FaGasPump } from "react-icons/fa";
import { LuGauge } from "react-icons/lu";
import { GiGearStickPattern } from "react-icons/gi";
import type { FCar } from "../stores/useCarStore";
import { motion } from "framer-motion";

export const CarCard = ({ car }: { car: FCar }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative w-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Availability Badge */}
      {car.available ? (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-green-500/10 backdrop-blur-md rounded-full border border-green-500/20">
          <span className="text-xs font-bold text-green-700">Available</span>
        </div>
      ) : (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-red-500/10 backdrop-blur-md rounded-full border border-red-500/20">
          <span className="text-xs font-bold text-red-700">Booked</span>
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-60 w-full bg-gray-50 flex items-center justify-center p-4 group-hover:bg-blue-50/30 transition-colors">
        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Image
          src={car.image}
          alt={`${car.make} ${car.carModel}`}
          className="w-full h-full object-contain mix-blend-multiply drop-shadow-md group-hover:scale-110 transition-transform duration-500 ease-out"
          removeWrapper
        />
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
              {car.make} {car.carModel}
            </h3>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {car.type}
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-600">${car.pricePerDay}</span>
            <p className="text-xs text-gray-400">/ day</p>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 py-4 border-t border-gray-100">
          <div className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 text-gray-600">
            <FaUserFriends size={16} className="text-blue-500" />
            <span className="text-xs font-medium">{car.seats} Seats</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 text-gray-600">
            <GiGearStickPattern size={16} className="text-blue-500" />
            <span className="text-xs font-medium truncate w-full text-center">{car.transmission}</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 text-gray-600">
            <LuGauge size={16} className="text-blue-500" />
            <span className="text-xs font-medium truncate w-full text-center">{car.mileage}km</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-gray-50 text-gray-600">
            <FaGasPump size={16} className="text-blue-500" />
            <span className="text-xs font-medium truncate w-full text-center">{car.fuelType}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link to={`/all-cars/${car._id}`} className="block w-full">
          <Button
            className="w-full bg-gray-900 text-white font-medium hover:bg-blue-600 shadow-md hover:shadow-lg transition-all"
            size="lg"
            radius="lg"
          >
            View Details
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

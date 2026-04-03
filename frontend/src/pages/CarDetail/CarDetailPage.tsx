import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaUserFriends,
  FaGasPump,
  FaSnowflake,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaTachometerAlt,
} from "react-icons/fa";
import { GiCarDoor, GiGearStickPattern } from "react-icons/gi";
import { FiArrowLeft } from "react-icons/fi";
import { Image } from "@heroui/react";
import { motion } from "framer-motion";

import { useCarStore, type FCar } from "../../stores/useCarStore";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, loading, error, fetchCars } = useCarStore();

  useEffect(() => {
    if (cars.length === 0) {
      fetchCars();
    }
  }, [fetchCars, cars.length]);

  const car = cars.find((c: FCar) => c._id === id);

  const specs = car
    ? [
      { Icon: FaCalendarAlt, label: "Year", value: car.year },
      { Icon: GiCarDoor, label: "Doors", value: car.doors },
      { Icon: FaUserFriends, label: "Seats", value: car.seats },
      { Icon: GiGearStickPattern, label: "Transmission", value: car.transmission },
      { Icon: FaGasPump, label: "Fuel Type", value: car.fuelType },
      { Icon: FaTachometerAlt, label: "Mileage", value: `${car.mileage} km` },
      { Icon: FaSnowflake, label: "A/C", value: car.ac ? "Yes" : "No" },
      {
        Icon: car.available ? FaCheckCircle : FaTimesCircle,
        label: "Availability",
        value: car.available ? "Available" : "Not Available",
        color: car.available ? "text-green-600" : "text-red-500"
      },
    ]
    : [];

  if (loading) return <div className="h-screen flex items-center justify-center"><LoadingSpinner size={10} /></div>;
  if (error)
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <div className="text-red-500 text-xl font-semibold">Error loading car details</div>
        <p className="text-gray-600">{error}</p>
        <Link to="/all-cars" className="text-blue-600 hover:underline">Return to Gallery</Link>
      </div>
    );

  if (!car)
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <div className="text-2xl font-bold text-gray-900">Car Not Found</div>
        <p className="text-gray-500">The vehicle you are looking for does not exist or has been removed.</p>
        <Link to="/all-cars" className="rounded-full bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition">
          Browse All Cars
        </Link>
      </div>
    );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50/50 pb-20"
    >
      {/* --- Navigation --- */}
      <div className="container mx-auto px-4 pt-6 pb-2 md:px-8 lg:px-16">
        <Link
          to="/all-cars"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 transition-colors hover:border-blue-200">
            <FiArrowLeft />
          </div>
          <span>Back to Inventory</span>
        </Link>
      </div>

      <div className="container mx-auto px-4 py-6 md:px-8 lg:px-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] xl:gap-14">

        {/* --- Left Column: Image & Gallery --- */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200/50 border border-gray-100 group">
            <div className="absolute top-4 right-4 z-10">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${car.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {car.available ? 'Available' : 'Booked'}
              </span>
            </div>
            <Image
              src={car.image}
              alt={`${car.make} ${car.carModel}`}
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              classNames={{ wrapper: "w-full aspect-[4/3] md:aspect-[16/9]" }}
            />
          </div>

          {/* Features Tag Cloud */}
          {car.features && car.features.length > 0 && (
            <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaCheckCircle className="text-blue-600" /> Premium Features
              </h3>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feat) => (
                  <span key={feat} className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-100">
                    {feat}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Description */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Vehicle Overview</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {car.description || `Experience the thrill of driving the ${car.year} ${car.make} ${car.carModel}. This vehicle combines performance, comfort, and style to deliver an unforgettable journey. Perfect for business trips or weekend getaways.`}
            </p>
          </motion.div>
        </motion.div>

        {/* --- Right Column: Details & Action --- */}
        <motion.div variants={itemVariants} className="space-y-6">

          {/* Booking Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-900/5 border border-blue-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-16 bg-blue-50 rounded-full blur-3xl -mr-8 -mt-8 -z-0" />

            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                {car.make} <span className="text-blue-600">{car.carModel}</span>
              </h1>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                <span>{car.year}</span>
                <span>•</span>
                <span>{car.type || "Luxury"}</span>
              </div>

              <div className="flex items-end gap-1 mb-8">
                <span className="text-4xl font-bold text-gray-900">${car.pricePerDay}</span>
                <span className="text-gray-500 font-medium mb-1">/ day</span>
              </div>

              <button
                disabled={!car.available}
                onClick={() => navigate(`/rent/${car._id}`)}
                className={`w-full py-4 rounded-xl text-lg font-bold shadow-lg transition-all transform active:scale-[0.98]
                    ${car.available
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  }`}
              >
                {car.available ? 'Rent this Car' : 'Currently Unavailable'}
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                Free cancellation up to 24 hours before pickup.
              </p>
            </div>
          </div>

          {/* Specs Grid */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold text-gray-900 mb-4 px-1">Technical Specifications</h3>
            <div className="grid grid-cols-2 gap-3">
              {specs.map(({ Icon, label, value, color }) => (
                <div key={label} className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col gap-2 hover:border-blue-100 transition-colors">
                  <Icon className={`text-xl ${color || "text-gray-400"}`} />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{label}</p>
                    <p className="text-sm font-bold text-gray-800 truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
};

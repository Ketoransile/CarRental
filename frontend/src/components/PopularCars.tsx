// import { useEffect } from "react";
// import type { ICar } from "../types/car";
// import { cars } from "../utils/dummyCarDetails";
// import { CarCard } from "./CarCard";
// import { useCarStore, type FCar } from "../stores/useCarStore";
// import { LoadingSpinner } from "./LoadingSpinner";

// export const PopularCars = () => {
//   const { cars, loading, error, fetchCars } = useCarStore();
//   useEffect(() => {
//     fetchCars();
//   }, [fetchCars]);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <p>Error: {error}</p>;
//   return (
//     <div className="w-full flex flex-col gap-x-10 gap-y-4 items-start py-20 ">
//       <h1 className="font-bold text-xl pb-4">
//         Popular <span className="text-blue-600">Cars</span>
//       </h1>
//       <div className="w-full grid grid-cols-3 gap-x-10 gap-y-10 items-center justify-between ">
//         {cars.slice(0, 3).map((car: FCar) => (
//           <CarCard car={car} key={car._id} />
//         ))}
//       </div>
//     </div>
//   );
// };
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useCarStore, type FCar } from "../stores/useCarStore";
import { LoadingSpinner } from "./LoadingSpinner";
import { CarCard } from "./CarCard";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";

export const PopularCars = () => {
  const { cars, loading, error, fetchCars } = useCarStore();
  console.log("Cars from popular cars", cars);
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size={32} />
      </div>
    );

  if (error)
    return (
      <div className="py-20 text-center">
        <p className="text-red-500 font-medium">Error loading cars: {error}</p>
        <button
          onClick={fetchCars}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );

  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header with modern styling */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Popular <span className="text-blue-600">Rental Cars</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Explore our most sought-after vehicles for your next adventure
          </p>
        </motion.div>

        {/* Cars grid with animations */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {cars.slice(0, 3).map((car: FCar) => (
            <motion.div key={car._id} variants={item}>
              <CarCard car={car} />
            </motion.div>
          ))}
        </motion.div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <Link to="/all-cars">
            <Button className="px-8 py-3 bg-white text-blue-600 font-medium rounded-full border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
              View All Vehicles
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

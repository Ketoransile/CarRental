// import { useEffect } from "react";
// import { motion } from "framer-motion";
// import { useCarStore, type FCar } from "../stores/useCarStore";
// import { LoadingSpinner } from "./LoadingSpinner";
// import { CarCard } from "./CarCard";
// import { Button } from "@heroui/react";
// import { Link } from "react-router-dom";

// export const PopularCars = () => {
//   const { cars, loading, error, fetchCars } = useCarStore();
//   console.log("Cars from popular cars", cars);
//   useEffect(() => {
//     fetchCars();
//   }, [fetchCars]);

//   // Animation variants
//   const container = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const item = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: [0.25, 0.1, 0.25, 1],
//       },
//     },
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center py-20">
//         <LoadingSpinner size={32} />
//       </div>
//     );

//   if (error)
//     return (
//       <div className="py-20 text-center">
//         <p className="text-red-500 font-medium">Error loading cars: {error}</p>
//         <button
//           onClick={fetchCars}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Retry
//         </button>
//       </div>
//     );

//   return (
//     <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Header with modern styling */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex flex-col items-center mb-12 text-center"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
//             Popular <span className="text-blue-600">Rental Cars</span>
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl">
//             Explore our most sought-after vehicles for your next adventure
//           </p>
//         </motion.div>

//         {/* Cars grid with animations */}
//         <motion.div
//           variants={container}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
//         >
//           {cars.slice(0, 3).map((car: FCar) => (
//             <motion.div key={car._id} variants={item}>
//               <CarCard car={car} />
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* View all button */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="flex justify-center mt-12"
//         >
//           <Link to="/all-cars">
//             <Button className="px-8 py-3 bg-white text-blue-600 font-medium rounded-full border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
//               View All Vehicles
//             </Button>
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// };
// src/components/PopularCars.tsx

import { useEffect } from "react";
import { motion, cubicBezier } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useCarStore, type FCar } from "../stores/useCarStore";
import { CarCard } from "./CarCard";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";

export const PopularCars = () => {
  const { cars, loading, error, fetchCars } = useCarStore();
  // console.log("Cars from popular cars", cars);
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

  // Define your custom ease using cubicBezier helper
  const easeOutCubic = cubicBezier(0.25, 0.1, 0.25, 1);

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: easeOutCubic, // ✅ Use the result of cubicBezier here
      },
    },
  };

  if (loading)
    return (
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 md:w-10 md:h-10 animate-spin text-blue-600" />
      </section>
    );

  if (error)
    return (
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-red-100 shadow-sm max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-red-500 text-3xl font-bold">!</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load cars</h3>
          <p className="text-gray-500 text-center mb-6">{error}</p>
          <button
            onClick={() => fetchCars()}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Try Again
          </button>
        </div>
      </section>
    );

  if (cars.length === 0) {
    return (
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <div className="text-gray-400 text-3xl">📭</div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No cars available</h3>
          <p className="text-gray-500 text-center mb-6">We couldn't find any popular cars at the moment.</p>
          <Link to="/all-cars">
            <Button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm">
              View All Vehicles
            </Button>
          </Link>
        </div>
      </section>
    );
  }

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

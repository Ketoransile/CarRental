// import { Image } from "@heroui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full flex flex-col gap-16 items-center justify-center px-4 md:px-8 lg:px-16 py-14">
      {/* Headline Section */}
      <motion.div
        className="w-full max-w-4xl flex flex-col gap-6 items-center justify-center text-center"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
          variants={fadeIn}
        >
          Drive Your Dreams: Rent The Perfect Car Today!
        </motion.h1>

        <motion.p
          className="text-sm md:text-base text-gray-600 max-w-2xl leading-relaxed"
          variants={fadeIn}
        >
          Discover the perfect vehicle for every journey. Whether it's a weekend
          getaway or a business trip, we've got you covered with our premium
          fleet.
        </motion.p>

        <motion.div variants={fadeIn}>
          <button
            onClick={() => navigate("/search")}
            className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Browse Cars
          </button>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {[
          { value: "500+", label: "Vehicles Available" },
          { value: "24/7", label: "Customer Support" },
          { value: "100+", label: "Locations" },
          { value: "5★", label: "Rated Service" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center"
            variants={fadeIn}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
            <p className="text-gray-600 mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroCar from "../../assets/cars/heroCar.svg";
import { FaArrowRight, FaPlay } from "react-icons/fa";

export const Hero = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
    },
  };

  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-transparent overflow-hidden px-4 md:px-8 lg:px-16 pt-20 md:pt-0">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-[60%] h-full bg-gradient-to-l from-blue-50/50 to-transparent skew-x-[-12deg] translate-x-20 hidden lg:block" />
      <div className="absolute -top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-[100px] -z-10" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-sm font-medium mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Premium Car Rental Service
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-gray-900">
            Find Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Dream Drive</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-xl leading-relaxed">
            Experience the thrill of the road with our premium fleet.
            From luxury cruisers to sporty convertibles, we have the perfect ride for every occasion.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              className="bg-blue-600 text-white font-semibold py-6 px-8 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] transition-all"
              onClick={() => navigate("/all-cars")}
              endContent={<FaArrowRight />}
            >
              Book Now
            </Button>
            <Button
              size="lg"
              variant="flat"
              className="bg-white text-gray-700 font-semibold py-6 px-8 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
              startContent={<div className="p-1 bg-blue-100 rounded-full text-blue-600"><FaPlay size={10} /></div>}
            >
              How it Works
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-8 mt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden bg-[url('https://i.pravatar.cc/100?img=${10 + i}')] bg-cover`} />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-900 text-white flex items-center justify-center text-xs font-bold pl-1">
                2k+
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900">Trusted by 2,000+</span>
              <span className="text-sm text-gray-500">Happy Customers</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="relative lg:h-[600px] flex items-center justify-center"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative z-10 w-full">
            <img
              src={heroCar}
              alt="Premium Car"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute top-1/4 right-0 lg:-right-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl z-20 border border-white/50 hidden md:block"
          >
            <p className="text-xs text-gray-500 font-medium mb-1">Top Speed</p>
            <p className="text-xl font-bold text-gray-900">240 km/h</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-1/4 left-0 lg:-left-8 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl z-20 border border-white/50 hidden md:block"
          >
            <p className="text-xs text-gray-500 font-medium mb-1">0-100 km/h</p>
            <p className="text-xl font-bold text-gray-900">3.2 sec</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

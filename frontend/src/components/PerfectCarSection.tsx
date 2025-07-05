import { Image } from "@heroui/react";
import { motion } from "framer-motion";

interface PerfectCarSectionProps {
  imageUrl: string;
  title?: string;
  description?: string;
  showDownloadButtons?: boolean;
  appStoreImage?: string;
  googlePlayImage?: string;
  reverseLayout?: boolean;
  className?: string;
}

export const PerfectCarSection = ({
  imageUrl,
  title = "Find the Perfect Car for Every Destination",
  description = "Premium selection, competitive prices, and 24/7 support. Book your perfect ride in minutes with our easy-to-use platform.",
  showDownloadButtons = true,
  appStoreImage,
  googlePlayImage,
  reverseLayout = false,
  className = "",
}: PerfectCarSectionProps) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const carAnimation = {
    hidden: { x: reverseLayout ? -100 : 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      className={`w-full flex flex-col ${
        reverseLayout ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center justify-between p-8 md:p-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-xl overflow-hidden ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.2 } },
      }}
    >
      {/* Text Content */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col gap-6 text-white z-10"
        variants={fadeIn}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {title.includes("Destination") ? (
            <>
              {title.split(" Destination")[0]}{" "}
              <span className="text-blue-200">Destination</span>
            </>
          ) : (
            title
          )}
        </h1>

        <p className="text-lg text-blue-100 max-w-xl leading-relaxed">
          {description}
        </p>

        {showDownloadButtons && (appStoreImage || googlePlayImage) && (
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-4">
            {appStoreImage && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={appStoreImage}
                  width={160}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                  alt="Download on App Store"
                />
              </motion.div>
            )}
            {googlePlayImage && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={googlePlayImage}
                  width={160}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                  alt="Get it on Google Play"
                />
              </motion.div>
            )}
          </div>
        )}
      </motion.div>

      {/* Car Image */}
      <motion.div
        className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0"
        variants={carAnimation}
      >
        <Image
          src={imageUrl}
          alt="Luxury car"
          width={600}
          className="z-10 transform hover:scale-105 transition-transform duration-500"
        />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>
    </motion.div>
  );
};

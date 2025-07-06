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
}

export const PerfectCarSection = ({
  imageUrl,
  title = "Find the Perfect Car for Every Destination",
  description = "Premium selection, competitive prices, and 24/7 support. Book your perfect ride in minutes with our easy-to-use platform.",
  showDownloadButtons = true,
  appStoreImage,
  googlePlayImage,
  reverseLayout = false,
}: PerfectCarSectionProps) => {
  return (
    <div
      className={`flex flex-col ${
        reverseLayout ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center gap-8 p-6 md:p-10 bg-blue-600 rounded-xl`}
    >
      {/* Text Content */}
      <div className="lg:w-1/2 text-white space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          {title.includes("Destination") ? (
            <>
              {title.split(" Destination")[0]}{" "}
              <span className="text-blue-200">Destination</span>
            </>
          ) : (
            title
          )}
        </h1>

        <p className="text-lg text-blue-100">{description}</p>

        {showDownloadButtons && (appStoreImage || googlePlayImage) && (
          <div className="flex gap-4 mt-4">
            {appStoreImage && (
              <Image
                src={appStoreImage}
                width={140}
                className="cursor-pointer hover:opacity-90"
                alt="Download on App Store"
              />
            )}
            {googlePlayImage && (
              <Image
                src={googlePlayImage}
                width={140}
                className="cursor-pointer hover:opacity-90"
                alt="Get it on Google Play"
              />
            )}
          </div>
        )}
      </div>

      {/* Car Image */}
      <div className="lg:w-1/2">
        <Image
          src={imageUrl}
          alt="Luxury car"
          width={500}
          className="hover:scale-105 transition-transform"
        />
      </div>
    </div>
  );
};

import { Image } from "@heroui/react";
import heroCar from "../../assets/cars/heroCar.svg";
import appstoreDownload from "../../assets/appstoreDownload.svg";
import googleDownload from "../../assets/googleDownload.svg";
export const Hero = () => {
  return (
    <div className="w-full flex items-center p-10 bg-blue-600 rounded-xl">
      <div className="w-1/2 flex flex-col gap-4">
        <h1 className="text-4xl max-w-6xl text-white  font-bold">
          Find the Perfect Car for Every{" "}
          <span className="text-white font-bold"> Destination</span>
        </h1>
        <p className="mt-4 text-lg text-neutral-100 max-w-4xl ">
          Find reliable, affordable car rentals for any trip—weekend getaways,
          business travel, and more. Easy booking, flexible options, and no
          hidden fees.
        </p>
        <div className="flex items-center gap-4">
          <Image src={appstoreDownload} width={200} className="z-10" />
          <Image src={googleDownload} width={200} className="z-10" />
        </div>
      </div>
      <Image src={heroCar} alt="hero-car" width={600} className=" z-10" />
    </div>
  );
};

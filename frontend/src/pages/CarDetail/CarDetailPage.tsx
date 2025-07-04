import { useParams } from "react-router-dom";
import type { ICar } from "../../types/car";
import { Button, Image } from "@heroui/react";
import { Link, useNavigate } from "react-router";
// People for seats
import { FaArrowLeft, FaUserFriends } from "react-icons/fa"; // Seats

// Car door for doors
import { GiCarDoor } from "react-icons/gi"; // Doors

// Gear icon for transmission
import { GiGearStickPattern } from "react-icons/gi"; // Transmission

// Gauge icon for mileage
import { LuGauge } from "react-icons/lu"; // Mileage

// Fuel pump icon for fuel type
import { FaGasPump } from "react-icons/fa"; // Fuel Type

// Snowflake for A/C
import { FaSnowflake } from "react-icons/fa"; // A/C

// Calendar or clock icon for year
import { FaCalendarAlt } from "react-icons/fa"; // Year

// Price tag for pricePerDay (already used)
import { FaTags } from "react-icons/fa"; // Price

// Check circle for availability
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Available / Not Available
import { useEffect } from "react";
import { useCarStore } from "../../stores/useCarStore";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, loading, error, fetchCars } = useCarStore();
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  // console.log("id from car detail page is ", id);
  const car: ICar | undefined = cars.find((car: ICar) => car._id === id);

  // Handle case where car is not found (e.g., invalid ID in URL)
  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Car not found.
      </div>
    );
  }

  // Create an array of specifications to easily map and display
  const technicalSpecs = [
    {
      icon: <FaCalendarAlt className="text-blue-600" />,
      label: "Year",
      value: car.year,
    },
    {
      icon: <GiCarDoor className="text-blue-600" />,
      label: "Doors",
      value: car.doors,
    },
    {
      icon: <FaUserFriends className="text-blue-600" />,
      label: "Seats",
      value: car.seats,
    },
    {
      icon: <GiGearStickPattern className="text-blue-600" />,
      label: "Transmission",
      value: car.transmission,
    },
    {
      icon: <FaGasPump className="text-blue-600" />,
      label: "Fuel Type",
      value: car.fuelType,
    },
    {
      icon: <LuGauge className="text-blue-600" />,
      label: "Mileage",
      value: `${car.mileage} km`,
    },
    {
      icon: <FaSnowflake className="text-blue-600" />,
      label: "A/C",
      value: car.ac ? "Yes" : "No",
    },
    {
      icon: car.available ? (
        <FaCheckCircle className="text-green-500" />
      ) : (
        <FaTimesCircle className="text-red-500" />
      ),
      label: "Availability",
      value: car.available ? "Available" : "Not Available",
    },
  ];

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-start pt-20 px-4 md:px-8 lg:px-16 gap-8">
      {/* Left Column: Image and Basic Info */}
      <div className="sticky top-24 flex flex-col gap-6">
        {" "}
        {/* <Link to="/all-cars">
          <Button
            // Navigates back one step in history
            // Alternatively, for a specific path: onClick={() => navigate('/all-cars')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 text-lg font-medium mb-4 self-start"
          >
            <FaArrowLeft className="text-xl" /> Back to All Cars
          </Button>
        </Link> */}
        <div className="">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold text-gray-900">
              {car.make} {car.model}
            </h1>
            <p className="text-blue-700 font-bold text-2xl">
              ${car.pricePerDay}{" "}
              <span className="text-neutral-500 text-sm font-normal">/day</span>
            </p>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
          <Image
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="w-full h-auto object-cover"
          />
        </div>
        {/* Rent Car Button */}
        <button
          className={`w-full py-3 mt-4 rounded-lg text-white font-semibold text-lg transition-colors duration-300
                      ${
                        car.available
                          ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
          disabled={!car.available}
          onClick={() => {
            if (car.available) {
              navigate(`/rent/${car._id}`);
            }
          }}
        >
          {car.available ? "Rent Car Now" : "Currently Unavailable"}
        </button>
      </div>

      {/* Right Column: Description and Technical Specifications */}
      <div className="flex flex-col items-start gap-6">
        <h2 className="text-2xl font-bold text-gray-800">About this Car</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {car.description}
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          Technical Specifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {technicalSpecs.map((spec, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm"
            >
              <span className="text-2xl">{spec.icon}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600">
                  {spec.label}:
                </span>
                <span className="text-lg font-semibold text-gray-800">
                  {spec.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        {car.features && car.features.length > 0 && (
          <div className="mt-6 w-full">
            <h2 className="text-2xl font-bold text-gray-800">Key Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-gray-700">
              {car.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-md">
                  <FaCheckCircle className="text-green-500 text-sm" /> {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

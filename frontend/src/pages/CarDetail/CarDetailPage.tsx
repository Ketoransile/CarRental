import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaUserFriends,
  FaGasPump,
  FaSnowflake,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { GiCarDoor, GiGearStickPattern } from "react-icons/gi";
import { LuGauge } from "react-icons/lu";
import { FiArrowLeft } from "react-icons/fi";
import { Image } from "@heroui/react";

import { useCarStore, type FCar } from "../../stores/useCarStore";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const CarDetailPage = () => {
  /* ------------ hooks that must always run in the same order ----------- */
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, loading, error, fetchCars } = useCarStore();

  useEffect(() => {
    fetchCars(); // fetch once – store caches subsequent calls
  }, [fetchCars]);

  /* -------------------- derive data (not hooks) ------------------------- */
  const car = cars.find((c: FCar) => c._id === id);

  const specs = car
    ? [
        { Icon: FaCalendarAlt, label: "Year", value: car.year },
        { Icon: GiCarDoor, label: "Doors", value: car.doors },
        { Icon: FaUserFriends, label: "Seats", value: car.seats },
        {
          Icon: GiGearStickPattern,
          label: "Transmission",
          value: car.transmission,
        },
        { Icon: FaGasPump, label: "Fuel Type", value: car.fuelType },
        { Icon: LuGauge, label: "Mileage", value: `${car.mileage} km` },
        { Icon: FaSnowflake, label: "A/C", value: car.ac ? "Yes" : "No" },
        {
          Icon: car.available ? FaCheckCircle : FaTimesCircle,
          label: "Availability",
          value: car.available ? "Available" : "Not Available",
        },
      ]
    : [];

  /* -------------------------- early returns ---------------------------- */
  if (loading) return <LoadingSpinner />;
  if (error)
    return <p className="p-8 text-center text-red-600">Error: {error}</p>;
  if (!car)
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-xl font-semibold">
        Car not found.
      </div>
    );

  /* ----------------------------- render -------------------------------- */
  return (
    <div className="container mx-auto grid min-h-screen grid-cols-1 gap-8 px-4 pt-24 sm:px-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:px-10">
      {/* ---------- left / top  ---------- */}
      <aside className=" flex flex-col gap-6 lg:gap-8">
        {/* Back link */}
        <Link
          to="/all-cars"
          className=" top-24 flex w-max items-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          <FiArrowLeft /> Back to results
        </Link>

        {/* Title & price */}
        <header>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
            {car.make} {car.model}
          </h1>
          <p className="mt-1 flex items-baseline gap-1 text-blue-700">
            <span className="text-2xl font-bold">${car.pricePerDay}</span>
            <span className="text-sm font-medium text-neutral-500">/day</span>
          </p>
        </header>

        {/* Hero image */}
        <div className="overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
          <Image
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="h-auto w-full object-cover"
          />
        </div>

        {/* Rent button */}
        <button
          disabled={!car.available}
          onClick={() => navigate(`/rent/${car._id}`)}
          className={`w-full rounded-lg py-3 text-lg font-semibold text-white transition-colors
            ${
              car.available
                ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                : "cursor-not-allowed bg-neutral-400"
            }`}
        >
          {car.available ? "Rent Car Now" : "Currently Unavailable"}
        </button>
      </aside>

      {/* ---------- right  ---------- */}
      <section className="flex flex-col gap-8">
        {/* Description */}
        <article>
          <h2 className="mb-2 text-2xl font-bold text-neutral-800">
            About this car
          </h2>
          <p className="text-lg leading-relaxed text-neutral-700">
            {car.description}
          </p>
        </article>

        {/* Specs */}
        <article>
          <h2 className="mb-4 text-2xl font-bold text-neutral-800">
            Technical specifications
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {specs.map(({ Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-lg bg-neutral-50 p-4 shadow-sm"
              >
                <Icon className="text-blue-600" size={22} />
                <div>
                  <p className="text-sm font-medium text-neutral-600">
                    {label}
                  </p>
                  <p className="text-lg font-semibold text-neutral-800">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Features */}
        {car.features?.length ? (
          <article>
            <h2 className="mb-4 text-2xl font-bold text-neutral-800">
              Key features
            </h2>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {car.features.map((feat) => (
                <li
                  key={feat}
                  className="flex items-center gap-2 text-neutral-700"
                >
                  <FaCheckCircle className="text-green-500" /> {feat}
                </li>
              ))}
            </ul>
          </article>
        ) : null}
      </section>
    </div>
  );
};

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RentalSummary } from "../../components/RentalSummary";
import { CarRentalForm } from "../../components/CarRentalForm";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import axios from "axios";
import type { ICar } from "../../types/car";

// ✅ Default object matching your ICar interface
const defaultCar: ICar = {
  _id: "",
  make: "",
  model: "",
  year: 0,
  type: "",
  transmission: "Automatic", // Default to "Automatic"
  seats: 0,
  doors: 0,
  pricePerDay: 0,
  available: false,
  mileage: 0,
  fuelType: "Gasoline", // Default to "Gasoline"
  ac: false,
  image: "",
  features: [],
  description: "",
};

export const CarBookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<ICar>(defaultCar);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [pickUpDate, setPickUpDate] = useState<string>("");
  const [dropOffDate, setDropOffDate] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setError("No car ID found in URL.");
      setLoading(false);
      return;
    }

    const fetchCar = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/v1/car/getCar/${id}`,
          { withCredentials: true }
        );
        setCar(res.data.data);
      } catch (err) {
        console.error("Error fetching car:", err);
        setError("Failed to fetch car details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <div className="w-full grid grid-cols-5 items-start gap-4 bg-neutral-100 px-4 py-4">
      <div className="z-10 col-span-3">
        <CarRentalForm
          car={car}
          setTotalPrice={setTotalPrice}
          totalPrice={totalPrice}
          setPickUpDate={setPickUpDate}
          setDropOffDate={setDropOffDate}
        />
      </div>
      <div className="col-span-2 sticky top-20">
        <RentalSummary
          car={car}
          totalPrice={totalPrice}
          pickUpDate={pickUpDate}
          dropOffDate={dropOffDate}
        />
      </div>
    </div>
  );
};

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { RentalSummary } from "../../components/RentalSummary";
// import { CarRentalForm } from "../../components/CarRentalForm";
// import { LoadingSpinner } from "../../components/LoadingSpinner";
// import axios from "axios";
// import type { ICar } from "../../types/car";

// // ✅ Default object matching your ICar interface
// const defaultCar: ICar = {
//   _id: "",
//   make: "",
//   model: "",
//   year: 0,
//   type: "",
//   transmission: "Automatic", // Default to "Automatic"
//   seats: 0,
//   doors: 0,
//   pricePerDay: 0,
//   available: false,
//   mileage: 0,
//   fuelType: "Gasoline", // Default to "Gasoline"
//   ac: false,
//   image: "",
//   features: [],
//   description: "",
// };

// export const CarBookingPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const [car, setCar] = useState<ICar>(defaultCar);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [totalPrice, setTotalPrice] = useState<number>(0);
//   const [pickUpDate, setPickUpDate] = useState<string>("");
//   const [dropOffDate, setDropOffDate] = useState<string>("");

//   useEffect(() => {
//     if (!id) {
//       setError("No car ID found in URL.");
//       setLoading(false);
//       return;
//     }

//     const fetchCar = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `http://localhost:5000/api/v1/car/getCar/${id}`,
//           { withCredentials: true }
//         );
//         setCar(res.data.data);
//       } catch (err) {
//         console.error("Error fetching car:", err);
//         setError("Failed to fetch car details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCar();
//   }, [id]);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

//   return (
//     <div className="w-full grid grid-cols-5 items-start gap-4 bg-neutral-100 px-4 py-4">
//       <div className="z-10 col-span-3">
//         <CarRentalForm
//           car={car}
//           setTotalPrice={setTotalPrice}
//           totalPrice={totalPrice}
//           setPickUpDate={setPickUpDate}
//           setDropOffDate={setDropOffDate}
//         />
//       </div>
//       <div className="col-span-2 sticky top-20">
//         <RentalSummary
//           car={car}
//           totalPrice={totalPrice}
//           pickUpDate={pickUpDate}
//           dropOffDate={dropOffDate}
//         />
//       </div>
//     </div>
//   );
// };
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { RentalSummary } from "../../components/RentalSummary";
// import { CarRentalForm } from "../../components/CarRentalForm";
// import { LoadingSpinner } from "../../components/LoadingSpinner";
// import axios from "axios";
// import type { ICar } from "../../types/car";

// /* ——— default value matching ICar ——— */
// const defaultCar: ICar = {
//   _id: "",
//   make: "",
//   model: "",
//   year: 0,
//   type: "",
//   transmission: "Automatic",
//   seats: 0,
//   doors: 0,
//   pricePerDay: 0,
//   available: false,
//   mileage: 0,
//   fuelType: "Gasoline",
//   ac: false,
//   image: "",
//   features: [],
//   description: "",
// };

// export const CarBookingPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const [car, setCar] = useState<ICar>(defaultCar);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [totalPrice, setTotalPrice] = useState<number>(0);
//   const [pickUpDate, setPickUpDate] = useState<string>("");
//   const [dropOffDate, setDropOffDate] = useState<string>("");

//   /* fetch the chosen vehicle */
//   useEffect(() => {
//     if (!id) {
//       setError("No car ID found in URL.");
//       setLoading(false);
//       return;
//     }
//     const fetchCar = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/v1/car/getCar/${id}`,
//           { withCredentials: true }
//         );
//         setCar(res.data.data);
//       } catch (err) {
//         console.error("Error fetching car:", err);
//         setError("Failed to fetch car details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCar();
//   }, [id]);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <p className="mt-4 text-center text-red-500">{error}</p>;

//   return (
//     <div
//       className="w-full grid gap-6 bg-neutral-100 px-4 py-6
//                  lg:grid-cols-5 lg:gap-4"
//     >
//       {/* ——— form ——— */}
//       <div className="z-10 lg:col-span-3">
//         <CarRentalForm
//           car={car}
//           setTotalPrice={setTotalPrice}
//           totalPrice={totalPrice}
//           setPickUpDate={setPickUpDate}
//           setDropOffDate={setDropOffDate}
//         />
//       </div>

//       {/* ——— summary ——— */}
//       <div className="lg:col-span-2 lg:sticky lg:top-20">
//         <RentalSummary
//           car={car}
//           totalPrice={totalPrice}
//           pickUpDate={pickUpDate}
//           dropOffDate={dropOffDate}
//         />
//       </div>
//     </div>
//   );
// };
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Import HeroUI components for the modal, button, image, and input
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { RentalSummary } from "../../components/RentalSummary";
import { CarRentalForm } from "../../components/CarRentalForm";
import { LoadingSpinner } from "../../components/LoadingSpinner";

// Assuming these components are in the same directory or correctly imported
// You might need to adjust these paths based on your project structure.

// Define the ICar interface (assuming it's in a types/car.ts file)
// This is a placeholder; ensure your actual ICar type matches your backend.
type ICar = {
  _id: string;
  make: string;
  model: string;
  year: number;
  type: string;
  transmission: "Automatic" | "Manual";
  seats: number;
  doors: number;
  pricePerDay: number;
  available: boolean;
  mileage: number;
  fuelType: "Gasoline" | "Diesel" | "Electric";
  ac: boolean;
  image: string;
  features: string[];
  description: string;
};

/* ——— default value matching ICar ——— */
const defaultCar: ICar = {
  _id: "",
  make: "",
  model: "",
  year: 0,
  type: "",
  transmission: "Automatic",
  seats: 0,
  doors: 0,
  pricePerDay: 0,
  available: false,
  mileage: 0,
  fuelType: "Gasoline",
  ac: false,
  image: "",
  features: [],
  description: "",
};

/**
 * CarBookingPage Component
 * This component displays car details, a rental form, and a rental summary.
 * On smaller screens, the summary is accessible via a floating modal.
 */
export const CarBookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<ICar>(defaultCar);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [pickUpDate, setPickUpDate] = useState<string>("");
  const [dropOffDate, setDropOffDate] = useState<string>("");

  // HeroUI useDisclosure hook for managing the modal's open/close state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  /* useEffect hook to fetch the chosen vehicle details when the component mounts or ID changes */
  useEffect(() => {
    if (!id) {
      setError("No car ID found in URL.");
      setLoading(false);
      return;
    }

    const fetchCar = async () => {
      try {
        setLoading(true);
        // Make an API call to fetch car details using the provided ID
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/car/getCar/${id}`,
          { withCredentials: true } // Include cookies with the request
        );
        setCar(res.data.data); // Set the fetched car data to state
      } catch (err) {
        console.error("Error fetching car:", err);
        setError("Failed to fetch car details."); // Set an error message if fetching fails
      } finally {
        setLoading(false); // Always set loading to false after the fetch attempt
      }
    };

    fetchCar(); // Call the fetch function
  }, [id]); // Dependency array: re-run effect if 'id' changes

  // Display loading spinner while data is being fetched
  if (loading) return <LoadingSpinner />;
  // Display error message if there was an error fetching data
  if (error) return <p className="mt-4 text-center text-red-500">{error}</p>;

  return (
    <div
      className="w-full grid gap-6 bg-neutral-100 px-4 py-6
                   lg:grid-cols-5 lg:gap-4"
    >
      {/* ——— Car Rental Form Section ——— */}
      {/* This section contains the form for rental details */}
      <div className="z-10 lg:col-span-3">
        <CarRentalForm
          car={car}
          setTotalPrice={setTotalPrice}
          totalPrice={totalPrice}
          setPickUpDate={setPickUpDate}
          setDropOffDate={setDropOffDate}
        />
      </div>

      {/* ——— Rental Summary for Larger Screens ——— */}
      {/* This div is hidden on small screens and shown on large screens (lg breakpoint and above) */}
      <div className="hidden lg:col-span-2 lg:sticky lg:top-20 lg:block">
        <RentalSummary
          car={car}
          totalPrice={totalPrice} // Pass the totalPrice from CarBookingPage state
          pickUpDate={pickUpDate}
          dropOffDate={dropOffDate}
        />
      </div>

      {/* ——— Floating Action Button for Smaller Screens ——— */}
      {/* This button is fixed at the bottom right and only visible on small screens (hidden on lg and above) */}
      <Button
        onPress={onOpen} // Use onPress for HeroUI Button to open the modal
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg
                   lg:hidden z-50 flex items-center justify-center gap-2
                   hover:bg-blue-700 transition-colors duration-200"
        aria-label="View Rental Summary"
      >
        {/* SVG icon for the summary/document */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25H21M7.5 10.5h6"
          />
        </svg>
        <span className="font-semibold hidden sm:inline">View Summary</span>
        {/* Display the calculated total price on the button for quick reference */}
        <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
      </Button>

      {/* ——— HeroUI Modal for Rental Summary ——— */}
      {/* This modal will open when the floating button is pressed */}
      <Modal
        isOpen={isOpen} // Controls the visibility of the modal
        onOpenChange={onOpenChange} // Handles closing the modal (e.g., via backdrop click, Escape key)
        scrollBehavior="inside" // Allows content within ModalBody to scroll if it overflows
        size="lg" // Sets the size of the modal (e.g., sm, md, lg, xl, 2xl, full)
      >
        <ModalContent>
          {(
            onClose // The onClose function is provided by ModalContent's render prop
          ) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-blue-600 font-extrabold text-2xl">
                Rental Summary
              </ModalHeader>
              <ModalBody>
                {/* Render the RentalSummary component inside the modal body */}
                <RentalSummary
                  car={car}
                  totalPrice={totalPrice} // Pass the state totalPrice to the summary
                  pickUpDate={pickUpDate}
                  dropOffDate={dropOffDate}
                />
              </ModalBody>
              <ModalFooter>
                {/* Button to close the modal */}
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {/* You can add additional action buttons here if needed */}
                {/* <Button color="primary" onPress={onClose}>
                  Proceed to Checkout
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

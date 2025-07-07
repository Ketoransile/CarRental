// import { Button, Image, Input } from "@heroui/react";
// import type { ICar } from "../types/car";

// interface CarRentalProps {
//   car: ICar;
//   // The 'totalPrice' prop from the parent is useful, but for displaying
//   // 'Base Price' and the final total in RentalSummary, we'll re-derive
//   // it from pickUpDate, dropOffDate, and car.pricePerDay for consistency.
//   totalPrice: number; // This prop represents the base cost from the form
//   pickUpDate: string; // Pass the string dates directly from the form
//   dropOffDate: string; // Pass the string dates directly from the form
// }

// export const RentalSummary = ({
//   car,
//   // We don't need to destructure totalPrice directly here,
//   // as basePrice will be re-calculated internally for accuracy.
//   pickUpDate,
//   dropOffDate,
// }: CarRentalProps) => {
//   const TAX_RATE = 0.1; // 10%
//   const SERVICE_FEE_PER_DAY = 5.0; // $5 per day
//   const AIRPORT_FEE = 15.0; // $15 flat fee for airport pickup (if applicable)

//   // This should come from your form's pickUpLocation if it's an airport.
//   // For now, it remains a placeholder.
//   const isAirportPickup = false;

//   // Function to calculate rental days safely and robustly
//   const calculateRentalDays = () => {
//     try {
//       const start = new Date(pickUpDate);
//       const end = new Date(dropOffDate);

//       // Crucial check: If dates are invalid (e.g., "Invalid Date" object)
//       // or if date strings are empty/null/undefined, return 0 days.
//       if (
//         isNaN(start.getTime()) ||
//         isNaN(end.getTime()) ||
//         !pickUpDate ||
//         !dropOffDate
//       ) {
//         return 0;
//       }

//       // If drop-off date is before or the same as pick-up date, return 0 days.
//       // This prevents negative or zero-day rentals from appearing as actual rental days.
//       if (start.getTime() >= end.getTime()) {
//         return 0;
//       }

//       const diffTime = Math.abs(end.getTime() - start.getTime());
//       // Calculate days. Use Math.ceil to ensure even partial days are counted as a full day.
//       const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//       return days;
//     } catch (e) {
//       console.error("Error calculating rental days:", e);
//       return 0; // Return 0 days in case of any parsing or calculation error
//     }
//   };

//   const rentalDays = calculateRentalDays();

//   // --- Core Fix: Calculate basePrice directly from rentalDays here ---
//   // This ensures the displayed "Base Price" always matches the "rentalDays" shown
//   // and the car's pricePerDay, making it consistent within this component.
//   const basePrice = car.pricePerDay * rentalDays;

//   const taxAmount = basePrice * TAX_RATE;
//   const serviceFee = SERVICE_FEE_PER_DAY * rentalDays;
//   const appliedAirportFee = isAirportPickup ? AIRPORT_FEE : 0;
//   const discountAmount = 0; // Placeholder for future promo code logic

//   const finalCalculatedTotalPrice =
//     basePrice + taxAmount + serviceFee + appliedAirportFee - discountAmount;

//   return (
//     <div className="w-full flex flex-col gap-4 bg-white rounded-xl p-6 shadow-md">
//       <h1 className="text-blue-600 font-extrabold text-2xl border-b pb-4 mb-2 text-center md:text-left">
//         Rental Summary
//       </h1>
//       <p className="text-sm text-neutral-500 mb-2 text-center md:text-left">
//         Prices may change depending on the length of the rental and the price of
//         your rental car.
//       </p>

//       <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b pb-4 mb-2">
//         <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
//           <Image
//             src={car.image}
//             width={250}
//             height={250}
//             alt={`${car.make} ${car.model}`}
//             className="rounded-lg object-contain max-w-full h-auto"
//           />
//         </div>
//         <div className="flex flex-col gap-2 text-center md:text-left w-full md:w-1/2">
//           <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
//             {car.make} {car.model}
//           </h1>
//           <p className="text-base text-neutral-600 mb-2">{car.description}</p>
//           <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
//             <span className="text-xl font-bold text-blue-600">
//               ${car.pricePerDay.toFixed(2)}
//             </span>
//             <span className="text-sm text-neutral-500">/ day</span>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col gap-3 py-4 border-b border-dashed">
//         <div className="flex items-center justify-between">
//           <span className="font-semibold text-gray-700">
//             Base Price ({rentalDays} days)
//           </span>
//           <span className="font-bold text-gray-800">
//             ${basePrice.toFixed(2)}{" "}
//             {/* Uses the internally calculated basePrice */}
//           </span>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="font-semibold text-gray-700">
//             Tax ({(TAX_RATE * 100).toFixed(0)}%)
//           </span>
//           <span className="font-bold text-gray-800">
//             ${taxAmount.toFixed(2)}
//           </span>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="font-semibold text-gray-700">
//             Service Fee ({rentalDays} days @ ${SERVICE_FEE_PER_DAY.toFixed(2)}
//             /day)
//           </span>
//           <span className="font-bold text-gray-800">
//             ${serviceFee.toFixed(2)}
//           </span>
//         </div>
//         {isAirportPickup && (
//           <div className="flex items-center justify-between">
//             <span className="font-semibold text-gray-700">
//               Airport Pickup Fee
//             </span>
//             <span className="font-bold text-gray-800">
//               ${appliedAirportFee.toFixed(2)}
//             </span>
//           </div>
//         )}
//         {discountAmount > 0 && (
//           <div className="flex items-center justify-between text-green-600">
//             <span className="font-semibold">Discount</span>
//             <span className="font-bold">-${discountAmount.toFixed(2)}</span>
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 rounded-lg bg-neutral-100 mt-2">
//         <Input
//           placeholder="Apply Promo Code"
//           className="placeholder:text-neutral-500 placeholder:text-sm bg-transparent shadow-none focus:border-none border-none hover:border-none w-full sm:w-auto flex-grow"
//         />
//         <Button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto">
//           Apply Now
//         </Button>
//       </div>

//       <div className="flex items-center justify-between mt-4 p-4 border-t-2 border-blue-600 pt-4">
//         <div className="flex flex-col gap-1">
//           <h1 className="font-extrabold text-xl text-gray-900">
//             Total Rental Price
//           </h1>
//           <p className="text-xs text-neutral-500">
//             Overall price & includes rental discount (if applied)
//           </p>
//         </div>
//         <h2 className="font-extrabold text-3xl text-blue-700">
//           ${finalCalculatedTotalPrice.toFixed(2)}
//         </h2>
//       </div>
//     </div>
//   );
// };
import { Button, Image, Input } from "@heroui/react";
// Assuming ICar type is accessible or defined here if not imported globally
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

interface CarRentalProps {
  car: ICar;
  totalPrice: number; // This prop represents the base cost from the form (though re-calculated internally for consistency)
  pickUpDate: string; // The selected pick-up date string
  dropOffDate: string; // The selected drop-off date string
}

export const RentalSummary = ({
  car,
  pickUpDate,
  dropOffDate,
}: CarRentalProps) => {
  const TAX_RATE = 0.1; // 10% tax rate
  const SERVICE_FEE_PER_DAY = 5.0; // $5 service fee per day
  const AIRPORT_FEE = 15.0; // $15 flat fee for airport pickup (if applicable)

  // Placeholder: This should ideally come from your form's pickUpLocation if it's an airport.
  // For demonstration, it's set to false.
  const isAirportPickup = false;

  /**
   * Calculates the number of rental days based on pick-up and drop-off dates.
   * Handles invalid dates and ensures at least 0 days for invalid ranges.
   * @returns {number} The number of rental days.
   */
  const calculateRentalDays = () => {
    try {
      const start = new Date(pickUpDate);
      const end = new Date(dropOffDate);

      // Crucial check: If dates are invalid (e.g., "Invalid Date" object)
      // or if date strings are empty/null/undefined, return 0 days.
      if (
        isNaN(start.getTime()) || // Check if start date is invalid
        isNaN(end.getTime()) || // Check if end date is invalid
        !pickUpDate || // Check if pickUpDate string is empty/null/undefined
        !dropOffDate // Check if dropOffDate string is empty/null/undefined
      ) {
        return 0;
      }

      // If drop-off date is before or the same as pick-up date, return 0 days.
      // This prevents negative or zero-day rental calculations.
      if (start.getTime() >= end.getTime()) {
        return 0;
      }

      const diffTime = Math.abs(end.getTime() - start.getTime());
      // Calculate days. Use Math.ceil to count even partial days as a full day.
      // This ensures that if a car is rented for 1 day and 1 hour, it's charged for 2 days.
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return days;
    } catch (e) {
      // Log any errors during date calculation for debugging purposes
      console.error("Error calculating rental days:", e);
      return 0; // Return 0 days in case of any parsing or calculation error
    }
  };

  const rentalDays = calculateRentalDays();

  // Calculate the base price directly from rental days and car's price per day.
  // This ensures consistency between the displayed rental days and the base price.
  const basePrice = car.pricePerDay * rentalDays;

  // Calculate other fees and taxes based on the base price and rental days
  const taxAmount = basePrice * TAX_RATE;
  const serviceFee = SERVICE_FEE_PER_DAY * rentalDays;
  const appliedAirportFee = isAirportPickup ? AIRPORT_FEE : 0; // Apply airport fee only if applicable
  const discountAmount = 0; // Placeholder for future promo code logic (currently no discount applied)

  // Calculate the final total price
  const finalCalculatedTotalPrice =
    basePrice + taxAmount + serviceFee + appliedAirportFee - discountAmount;

  return (
    <div className="w-full flex flex-col gap-4 bg-white rounded-xl p-6 shadow-md">
      <h1 className="text-blue-600 font-extrabold text-2xl border-b pb-4 mb-2 text-center md:text-left">
        Rental Summary
      </h1>
      <p className="text-sm text-neutral-500 mb-2 text-center md:text-left">
        Prices may change depending on the length of the rental and the price of
        your rental car.
      </p>

      {/* Car details section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b pb-4 mb-2">
        <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
          <Image
            src={car.image}
            width={250}
            height={250}
            alt={`${car.make} ${car.model}`}
            className="rounded-lg object-contain max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col gap-2 text-center md:text-left w-full md:w-1/2">
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
            {car.make} {car.model}
          </h1>
          <p className="text-base text-neutral-600 mb-2">{car.description}</p>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
            <span className="text-xl font-bold text-blue-600">
              ${car.pricePerDay.toFixed(2)}
            </span>
            <span className="text-sm text-neutral-500">/ day</span>
          </div>
        </div>
      </div>

      {/* Price breakdown section */}
      <div className="flex flex-col gap-3 py-4 border-b border-dashed">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-700">
            Base Price ({rentalDays} days)
          </span>
          <span className="font-bold text-gray-800">
            ${basePrice.toFixed(2)}{" "}
            {/* Uses the internally calculated basePrice */}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-700">
            Tax ({(TAX_RATE * 100).toFixed(0)}%)
          </span>
          <span className="font-bold text-gray-800">
            ${taxAmount.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-700">
            Service Fee ({rentalDays} days @ ${SERVICE_FEE_PER_DAY.toFixed(2)}
            /day)
          </span>
          <span className="font-bold text-gray-800">
            ${serviceFee.toFixed(2)}
          </span>
        </div>
        {isAirportPickup && (
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">
              Airport Pickup Fee
            </span>
            <span className="font-bold text-gray-800">
              ${appliedAirportFee.toFixed(2)}
            </span>
          </div>
        )}
        {discountAmount > 0 && (
          <div className="flex items-center justify-between text-green-600">
            <span className="font-semibold">Discount</span>
            <span className="font-bold">-${discountAmount.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Promo code input and button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 rounded-lg bg-neutral-100 mt-2">
        <Input
          placeholder="Apply Promo Code"
          className="placeholder:text-neutral-500 placeholder:text-sm bg-transparent shadow-none focus:border-none border-none hover:border-none w-full sm:w-auto flex-grow"
        />
        <Button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto">
          Apply Now
        </Button>
      </div>

      {/* Total rental price section */}
      <div className="flex items-center justify-between mt-4 p-4 border-t-2 border-blue-600 pt-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-extrabold text-xl text-gray-900">
            Total Rental Price
          </h1>
          <p className="text-xs text-neutral-500">
            Overall price & includes rental discount (if applied)
          </p>
        </div>
        <h2 className="font-extrabold text-3xl text-blue-700">
          ${finalCalculatedTotalPrice.toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

// import { Button, Image, Input } from "@heroui/react";
// import type { ICar } from "../types/car";
// interface carRentalProps {
//   car: ICar;
//   totalPrice: number;
// }
// export const RentalSummary = ({ car, totalPrice }: carRentalProps) => {
//   console.log("Car from rentalsummary component is ", car);
//   yy;
//   return (
//     <div className="w-full  flex flex-col gap-2 bg-white rounded-xl p-4 ">
//       <h1 className="text-blue-600  font-bold text-lg">Rental Summary</h1>
//       <p className="text-xs text-neutral-400 ">
//         Prices may change depending on the length of the rental and the price of
//         your rental car
//       </p>
//       <div className="grid grid-cols-2 items-center gap-2">
//         <Image src={car.image} width={200} height={200} />
//         <div className="flex flex-col gap-4">
//           <h1 className="text-2xl font-bold">
//             {car.make} {car.model}
//           </h1>
//           <p className="text-xs text-neutral-500">{car.description}</p>
//         </div>
//       </div>
//       <div className="flex items-center justify-between">
//         <h1 className="font-semibold ">Subtotal</h1>
//         {/* <h1 className="font-bold">$80.00</h1> */}
//         <h1 className="font-bold">${totalPrice}</h1>
//       </div>
//       <div className="flex items-center justify-between">
//         <h1 className="font-semibold">Tax</h1>
//         <h1 className="font-bold">$0</h1>
//       </div>
//       <div className="px-4 py-2 rounded-md flex items-center justify-between bg-neutral-100">
//         <Input
//           placeholder="Apply Promo Code"
//           className=" placeholder:text-neutral-400 placeholder:text-xs bg-parent shadow-none focus:border-none border-none hover:border-none"
//         />
//         <Button className="bg-parent font-bold">Apply Now</Button>
//       </div>
//       <div className="flex items-center justify-between">
//         <div className="flex flex-col gap-2">
//           <h1 className="font-bold">Total Rental Price</h1>
//           <p className="text-xs text-neutral-400">
//             Overall price & includes rental discount{" "}
//           </p>
//         </div>
//         {/* <h2 className="font-bold">$80.0</h2> */}
//         <h2 className="font-bold">${totalPrice}</h2>
//       </div>
//     </div>
//   );
// };
import { Button, Image, Input } from "@heroui/react";
import type { ICar } from "../types/car";

interface CarRentalProps {
  car: ICar;
  // The 'totalPrice' prop from the parent is useful, but for displaying
  // 'Base Price' and the final total in RentalSummary, we'll re-derive
  // it from pickUpDate, dropOffDate, and car.pricePerDay for consistency.
  totalPrice: number; // This prop represents the base cost from the form
  pickUpDate: string; // Pass the string dates directly from the form
  dropOffDate: string; // Pass the string dates directly from the form
}

export const RentalSummary = ({
  car,
  // We don't need to destructure totalPrice directly here,
  // as basePrice will be re-calculated internally for accuracy.
  pickUpDate,
  dropOffDate,
}: CarRentalProps) => {
  const TAX_RATE = 0.1; // 10%
  const SERVICE_FEE_PER_DAY = 5.0; // $5 per day
  const AIRPORT_FEE = 15.0; // $15 flat fee for airport pickup (if applicable)

  // This should come from your form's pickUpLocation if it's an airport.
  // For now, it remains a placeholder.
  const isAirportPickup = false;

  // Function to calculate rental days safely and robustly
  const calculateRentalDays = () => {
    try {
      const start = new Date(pickUpDate);
      const end = new Date(dropOffDate);

      // Crucial check: If dates are invalid (e.g., "Invalid Date" object)
      // or if date strings are empty/null/undefined, return 0 days.
      if (
        isNaN(start.getTime()) ||
        isNaN(end.getTime()) ||
        !pickUpDate ||
        !dropOffDate
      ) {
        return 0;
      }

      // If drop-off date is before or the same as pick-up date, return 0 days.
      // This prevents negative or zero-day rentals from appearing as actual rental days.
      if (start.getTime() >= end.getTime()) {
        return 0;
      }

      const diffTime = Math.abs(end.getTime() - start.getTime());
      // Calculate days. Use Math.ceil to ensure even partial days are counted as a full day.
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return days;
    } catch (e) {
      console.error("Error calculating rental days:", e);
      return 0; // Return 0 days in case of any parsing or calculation error
    }
  };

  const rentalDays = calculateRentalDays();

  // --- Core Fix: Calculate basePrice directly from rentalDays here ---
  // This ensures the displayed "Base Price" always matches the "rentalDays" shown
  // and the car's pricePerDay, making it consistent within this component.
  const basePrice = car.pricePerDay * rentalDays;

  const taxAmount = basePrice * TAX_RATE;
  const serviceFee = SERVICE_FEE_PER_DAY * rentalDays;
  const appliedAirportFee = isAirportPickup ? AIRPORT_FEE : 0;
  const discountAmount = 0; // Placeholder for future promo code logic

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

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 rounded-lg bg-neutral-100 mt-2">
        <Input
          placeholder="Apply Promo Code"
          className="placeholder:text-neutral-500 placeholder:text-sm bg-transparent shadow-none focus:border-none border-none hover:border-none w-full sm:w-auto flex-grow"
        />
        <Button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto">
          Apply Now
        </Button>
      </div>

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

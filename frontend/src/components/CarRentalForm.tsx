import {
  addToast,
  Button,
  DatePicker,
  Form,
  // Image,
  Input,
} from "@heroui/react";
import type React from "react";
import { Select, SelectItem } from "@heroui/react";
// import paymentCardsimage from "../assets/paymentCards.png";
import { CheckboxGroup, Checkbox } from "@heroui/react";
import { ShieldCheck } from "lucide-react";
import {
  useForm,
  Controller,
  type FieldErrors,
  type FieldError,
} from "react-hook-form";
import type { CarRentalFormType } from "../types/carRentalFormType";
import { zodResolver } from "@hookform/resolvers/zod";
import { CarRentalSchema } from "../schemas/carRentalSchema";
import { parseDate } from "@internationalized/date";
import type { DateValue } from "@internationalized/date";
// import type { Granularity } from "@react-types/datepicker";
import { useNavigate } from "react-router-dom";
import type { ICar } from "../types/car";
import { useEffect, useState } from "react"; // Import useState here
import axios from "axios";
import { CalendarDateTime } from "@internationalized/date"; // Ensure CalendarDateTime is imported

interface carRentalProps {
  car: ICar;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  totalPrice: number;
  setPickUpDate: React.Dispatch<React.SetStateAction<string>>;
  setDropOffDate: React.Dispatch<React.SetStateAction<string>>;
}

// Define an interface for the booking date range for type safety and clarity
interface BookingDateRange {
  start: Date;
  end: Date;
}

export const CarRentalForm = ({
  car,
  setTotalPrice,
  totalPrice,
  setPickUpDate,
  setDropOffDate,
}: carRentalProps) => {
  const navigate = useNavigate();

  const cities = [
    { key: "nyc", label: "New York City" },
    { key: "la", label: "Los Angeles" },
    { key: "chi", label: "Chicago" },
    { key: "mia", label: "Miami" },
    { key: "sfo", label: "San Francisco" },
    { key: "lon", label: "London" },
    { key: "par", label: "Paris" },
    { key: "ber", label: "Berlin" },
    { key: "tok", label: "Tokyo" },
    { key: "syd", label: "Sydney" },
  ];

  const defaultValues: CarRentalFormType = {
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    pickUpLocation: "",
    pickUpDate: "",
    dropOffLocation: "",
    dropOffDate: "",
    vehicleId: car._id,
    totalPrice,
    confirmationTerms: [],
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isLoading, isSubmitting },
    watch,

    reset,
    setValue,
  } = useForm<CarRentalFormType>({
    resolver: zodResolver(CarRentalSchema),
    defaultValues,
  });

  const pickUpDate = watch("pickUpDate");
  const dropOffDate = watch("dropOffDate");

  useEffect(() => {
    setPickUpDate(pickUpDate);
    setDropOffDate(dropOffDate);
  }, [pickUpDate, dropOffDate, setPickUpDate, setDropOffDate]);

  useEffect(() => {
    if (pickUpDate && dropOffDate) {
      console.log("pickup date is ", pickUpDate);
      console.log("drop off date is ", dropOffDate);
      const start = new Date(pickUpDate);
      const end = new Date(dropOffDate);
      const msPerDay = 1000 * 60 * 60 * 24;
      const diffDays = Math.ceil((end.getTime() - start.getTime()) / msPerDay);
      // Ensure price is at least 0, even if diffDays is 0 or negative
      const price = diffDays > 0 ? diffDays * car.pricePerDay : 0;

      setTotalPrice(price);
      setValue("totalPrice", price, { shouldValidate: true });
    } else {
      setTotalPrice(0);
      setValue("totalPrice", 0, { shouldValidate: true });
    }
  }, [pickUpDate, dropOffDate, car.pricePerDay, setTotalPrice, setValue]);

  // --- NEW STATE FOR BOOKED DATES ---
  const [bookedDateRanges, setBookedDateRanges] = useState<BookingDateRange[]>(
    []
  );
  // --- NEW LOADING STATE FOR BOOKINGS FETCH ---
  const [isBookingsLoading, setIsBookingsLoading] = useState(true);

  // Effect to fetch existing bookings for the car
  useEffect(() => {
    const fetchBookedDates = async () => {
      if (!car._id) {
        setIsBookingsLoading(false); // No car ID means no bookings to fetch
        return;
      }
      setIsBookingsLoading(true); // Start loading
      try {
        console.log("Car id is ", car._id);
        const url = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(
          `${url}/api/v1/booking/vehicle/${car._id}`, // Make sure this is your correct backend endpoint
          { withCredentials: true }
        );
        console.log("Response", response);
        // Assuming your backend returns an array of booking objects under `data.data`
        // Filter for "pending" or "confirmed" statuses as per your booking DB structure
        const activeBookings = response.data.data.filter(
          (booking: any) =>
            booking.status === "pending" || booking.status === "confirmed"
        );

        const ranges = activeBookings.map((booking: any) => ({
          // Convert ISO strings to Date objects for comparison
          start: new Date(booking.pickUpDate),
          end: new Date(booking.dropOffDate),
        }));
        setBookedDateRanges(ranges);
      } catch (error) {
        console.error("Failed to fetch booked dates:", error);
        addToast({
          title: "Error Loading Availability",
          description: "Could not retrieve car booking information.",
          color: "danger",
        });
      } finally {
        setIsBookingsLoading(false); // End loading regardless of success or failure
      }
    };

    fetchBookedDates();
  }, [car._id]); // Re-run this effect if the car ID changes (e.g., user selects a different car)

  // --- Function to check if a date is booked ---
  const isDateBooked = (date: DateValue): boolean => {
    // If 'date' is null or undefined (though DateValue usually isn't), handle it
    if (!date) {
      return false; // Or throw an error, depending on desired behavior
    }

    // Convert DateValue to a standard Date object for comparison.
    // If it's a CalendarDateTime, use toDate(). Otherwise, toDate("UTC").
    const checkDate =
      date instanceof CalendarDateTime
        ? date.toDate("UTC")
        : date.toDate("UTC");

    // Get today's date at UTC midnight for comparison to disable past dates
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Set to midnight UTC

    // Disable dates in the past
    if (checkDate < today) {
      return true;
    }

    // Check if the date falls within any fetched booked range
    for (const range of bookedDateRanges) {
      // Check if checkDate is on or after the start date AND on or before the end date of a booked range
      if (checkDate >= range.start && checkDate <= range.end) {
        return true; // This date is booked/unavailable
      }
    }
    return false; // This date is available
  };
  const isRangeBooked = (startDateStr: string, endDateStr: string): boolean => {
    // Handle empty or invalid dates
    if (!startDateStr || !endDateStr) return false;

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Check if end date is before start date
    if (endDate < startDate) return true;

    // Check against each booked range
    for (const range of bookedDateRanges) {
      // Check if there's any overlap between the ranges
      if (
        (startDate >= range.start && startDate <= range.end) || // starts during booked range
        (endDate >= range.start && endDate <= range.end) || // ends during booked range
        (startDate <= range.start && endDate >= range.end) // completely overlaps booked range
      ) {
        return true;
      }
    }

    return false;
  };
  const onSubmit = async (data: CarRentalFormType) => {
    console.log("✅ submitted data:", data);
    if (isRangeBooked(data.pickUpDate, data.dropOffDate)) {
      addToast({
        title: "Invalid Date Range",
        description:
          "The selected date range includes unavailable dates. Please choose a different date range.",
        color: "danger",
      });
      return; // Prevent submission if the range is booked
    }
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/booking`,
        data,
        { withCredentials: true }
      );
      console.log("Booking successful:", result.data);

      addToast({
        title: "Booking Successful!",
        description: "Your car rental has been confirmed.",
        color: "success",
      });
      navigate(`/success/${result.data.data._id}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error creating booking:", error.response.data);

        let errorMessage = "An unexpected error occurred. Please try again.";
        if (error.response.status === 409) {
          errorMessage =
            error.response.data.message ||
            "This car is already booked or unavailable for the selected dates. Please choose different dates or another car.";
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }

        addToast({
          title: "Booking Failed",
          description: errorMessage,
          color: "danger",
        });
      } else {
        console.error("An unexpected error occurred:", error);
        addToast({
          title: "Error",
          description:
            "Could not connect to the server. Please check your internet connection.",
          color: "danger",
        });
      }
    }
  };

  const onError = (errors: FieldErrors<CarRentalFormType>) => {
    console.log("❌ validation errors:", errors);
    console.log("total price is ", totalPrice);
    Object.entries(errors).forEach(([fieldName, error]) => {
      const err = error as FieldError;
      const msg =
        err.message ?? (err.types ? Object.values(err.types)[0] : undefined);

      if (msg) {
        addToast({
          title: `Error in ${fieldName}`,
          description: msg,
          color: "danger",
        });
      }
    });
  };

  return (
    <Form
      validationBehavior="aria"
      className="w-full max-w-4xl flex flex-col gap-6 "
      onReset={() => reset()}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <section className="w-full flex flex-col gap-8 p-4 bg-white rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl fontbold">Billing Info</h1>
            <p className="text-xs text-neutral-400">
              Please enter your billing info
            </p>
          </div>
          <h2 className="text-xs text-neutral-400">Step 1 of 4</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Name"
                placeholder="Enter your username"
                type="text"
                isInvalid={!!errors.fullName}
                errorMessage={errors.fullName?.message}
              />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Phone Number"
                placeholder="Enter your phone number"
                type="text"
                isInvalid={!!errors.phoneNumber}
                errorMessage={errors.phoneNumber?.message}
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Address"
                placeholder="Enter your address"
                type="text"
                isInvalid={!!errors.address}
                errorMessage={errors.address?.message}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Town / City"
                placeholder="Town or City"
                type="text"
                isInvalid={!!errors.city}
                errorMessage={errors.city?.message}
              />
            )}
          />
        </div>
      </section>
      <section className="w-full flex flex-col gap-8 p-4 bg-white rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl fontbold">Rental Info</h1>
            <p className="text-xs text-neutral-400">
              Please select your rental date
            </p>
          </div>
          <h2 className="text-xs text-neutral-400">Step 2 of 4</h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center ">
            <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            Pick-Up
          </div>
          <div className="w-full grid md:grid-cols-2 gap-4">
            <Controller
              name="pickUpLocation"
              control={control}
              render={({ field }) => (
                <Select
                  className=" rounded-md"
                  label="Pick-up Location"
                  placeholder="Select a city"
                  selectedKeys={new Set([field.value])}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0];
                    field.onChange(selected);
                  }}
                  isInvalid={!!errors.pickUpLocation}
                  errorMessage={errors.pickUpLocation?.message}
                >
                  {cities.map((city) => (
                    <SelectItem key={city.key}>{city.label}</SelectItem>
                  ))}
                </Select>
              )}
            />
            <Controller
              name="pickUpDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Date"
                  value={field.value ? parseDate(field.value) : null}
                  onChange={(date: DateValue | null) => {
                    if (date) {
                      const isoString = date
                        .toDate("UTC")
                        .toISOString()
                        .split("T")[0];
                      field.onChange(isoString);
                    } else {
                      field.onChange("");
                    }
                  }}
                  isInvalid={!!errors.pickUpDate}
                  errorMessage={errors.pickUpDate?.message}
                  // --- NEW: Pass the isDateBooked function to disable unavailable dates ---
                  isDateUnavailable={isDateBooked}
                  // --- NEW: Disable date picker while bookings are loading ---
                  isDisabled={isBookingsLoading}
                  // --- NEW: Prevent selecting dates before today ---
                  minValue={parseDate(new Date().toISOString().split("T")[0])}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center ">
            <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            Drop-Off
          </div>
          <div className="w-full grid md:grid-cols-2 gap-4">
            <Controller
              name="dropOffLocation"
              control={control}
              render={({ field }) => (
                <Select
                  className="rounded-md"
                  label="Drop-off Location"
                  placeholder="Select a city"
                  selectedKeys={new Set([field.value])}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0];
                    field.onChange(selected);
                  }}
                  isInvalid={!!errors.dropOffLocation}
                  errorMessage={errors.dropOffLocation?.message}
                >
                  {cities.map((city) => (
                    <SelectItem key={city.key}>{city.label}</SelectItem>
                  ))}
                </Select>
              )}
            />
            <Controller
              name="dropOffDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Date"
                  value={field.value ? parseDate(field.value) : null}
                  onChange={(date: DateValue | null) => {
                    if (date) {
                      const isoString = date
                        .toDate("UTC")
                        .toISOString()
                        .split("T")[0];
                      field.onChange(isoString);
                    } else {
                      field.onChange("");
                    }
                  }}
                  isInvalid={!!errors.dropOffDate}
                  errorMessage={errors.dropOffDate?.message}
                  // --- NEW: Pass the isDateBooked function to disable unavailable dates ---
                  isDateUnavailable={isDateBooked}
                  // --- NEW: Disable date picker while bookings are loading ---
                  isDisabled={isBookingsLoading}
                  // --- NEW: Drop-off date should not be before the pick-up date (if one is selected) ---
                  minValue={
                    pickUpDate
                      ? parseDate(pickUpDate)
                      : parseDate(new Date().toISOString().split("T")[0])
                  }
                />
              )}
            />
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col gap-8 p-4 bg-white rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl fontbold">Confirmation</h1>
            <p className="text-xs text-neutral-400">
              We are getting to the end. Just few clicks and your rental is
              ready.
            </p>
          </div>
          <h2 className="text-xs text-neutral-400">Step 4 of 4</h2>
        </div>
        <Controller
          name="confirmationTerms"
          control={control}
          render={({ field }) => (
            <CheckboxGroup
              label="Select options"
              value={field.value}
              onValueChange={(selectedValues) => field.onChange(selectedValues)}
              isInvalid={!!errors.confirmationTerms}
              errorMessage={errors.confirmationTerms?.message}
            >
              <Checkbox value="news">
                I agree with sending marketing and newsletter emails. No Spams!
                Promised
              </Checkbox>
              <Checkbox value="terms">
                I agree with our terms, conditions and policies
              </Checkbox>
            </CheckboxGroup>
          )}
        />

        <Button
          className={`px-20 rounded-full p-4 text-white w-fit ${
            !isSubmitting ? "bg-blue-600" : "bg-blue-300"
          }`}
          disabled={isSubmitting || isBookingsLoading} // Disable if form is submitting OR bookings are loading
          type="submit"
        >
          {isLoading
            ? "Submitting..."
            : isBookingsLoading
            ? "Checking Availability..."
            : `Rent Now`}
        </Button>
        <div className="mt-8 flex items-center p-4 bg-blue-50 rounded-lg shadow-sm">
          <ShieldCheck className="text-blue-600 mr-3 w-6 h-6" />
          <div>
            <h4 className="font-semibold text-gray-800">
              All your data are safe
            </h4>
            <p className="text-sm text-gray-600">
              We are using the most advanced security to provide you the best
              experience ever.
            </p>
          </div>
        </div>
      </section>
    </Form>
  );
};

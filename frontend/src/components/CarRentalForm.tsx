import {
  addToast,
  Button,
  DatePicker,
  Form,
  Image,
  Input,
} from "@heroui/react";
import type React from "react";
import { Select, SelectItem } from "@heroui/react";
import paymentCardsimage from "../assets/paymentCards.png";
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
import { CalendarDate, parseDate } from "@internationalized/date";
import type { DateValue } from "@internationalized/date";
import type { Granularity } from "@react-types/datepicker";
import { useNavigate } from "react-router-dom";
import type { ICar } from "../types/car";
import { useEffect } from "react";
import axios from "axios";
interface carRentalProps {
  car: ICar;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  totalPrice: number;
  setPickUpDate: React.Dispatch<React.SetStateAction<string>>;
  setDropOffDate: React.Dispatch<React.SetStateAction<string>>;
}
export const CarRentalForm = ({
  car,
  setTotalPrice,
  totalPrice,
  setPickUpDate,
  setDropOffDate,
}: carRentalProps) => {
  const navigate = useNavigate();
  // const totalPrice = 80;
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
  // const totalPrice = car.pricePerDay*()
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
    formState: { errors, isLoading },
    watch,
    reset,
    setValue,
  } = useForm<CarRentalFormType>({
    resolver: zodResolver(CarRentalSchema),
    defaultValues,
  });

  // const parseExpiryDate = (value: string): CalendarDate | null => {
  //   const [month, year] = value.split("/").map(Number);
  //   if (!month || !year) return null;
  //   return new CalendarDate(2000 + year, month, 1);
  // };
  // 1. Add watch for dates
  const pickUpDate = watch("pickUpDate");
  const dropOffDate = watch("dropOffDate");
  useEffect(() => {
    // keep the parent component's state in sync
    setPickUpDate(pickUpDate);
    setDropOffDate(dropOffDate);
  }, [pickUpDate, dropOffDate, setPickUpDate, setDropOffDate]);
  // 2. Calculate total price
  // let calculatedTotalPrice = 0;
  // if (pickUpDate && dropOffDate) {
  //   const start = new Date(pickUpDate);
  //   const end = new Date(dropOffDate);
  //   const msPerDay = 1000 * 60 * 60 * 24;
  // }
  useEffect(() => {
    if (pickUpDate && dropOffDate) {
      console.log("pickup date is ", pickUpDate);
      console.log("drop off date is ", dropOffDate);
      const start = new Date(pickUpDate);
      const end = new Date(dropOffDate);
      const msPerDay = 1000 * 60 * 60 * 24;
      const diffDays = Math.ceil((end.getTime() - start.getTime()) / msPerDay);
      const price = diffDays > 0 ? diffDays * car.pricePerDay : 0;

      setTotalPrice(price); // updates parent/UI state
      setValue("totalPrice", price, {
        // updates RHF state  🟢
        shouldValidate: true, // re‑runs Zod immediately
      });
    } else {
      setTotalPrice(0);
      setValue("totalPrice", 0, { shouldValidate: true });
    }
  }, [pickUpDate, dropOffDate, car.pricePerDay, setTotalPrice, setValue]);
  // useEffect(() => {
  //   if (pickUpDate && dropOffDate) {
  //     const start = new Date(pickUpDate);
  //     const end = new Date(dropOffDate);

  //     // --- CRITICAL ADDITION: Validate Date Objects after creation ---
  //     // Check if the Date objects are valid (e.g., didn't parse to "Invalid Date")
  //     // And ensure the drop-off date is strictly after the pick-up date.
  //     if (
  //       isNaN(start.getTime()) ||
  //       isNaN(end.getTime()) ||
  //       start.getTime() >= end.getTime()
  //     ) {
  //       setTotalPrice(0);
  //       setValue("totalPrice", 0, { shouldValidate: true });
  //       return; // Exit early if dates are invalid or illogical
  //     }
  //     // --- END CRITICAL ADDITION ---

  //     const msPerDay = 1000 * 60 * 60 * 24;
  //     const diffDays = Math.ceil((end.getTime() - start.getTime()) / msPerDay);

  //     // No need for diffDays > 0 check here, as we already ensured diffDays will be positive
  //     const price = diffDays * car.pricePerDay;

  //     setTotalPrice(price); // updates parent/UI state
  //     setValue("totalPrice", price, {
  //       shouldValidate: true, // re‑runs Zod immediately
  //     });
  //   } else {
  //     // If either date is missing, reset total price
  //     setTotalPrice(0);
  //     setValue("totalPrice", 0, { shouldValidate: true });
  //   }
  // }, [pickUpDate, dropOffDate, car.pricePerDay, setTotalPrice, setValue]);

  //submit function
  // const onSubmit = (data: CarRentalFormType) => {
  //   console.log(
  //     "Form data submitted is ===================================== ",
  //     data
  //   );
  //   console.log(watch()); // inside component
  //   reset(defaultValues);
  //   navigate("/success/1");
  // };
  // Assuming you have a way to access your addToast function, e.g., from a custom hook:
  // import { useToast } from '../context/ToastContext'; // Example import

  const onSubmit = async (data: CarRentalFormType) => {
    console.log("✅ submitted data:", data);
    // If you're using a hook, you'd typically call it here:
    // const { addToast } = useToast();

    try {
      const result = await axios.post(
        "http://localhost:5000/api/v1/booking",
        data,
        { withCredentials: true }
      );
      console.log("Booking successful:", result.data);

      // Display a success toast
      // The type 'success' or 'error' depends on your toast system's implementation
      addToast({
        title: "Booking Successful!",
        description: "Your car rental has been confirmed.",
        color: "success", // Or 'success' depending on your toast system
      });
      navigate(`/success/${result.data.data._id}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error creating booking:", error.response.data);

        let errorMessage = "An unexpected error occurred. Please try again.";
        if (error.response.status === 409) {
          // More specific message for 409 Conflict
          errorMessage =
            error.response.data.message ||
            "This car is already booked or unavailable for the selected dates. Please choose different dates or another car.";
        } else if (error.response.data && error.response.data.message) {
          // Use the server's error message if available for other errors
          errorMessage = error.response.data.message;
        }

        // Display an error toast
        addToast({
          title: "Booking Failed",
          description: errorMessage,
          color: "danger", // Or 'danger' depending on your toast system
        });
      } else {
        console.error("An unexpected error occurred:", error);
        // Display a generic error toast for network issues or unhandled errors
        addToast({
          title: "Error",
          description:
            "Could not connect to the server. Please check your internet connection.",
          color: "danger",
        });
      }
    }
  };
  // 👇 second argument logs the errors when validation fails
  const onError = (errors: FieldErrors<CarRentalFormType>) => {
    console.log("❌ validation errors:", errors);
    console.log("tota price is ", totalPrice);
    Object.entries(errors).forEach(([fieldName, error]) => {
      const err = error as FieldError;

      // pick the first available message
      const msg =
        err.message ?? (err.types ? Object.values(err.types)[0] : undefined);

      if (msg) {
        addToast({
          title: `Error in ${fieldName}`,
          description: msg,
          color: "danger", // adjust to your toast API
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
        <div className="grid grid-cols-2 gap-4">
          {/* <Input
            label="Name"
            placeholder="Enter you username"
            type="text"
            {...register("name")}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
          /> */}
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
          {/* <Input
            label="Town / City"
            placeholder="Town or City"
            type="text"
            {...register("city")}
            isInvalid={!!errors.city}
            errorMessage={errors.city?.message}
          /> */}
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
          <div className="flex items-center  ">
            <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            Pick-Up
          </div>
          <div className="w-full grid grid-cols-2  gap-4">
            <Controller
              name="pickUpLocation"
              control={control}
              render={({ field }) => (
                <Select
                  className=" rounded-md"
                  label="Pick-up Location"
                  placeholder="Select a city"
                  selectedKeys={new Set([field.value])} // Use selectedKey for Heroui Select
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0]; // Get the first selected item
                    field.onChange(selected); // Pass as string
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
                        .split("T")[0]; // "YYYY-MM-DD"
                      field.onChange(isoString);
                    } else {
                      field.onChange("");
                    }
                  }}
                  isInvalid={!!errors.pickUpDate}
                  errorMessage={errors.pickUpDate?.message}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center  ">
            <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            Drop-Off
          </div>
          <div className="w-full grid grid-cols-2  gap-4">
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
                    const selected = Array.from(keys)[0]; // Get the first selected item
                    field.onChange(selected); // Pass as string
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
                        .split("T")[0]; // "YYYY-MM-DD"
                      field.onChange(isoString);
                    } else {
                      field.onChange("");
                    }
                  }}
                  isInvalid={!!errors.dropOffDate}
                  errorMessage={errors.dropOffDate?.message}
                />
              )}
            />
          </div>
        </div>
      </section>
      {/* <section className="w-full flex flex-col gap-8 p-4 bg-white rounded-xl">
        {" "}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl fontbold">Payment Info</h1>
            <p className="text-xs text-neutral-400">
              Please enter your payment method
            </p>
            <Image src={paymentCardsimage} width={200} className="-mx-2" />
          </div>
          <h2 className="text-xs text-neutral-400">Step 3 of 4</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="First Name"
                placeholder="Abdi"
                type="text"
                isInvalid={!!errors.firstName}
                errorMessage={errors.firstName?.message}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Last Name"
                placeholder="Worku"
                type="text"
                isInvalid={!!errors.lastName}
                errorMessage={errors.lastName?.message}
              />
            )}
          />

          <Controller
            name="cardNumber"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Card Number"
                placeholder="1234 **** **** ****"
                type="text"
                isInvalid={!!errors.cardNumber}
                errorMessage={errors.cardNumber?.message}
              />
            )}
          />
          <div className="w-full flex gap-2 items-center justify-between">
            <Controller
              name="expiryDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  granularity={"month" as Granularity} // 👈 disables day selection
                  label="Expiry Date"
                  value={field.value ? parseExpiryDate(field.value) : null}
                  onChange={(date) => {
                    if (!date) {
                      field.onChange("");
                      return;
                    }
                    const formatted = `${String(date.month).padStart(
                      2,
                      "0"
                    )}/${String(date.year).slice(-2)}`;
                    field.onChange(formatted);
                  }}
                  isInvalid={!!errors.expiryDate}
                  errorMessage={errors.expiryDate?.message}
                />
              )}
            />

            <Controller
              name="cvc"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="CVC"
                  placeholder="123"
                  type="text"
                  isInvalid={!!errors.cvc}
                  errorMessage={errors.cvc?.message}
                />
              )}
            />
          </div>
        </div>
      </section> */}
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
              label="Select options" // Label for the group
              value={field.value} // Current selected values from RHF
              onValueChange={(selectedValues) => field.onChange(selectedValues)} // Update RHF state
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
        {/* {errors.confirmationTerms && (
          <p style={{ color: "red", fontSize: "0.85em" }}>
            {errors.confirmationTerms.message}
          </p>
        )} */}
        <Button
          className={`px-20 rounded-full p-4  text-white w-fit ${
            !isLoading ? "bg-blue-600" : "bg-blue-300"
          }`}
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Loading..." : `Rent Now `}
        </Button>
        <div className="mt-8 flex items-center p-4 bg-blue-50 rounded-lg shadow-sm">
          {/* Shield icon, color updated to brand color z(blue-600) */}
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

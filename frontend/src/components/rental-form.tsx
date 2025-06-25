import React from "react";
// Ensure these libraries are installed via npm/yarn
import { Button } from "@heroui/react";
import { ChevronDown } from "lucide-react"; // Only needed if you use it directly in RentalProcess, otherwise keep it in sub-components

// Adjust these paths based on where RentalProcess.tsx is located relative to your components folder.
// Assuming RentalProcess.tsx is in 'src/' and sub-components are in 'src/components/'
import BillingInfoForm from "../components/BillingInfoForm";
import RentalInfoForm from "../components/RentalInfoForm";
import PaymentMethodForm from "../components/PaymentMethodForm";
import ConfirmationForm from "../components/ConfirmationForm";

// Define combined form data types
interface BillingInfoFormData {
  name: string;
  phoneNumber: string;
  address: string;
  townCity: string;
}

interface RentalInfoFormData {
  pickUpLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  dropOffLocation: string;
  dropOffDate: string;
  dropOffTime: string;
}

interface CreditCardInfo {
  cardNumber: string;
  expirationDate: string;
  cardHolder: string;
  cvc: string;
}

type PaymentMethodType = "creditCard" | "paypal" | "bitcoin";

interface PaymentFormData {
  paymentMethod: PaymentMethodType;
  creditCardInfo: CreditCardInfo;
}

interface ConfirmationFormData {
  agreedMarketing: boolean;
  agreedTerms: boolean;
}

// Full type for the combined form data
interface CombinedFormData
  extends BillingInfoFormData,
    RentalInfoFormData,
    PaymentFormData,
    ConfirmationFormData {}

const RentalProcess: React.FC = () => {
  // Single state to hold all form data
  const [formData, setFormData] = React.useState<CombinedFormData>({
    // Initialize all fields with default values to ensure no undefined states
    name: "",
    phoneNumber: "",
    address: "",
    townCity: "",
    pickUpLocation: "",
    pickUpDate: "",
    pickUpTime: "",
    dropOffLocation: "",
    dropOffDate: "",
    dropOffTime: "",
    paymentMethod: "creditCard", // Default payment method
    creditCardInfo: {
      cardNumber: "",
      expirationDate: "",
      cardHolder: "",
      cvc: "",
    },
    agreedMarketing: false,
    agreedTerms: false,
  });

  // Generic handler to update any field in the combined formData
  // This function is passed down to child components
  const handleFormChange = (
    field: keyof CombinedFormData,
    value: any, // Using 'any' for flexibility, can be more specific if needed
    nestedField?: keyof CreditCardInfo // Optional for handling nested objects like creditCardInfo
  ) => {
    setFormData((prevData) => {
      if (nestedField) {
        // If a nestedField is provided, it means we're updating a property within a nested object
        return {
          ...prevData,
          [field]: {
            ...(prevData[field] as any), // Cast to any to access nested properties dynamically
            [nestedField]: value,
          },
        };
      } else {
        // Otherwise, update a top-level field
        return {
          ...prevData,
          [field]: value,
        };
      }
    });
  };

  // Handler for the final form submission
  const handleSubmitAll = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default browser form submission behavior

    console.log("All Form Data Submitted:", formData);
    // In a real application, this is where you would send the 'formData'
    // to your backend server or perform other final actions.
    alert("Rental Confirmed! Check console for full data."); // Temporary alert for demonstration

    // Optionally, reset the form data after submission, or navigate the user away
    // setFormData(initialState); // You'd define an initialState object for this
  };

  return (
    // Main container for the entire rental process form
    <div className="w-full flex flex-col items-center justify-center min-h-screen  py-4 ">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8 space-y-8">
        {/* Main title of the rental application form. */}
        {/* Text color updated to brand color (blue-700). */}
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Complete Your Rental
        </h1>

        {/* The single <form> HTML element that encloses all the sections of the form.
            Its onSubmit event handler will be called when the final "Confirm Rental" button is clicked. */}
        <form onSubmit={handleSubmitAll} className="space-y-10">
          {/* Section for Billing Information */}
          <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
            {/* Header for the Billing Information section. */}
            {/* Text color updated to brand color (blue-600). */}
            <h2 className="text-2xl font-semibold mb-6 text-blue-600 border-b pb-3">
              Billing Information
            </h2>
            {/* The BillingInfoForm component, passed its relevant data slice and the global change handler. */}
            <BillingInfoForm
              value={{
                name: formData.name,
                phoneNumber: formData.phoneNumber,
                address: formData.address,
                townCity: formData.townCity,
              }}
              onChange={
                (field, val) => handleFormChange(field, val) // Pass field and value directly
              }
            />
          </section>

          {/* Section for Rental Information (Pick-up and Drop-off details) */}
          <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
            {/* Header for the Rental Details section. */}
            {/* Text color updated to brand color (blue-600). */}
            <h2 className="text-2xl font-semibold mb-6 text-blue-600 border-b pb-3">
              Rental Details
            </h2>
            {/* The RentalInfoForm component, passed its relevant data slice and the global change handler. */}
            <RentalInfoForm
              value={{
                pickUpLocation: formData.pickUpLocation,
                pickUpDate: formData.pickUpDate,
                pickUpTime: formData.pickUpTime,
                dropOffLocation: formData.dropOffLocation,
                dropOffDate: formData.dropOffDate,
                dropOffTime: formData.dropOffTime,
              }}
              onChange={
                (field, val) => handleFormChange(field, val) // Pass field and value directly
              }
            />
          </section>

          {/* Section for Payment Method Selection and Details */}
          {/* <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
           
            <h2 className="text-2xl font-semibold mb-6 text-blue-600 border-b pb-3">
              Payment Method
            </h2>
           
            <PaymentMethodForm
              value={{
                paymentMethod: formData.paymentMethod,
                creditCardInfo: formData.creditCardInfo,
              }}
              onChange={handleFormChange}
            />
          </section> */}

          {/* Section for Confirmation Checkboxes (Marketing and Terms) */}
          <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
            {/* Header for the Confirmation section. */}
            {/* Text color updated to brand color (blue-600). */}
            <h2 className="text-2xl font-semibold mb-6 text-blue-600 border-b pb-3">
              Confirm Your Order
            </h2>
            {/* The ConfirmationForm component, passed its relevant data slice and the global change handler. */}
            <ConfirmationForm
              value={{
                agreedMarketing: formData.agreedMarketing,
                agreedTerms: formData.agreedTerms,
              }}
              onChange={
                (field, val) => handleFormChange(field, val) // Pass field and value directly
              }
            />
          </section>

          {/* Final Submit Button for the entire form.
              This button will trigger the onSubmit event of the parent <form> element. */}
          <div className="flex justify-center mt-8">
            <Button
              type="submit" // Essential for triggering the form's onSubmit handler
              color="primary" // Assumes @heroui/react's 'primary' color is configured to be blue.
              // Added enhanced Tailwind classes for better visual appeal on the button.
              className="py-3 px-8 text-lg rounded-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Pay Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentalProcess;

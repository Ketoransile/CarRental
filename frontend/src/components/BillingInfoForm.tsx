import React from "react";
// IMPORTANT: Ensure '@heroui/react' is installed in your project.
import { Input } from "@heroui/react";
import { ChangeEvent } from "react";

// Define the shape of the data specific to the Billing Info form section
interface BillingInfoFormData {
  name: string;
  phoneNumber: string;
  address: string;
  townCity: string;
}

// Define the props for the BillingInfoForm component
interface BillingInfoFormProps {
  // 'value' prop receives the current data for this section from the parent component
  value: BillingInfoFormData;
  // 'onChange' prop is a callback function to send updates back to the parent
  // It takes the field name (keyof BillingInfoFormData) and the new value (string)
  // This allows the parent component to manage the overall form state.
  onChange: (field: keyof BillingInfoFormData, val: string) => void;
}

// BillingInfoForm is a functional React component
const BillingInfoForm: React.FC<BillingInfoFormProps> = ({
  value,
  onChange,
}) => {
  // handleChange is a local event handler for input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    // Call the parent's onChange prop, passing the name of the input
    // and its new value. The 'name' attribute of the Input component
    // should match a key in BillingInfoFormData.
    onChange(name as keyof BillingInfoFormData, inputValue);
  };

  return (
    // The <form> tag and handleSubmit are removed as the main form is now in RentalProcess.tsx.
    // This component now acts as a section of the larger single form.
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Input for Name */}
      <Input
        fullWidth
        label="Name"
        placeholder="Your full name"
        name="name" // 'name' attribute should match a key in BillingInfoFormData
        value={value.name} // Value is controlled by the parent's state
        onChange={handleChange} // Changes are handled locally and then dispatched to parent
        required // HTML5 required attribute for basic validation
        className="rounded-md" // Tailwind class for rounded corners
      />
      {/* Input for Phone Number */}
      <Input
        fullWidth
        label="Phone Number"
        placeholder="Your phone number"
        name="phoneNumber"
        value={value.phoneNumber}
        onChange={handleChange}
        type="tel" // Semantic type for telephone number
        required
        className="rounded-md"
      />
      {/* Input for Address, spanning two columns on medium screens and up */}
      <Input
        fullWidth
        label="Address"
        placeholder="Your address"
        name="address"
        value={value.address}
        onChange={handleChange}
        className="md:col-span-2 rounded-md" // Spans two columns on larger screens
        required
      />
      {/* Input for Town / City */}
      <Input
        fullWidth
        label="Town / City"
        placeholder="Your town or city"
        name="townCity"
        value={value.townCity}
        onChange={handleChange}
        required
        className="rounded-md"
      />
    </div>
  );
};

export default BillingInfoForm;

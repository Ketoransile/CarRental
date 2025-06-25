import React from "react";
// IMPORTANT: Ensure '@heroui/react' is installed in your project.
// This is where the 'Input' component comes from.
import { Input } from "@heroui/react";
// This is where the 'ChevronDown' icon comes from. Ensure 'lucide-react' is also installed.
import { ChevronDown } from "lucide-react";
// Type for handling input change events.
import { ChangeEvent } from "react";

// Define the shape of the data specific to the Rental Info form section.
// This interface ensures type safety for the data handled by this component.
interface RentalInfoFormData {
  pickUpLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  dropOffLocation: string;
  dropOffDate: string;
  dropOffTime: string;
}

// Define the props for the RentalInfoForm component.
interface RentalInfoFormProps {
  // The 'value' prop receives the current state data for this form section
  // from the parent component (RentalProcess.tsx).
  value: RentalInfoFormData;
  // The 'onChange' prop is a callback function that this component calls
  // to send updated data back to its parent. This is how data flows upwards.
  // It expects the name of the field being changed (matching a key in RentalInfoFormData)
  // and the new string value of that field.
  onChange: (field: keyof RentalInfoFormData, val: string) => void;
}

// RentalInfoForm is a functional React component.
// It is designed to be a "controlled component" where its state is managed by its parent.
const RentalInfoForm: React.FC<RentalInfoFormProps> = ({ value, onChange }) => {
  // 'handleChange' is a local event handler for when any input field in this form section changes.
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Destructure 'name' (the input's name attribute) and 'value' (the input's current value) from the event target.
    const { name, value: inputValue } = e.target;
    // Call the 'onChange' prop from the parent, passing the input's name
    // and its new value. This updates the parent's overall form state.
    // The 'name as keyof RentalInfoFormData' cast ensures type compatibility.
    onChange(name as keyof RentalInfoFormData, inputValue);
  };

  return (
    // This component no longer contains its own <form> tag or handleSubmit function,
    // as it is now part of a larger single form managed by RentalProcess.tsx.
    // It's effectively a visual section within that larger form.
    <div>
      {/* Section for Pick-Up Details */}
      <h3 className="text-lg font-medium mb-3 flex items-center text-gray-700">
        {/* Small circular indicator for visual grouping, updated to brand color blue-600 */}
        <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span> Pick-Up
        Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Input for Pick-Up Location */}
        <Input
          fullWidth // Make the input span the full width of its container
          label="Location" // Label displayed above the input
          placeholder="Select your city" // Placeholder text
          name="pickUpLocation" // Corresponds to a key in RentalInfoFormData
          value={value.pickUpLocation} // Value is controlled by parent's state
          onChange={handleChange} // Calls local handleChange on input change
          endContent={<ChevronDown className="text-gray-400" />} // Icon for dropdown visual
          required // HTML5 validation: field must not be empty
          className="rounded-md" // Tailwind CSS for rounded corners
        />
        {/* Input for Pick-Up Date */}
        <Input
          fullWidth
          label="Date"
          placeholder="Select your date"
          name="pickUpDate"
          value={value.pickUpDate}
          onChange={handleChange}
          type="date" // HTML5 date input type
          required
          className="rounded-md"
        />
        {/* Input for Pick-Up Time */}
        <Input
          fullWidth
          label="Time"
          placeholder="Select your time"
          name="pickUpTime"
          value={value.pickUpTime}
          onChange={handleChange}
          type="time" // HTML5 time input type
          required
          className="rounded-md"
        />
      </div>

      {/* Section for Drop-Off Details */}
      <h3 className="text-lg font-medium mb-3 flex items-center text-gray-700">
        {/* Small circular indicator, updated to brand color blue-600 */}
        <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span> Drop-Off
        Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input for Drop-Off Location */}
        <Input
          fullWidth
          label="Location"
          placeholder="Select your city"
          name="dropOffLocation"
          value={value.dropOffLocation}
          onChange={handleChange}
          endContent={<ChevronDown className="text-gray-400" />}
          required
          className="rounded-md"
        />
        {/* Input for Drop-Off Date */}
        <Input
          fullWidth
          label="Date"
          placeholder="Select your date"
          name="dropOffDate"
          value={value.dropOffDate}
          onChange={handleChange}
          type="date"
          required
          className="rounded-md"
        />
        {/* Input for Drop-Off Time */}
        <Input
          fullWidth
          label="Time"
          placeholder="Select your time"
          name="dropOffTime"
          value={value.dropOffTime}
          onChange={handleChange}
          type="time"
          required
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default RentalInfoForm;

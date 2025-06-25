import React from "react";
// IMPORTANT: This import requires the '@heroui/react' package to be installed in your project.
import { Checkbox } from "@heroui/react";
// ShieldCheck icon for visual element. Ensure 'lucide-react' is installed.
import { ShieldCheck } from "lucide-react";
import { ChangeEvent } from "react"; // For handling checkbox change events

// Define the shape of the data specific to the Confirmation form section
interface ConfirmationFormData {
  agreedMarketing: boolean;
  agreedTerms: boolean;
}

// Define the props for the ConfirmationForm component
interface ConfirmationFormProps {
  // 'value' prop receives the current state data for this form section from the parent.
  value: ConfirmationFormData;
  // 'onChange' prop is a callback to send updates back to the parent.
  // It takes the field name (keyof ConfirmationFormData) and the new boolean value.
  onChange: (field: keyof ConfirmationFormData, val: boolean) => void;
}

// ConfirmationForm is a functional React component for user agreements.
const ConfirmationForm: React.FC<ConfirmationFormProps> = ({
  value,
  onChange,
}) => {
  // Handles changes for the 'agreedMarketing' checkbox
  const handleMarketingChange = (checked: boolean) => {
    // Call the parent's onChange prop, updating the 'agreedMarketing' field.
    onChange("agreedMarketing", checked);
  };

  // Handles changes for the 'agreedTerms' checkbox
  const handleTermsChange = (checked: boolean) => {
    // Call the parent's onChange prop, updating the 'agreedTerms' field.
    onChange("agreedTerms", checked);
  };

  return (
    // The <form> tag and handleSubmit are removed as the main form is now in RentalProcess.tsx.
    // This component acts as a section within that larger single form.
    <div>
      <p className="text-gray-600 mb-6">
        We are getting to the end. Just a few clicks and your rental is ready!
      </p>

      <div className="mb-8 space-y-4">
        {/* Checkbox for marketing consent */}
        <Checkbox
          // 'checked' prop now controlled by parent's state
          checked={value.agreedMarketing}
          // 'onValueChange' prop sends the new boolean value back to parent
          onValueChange={handleMarketingChange}
          color="primary" // Changed to primary for brand color consistency (assuming Heroui's primary is blue)
        >
          I agree with sending marketing and newsletter emails. No spam,
          promised!
        </Checkbox>
        {/* Checkbox for terms and conditions consent */}
        <Checkbox
          // 'checked' prop now controlled by parent's state
          checked={value.agreedTerms}
          // 'onValueChange' prop sends the new boolean value back to parent
          onValueChange={handleTermsChange}
          color="primary" // Changed to primary for brand color consistency
          required // HTML5 required attribute for validation, parent form will handle this.
        >
          I agree with our terms and conditions and privacy policy.{" "}
          <span className="text-red-500">*</span>
        </Checkbox>
      </div>

      {/* The "Rent Now" button is removed from here as the main submit button is in RentalProcess.tsx */}

      <div className="mt-8 flex items-center p-4 bg-blue-50 rounded-lg shadow-sm">
        {/* Shield icon, color updated to brand color (blue-600) */}
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
    </div>
  );
};

export default ConfirmationForm;

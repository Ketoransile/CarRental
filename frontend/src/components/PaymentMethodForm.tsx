import React from "react";
// IMPORTANT: This import requires the '@heroui/react' package to be installed in your project.
import { Input, RadioGroup, Radio } from "@heroui/react";
import { ChangeEvent } from "react";

// Type definitions for Credit Card Information
interface CreditCardInfo {
  cardNumber: string;
  expirationDate: string;
  cardHolder: string;
  cvc: string;
}

// Union type for supported payment methods
type PaymentMethodType = "creditCard" | "paypal" | "bitcoin";

// Type definition for the data managed by this form section
interface PaymentFormData {
  paymentMethod: PaymentMethodType;
  creditCardInfo: CreditCardInfo;
}

// Props for the PaymentMethodForm component
interface PaymentMethodFormProps {
  // 'value' prop receives the current state data for this form section from the parent.
  value: PaymentFormData;
  // 'onChange' prop is a callback to send updates back to the parent.
  // It handles both top-level fields (paymentMethod) and nested fields (creditCardInfo properties).
  onChange: (
    field: keyof PaymentFormData,
    val: string | CreditCardInfo, // 'val' can be a string for method or an object for nested info
    nestedField?: keyof CreditCardInfo // Optional for updating nested properties
  ) => void;
}

// PaymentMethodForm is a functional React component for handling payment details.
const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  value,
  onChange,
}) => {
  // Handles changes to the selected payment method (Credit Card, PayPal, Bitcoin)
  const handlePaymentMethodChange = (selectedMethod: string) => {
    // Pass the top-level field 'paymentMethod' and its new value back to the parent
    onChange("paymentMethod", selectedMethod as PaymentMethodType);
  };

  // Handles changes to individual credit card input fields
  const handleCreditCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    // Pass the top-level field 'creditCardInfo', the new input value,
    // and the specific 'name' of the nested field being updated.
    onChange("creditCardInfo", inputValue, name as keyof CreditCardInfo);
  };

  return (
    // This component no longer has its own <form> tag or handleSubmit.
    // It's a section within the main <form> managed by RentalProcess.tsx.
    <div>
      {/* RadioGroup for selecting the payment method */}
      <RadioGroup
        label="Select Payment Method" // Label for the radio group
        value={value.paymentMethod} // Value is controlled by parent state
        onValueChange={handlePaymentMethodChange} // Updates parent state on change
        className="mb-8 space-y-4" // Tailwind classes for spacing
      >
        {/* Radio option for Credit Card */}
        <Radio
          value="creditCard"
          className="p-4 border border-gray-200 rounded-lg flex items-center justify-between"
        >
          <span className="font-medium text-gray-800">Credit Card</span>
          <div className="flex items-center space-x-2">
            {/* Placeholder images for card logos. Replace with actual SVGs or local assets if available. */}
            <img
              src="https://placehold.co/30x20/007bff/ffffff?text=Visa"
              alt="Visa"
              className="rounded-sm"
            />
            <img
              src="https://placehold.co/30x20/ff5700/ffffff?text=MC"
              alt="Mastercard"
              className="rounded-sm"
            />
          </div>
        </Radio>
        {/* Conditional rendering for Credit Card input fields */}
        {value.paymentMethod === "creditCard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8 pt-4 pb-4 border border-blue-200 rounded-lg bg-blue-50/50">
            <Input
              fullWidth
              label="Card Number"
              placeholder="XXXX XXXX XXXX XXXX"
              name="cardNumber"
              value={value.creditCardInfo.cardNumber}
              onChange={handleCreditCardChange}
              type="text"
              maxLength={19}
              required
              className="rounded-md"
            />
            <Input
              fullWidth
              label="Expiration Date"
              placeholder="MM/YY"
              name="expirationDate"
              value={value.creditCardInfo.expirationDate}
              onChange={handleCreditCardChange}
              type="text"
              maxLength={5} // MM/YY format needs 5 characters
              required
              className="rounded-md"
            />
            <Input
              fullWidth
              label="Card Holder"
              placeholder="Card holder name"
              name="cardHolder"
              value={value.creditCardInfo.cardHolder}
              onChange={handleCreditCardChange}
              type="text"
              required
              className="md:col-span-2 rounded-md" // Spans two columns
            />
            <Input
              fullWidth
              label="CVC"
              placeholder="XXX"
              name="cvc"
              value={value.creditCardInfo.cvc}
              onChange={handleCreditCardChange}
              type="password" // Use password type for CVC
              maxLength={4}
              required
              className="rounded-md"
            />
          </div>
        )}

        {/* Radio option for PayPal */}
        <Radio
          value="paypal"
          className="p-4 border border-gray-200 rounded-lg flex items-center justify-between"
        >
          <span className="font-medium text-gray-800">PayPal</span>
          {/* Placeholder image for PayPal logo */}
          <img
            src="https://placehold.co/60x20/003087/ffffff?text=PayPal"
            alt="PayPal"
            className="rounded-sm"
          />
        </Radio>
        {/* Message for PayPal if selected */}
        {value.paymentMethod === "paypal" && (
          <p className="text-blue-700 bg-blue-50 p-3 rounded-md mt-2">
            You will be redirected to PayPal to complete your payment.
          </p>
        )}

        {/* Radio option for Bitcoin */}
        <Radio
          value="bitcoin"
          className="p-4 border border-gray-200 rounded-lg flex items-center justify-between"
        >
          <span className="font-medium text-gray-800">Bitcoin</span>
          {/* Placeholder image for Bitcoin logo */}
          <img
            src="https://placehold.co/60x20/F7931A/ffffff?text=Bitcoin"
            alt="Bitcoin"
            className="rounded-sm"
          />
        </Radio>
        {/* Message for Bitcoin if selected */}
        {value.paymentMethod === "bitcoin" && (
          <p className="text-blue-700 bg-blue-50 p-3 rounded-md mt-2">
            Scan the QR code or send Bitcoin to the address provided.
          </p>
        )}
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodForm;

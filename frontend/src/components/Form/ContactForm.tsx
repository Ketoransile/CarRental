import { useActionState } from "react";
import { submitMessage } from "../../actions/contactFormAction";
import type { ActionResponse } from "../../types/contactFormType";
import { Button } from "@heroui/react";

const initialState: ActionResponse = {
  success: false,
  message: "",
};
export function ContactForm() {
  const [state, action, isPending] = useActionState(
    submitMessage,
    initialState
  );
  return (
    <form
      action={action}
      className="w-full max-w-lg flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md z-10"
    >
      <div className="text-2xl font-bold text-gray-800 mb-4">
        We'd love to hear from you.
        <span>Let's get in touch.</span>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="fullName" className="text-sm text-gray-700 font-medium">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          defaultValue={state.inputs?.fullName}
          placeholder="John Doe"
          required
          className="p-3 border border-gray-300 rounded-md text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {state?.errors?.fullName && (
          <p id="fullName-error" className="text-sm text-red-500">
            {state.errors.fullName[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm text-gray-700 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={state.inputs?.email}
          placeholder="you@example.com"
          required
          className="p-3 border border-gray-300 rounded-md text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />{" "}
        {state?.errors?.email && (
          <p id="email-error" className="text-sm text-red-500">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="phoneNumber"
          className="text-sm text-gray-700 font-medium"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          defaultValue={state.inputs?.phoneNumber}
          placeholder="(123) 456-7890"
          className="p-3 border border-gray-300 rounded-md text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {state?.errors?.phoneNumber && (
          <p id="phoneNumber-error" className="text-sm text-red-500">
            {state.errors.phoneNumber[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm text-gray-700 font-medium">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          defaultValue={state.inputs?.message}
          placeholder="Tell us about your rental needs, preferred car type, or any special requests."
          className="min-h-[100px] p-3 border border-gray-300 rounded-md text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
        ></textarea>{" "}
        {state?.errors?.message && (
          <p id="message-error" className="text-sm text-red-500">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      <div className="flex gap-4 justify-end">
        <Button
          type="submit"
          className="px-6 py-3 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
        >
          {isPending ? "Loading..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}

// import { useActionState } from "react";
// import { submitMessage } from "../../actions/contactFormAction";
// import type { ActionResponse } from "../../types/contactFormType";
// import { Button } from "@heroui/react";

// const initialState: ActionResponse = {
//   success: false,
//   message: "",
// };
// export function ContactForm() {
//   const [state, action, isPending] = useActionState(
//     submitMessage,
//     initialState
//   );
//   return (
//     <form
//       action={action}
//       className="w-full max-w-lg flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md z-10"
//     >
//       <div className="text-2xl font-bold text-gray-800 mb-4">
//         We'd love to hear from you.
//         <span>Let's get in touch.</span>
//       </div>

//       <div className="flex flex-col gap-1">
//         <label htmlFor="fullName" className="text-sm text-gray-700 font-medium">
//           Full Name
//         </label>
//         <input
//           type="text"
//           id="fullName"
//           name="fullName"
//           defaultValue={state.inputs?.fullName}
//           placeholder="John Doe"
//           required
//           className="p-3 border border-gray-300 rounded-md text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         />
//         {state?.errors?.fullName && (
//           <p id="fullName-error" className="text-sm text-red-500">
//             {state.errors.fullName[0]}
//           </p>
//         )}
//       </div>

//       <div className="flex flex-col gap-1">
//         <label htmlFor="email" className="text-sm text-gray-700 font-medium">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           defaultValue={state.inputs?.email}
//           placeholder="you@example.com"
//           required
//           className="p-3 border border-gray-300 rounded-md text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         />{" "}
//         {state?.errors?.email && (
//           <p id="email-error" className="text-sm text-red-500">
//             {state.errors.email[0]}
//           </p>
//         )}
//       </div>

//       <div className="flex flex-col gap-1">
//         <label
//           htmlFor="phoneNumber"
//           className="text-sm text-gray-700 font-medium"
//         >
//           Phone Number
//         </label>
//         <input
//           type="tel"
//           id="phoneNumber"
//           name="phoneNumber"
//           defaultValue={state.inputs?.phoneNumber}
//           placeholder="(123) 456-7890"
//           className="p-3 border border-gray-300 rounded-md text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         />
//         {state?.errors?.phoneNumber && (
//           <p id="phoneNumber-error" className="text-sm text-red-500">
//             {state.errors.phoneNumber[0]}
//           </p>
//         )}
//       </div>

//       <div className="flex flex-col gap-1">
//         <label htmlFor="message" className="text-sm text-gray-700 font-medium">
//           Your Message
//         </label>
//         <textarea
//           id="message"
//           name="message"
//           required
//           defaultValue={state.inputs?.message}
//           placeholder="Tell us about your rental needs, preferred car type, or any special requests."
//           className="min-h-[100px] p-3 border border-gray-300 rounded-md text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
//         ></textarea>{" "}
//         {state?.errors?.message && (
//           <p id="message-error" className="text-sm text-red-500">
//             {state.errors.message[0]}
//           </p>
//         )}
//       </div>

//       <div className="flex gap-4 justify-end">
//         <Button
//           type="submit"
//           className="px-6 py-3 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
//         >
//           {isPending ? "Loading..." : "Submit"}
//         </Button>
//       </div>
//     </form>
//   );
// }
import { useActionState } from "react";
import { submitMessage } from "../../actions/contactFormAction";
import type { ActionResponse } from "../../types/contactFormType";
import { Button } from "@heroui/react";
import { FaPaperPlane } from "react-icons/fa";

const initialState: ActionResponse = { success: false, message: "" };

export function ContactForm() {
  const [state, action, isPending] = useActionState(
    submitMessage,
    initialState
  );

  return (
    <form
      action={action}
      className="w-full bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100/50 relative z-10"
    >
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900">Send us a Message</h3>
        <p className="text-sm text-gray-500 mt-1">We'll get back to you within 24 hours.</p>
      </div>

      <div className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5 hover:group">
            <label htmlFor="fullName" className="text-sm font-semibold text-gray-700 ml-1">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="John Doe"
              defaultValue={state.inputs?.fullName}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-800 transition-all 
                         focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none placeholder:text-gray-400"
            />
            {state?.errors?.fullName && (
              <p className="text-xs text-red-500 font-medium ml-1">{state.errors.fullName[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700 ml-1">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="(123) 456-7890"
              defaultValue={state.inputs?.phoneNumber}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-800 transition-all 
                         focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none placeholder:text-gray-400"
            />
            {state?.errors?.phoneNumber && (
              <p className="text-xs text-red-500 font-medium ml-1">{state.errors.phoneNumber[0]}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700 ml-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            defaultValue={state.inputs?.email}
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-800 transition-all 
                         focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none placeholder:text-gray-400"
          />
          {state?.errors?.email && (
            <p className="text-xs text-red-500 font-medium ml-1">{state.errors.email[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-semibold text-gray-700 ml-1">
            How can we help?
          </label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="Tell us about your rental needs or questions..."
            defaultValue={state.inputs?.message}
            className="w-full min-h-[140px] resize-y rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-800 transition-all 
                         focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none placeholder:text-gray-400"
          />
          {state?.errors?.message && (
            <p className="text-xs text-red-500 font-medium ml-1">{state.errors.message[0]}</p>
          )}
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isPending}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-[0.99]"
          >
            {isPending ? "Sending Message..." : <span className="flex items-center gap-2">Send Message <FaPaperPlane size={12} /></span>}
          </Button>
        </div>
      </div>
    </form>
  );
}

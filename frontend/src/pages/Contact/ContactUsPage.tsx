// import { MdEmail, MdPhone } from "react-icons/md";
// import { ContactForm } from "../../components/Form/ContactForm";
// export const ContactUsPage = () => {
//   return (
//     <div className="min-h-screen w-full pt-10 grid grid-cols-2 items-start justify-between">
//       <div className="sticky top-32 flex flex-col items-start gap-2 ">
//         <h1 className="text-2xl font-bold">Contact Us</h1>
//         <p className="text-md  text-neutral-500 max-w-md">
//           Have questions or need assistance? We're here to help. Reach out to us
//           anytime and we'll get back to you as soon as possible.
//         </p>
//         <div className="flex items-center gap-2">
//           <MdEmail size={20} />
//           <p>abdisileshi123@gmail.com</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <MdPhone size={20} />
//           <p>+251-988-73-46-32</p>
//         </div>
//       </div>
//       <div className="">
//         <ContactForm />
//       </div>
//     </div>
//   );
// };
import { MdEmail, MdPhone } from "react-icons/md";
import { ContactForm } from "../../components/Form/ContactForm";

/** Contact‑us screen: info on the left (desktop) / top (mobile) and form */
export const ContactUsPage = () => {
  return (
    <div
      className="min-h-screen w-full px-4 pt-12 pb-20
                 md:px-8 lg:px-16
                 grid gap-10
                 md:grid-cols-2"
    >
      {/* ------------- info panel ------------- */}
      <aside className="flex flex-col gap-4 md:sticky md:top-32">
        <h1 className="text-3xl font-bold">Contact&nbsp;Us</h1>

        <p className="max-w-md text-base text-neutral-600">
          Have questions or need assistance? We’re here to help. Reach out
          anytime and we’ll get back to you as soon as possible.
        </p>

        <div className="mt-2 flex flex-col gap-2 text-neutral-700">
          <div className="flex items-center gap-2">
            <MdEmail size={20} />
            <span>abdisileshi123@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MdPhone size={20} />
            <span>+251&nbsp;988&nbsp;73&nbsp;46&nbsp;32</span>
          </div>
        </div>
      </aside>

      {/* ------------- form panel ------------- */}
      <section className="md:pl-8">
        <ContactForm />
      </section>
    </div>
  );
};

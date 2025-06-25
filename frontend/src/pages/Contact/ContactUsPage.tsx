import { MdEmail, MdPhone } from "react-icons/md";
import { ContactForm } from "../../components/Form/ContactForm";
export const ContactUsPage = () => {
  return (
    <div className="min-h-screen w-full pt-10 grid grid-cols-2 items-start justify-between">
      <div className="sticky top-32 flex flex-col items-start gap-2 ">
        <h1 className="text-2xl font-bold">Contact Us</h1>
        <p className="text-md  text-neutral-500 max-w-md">
          Have questions or need assistance? We're here to help. Reach out to us
          anytime and we'll get back to you as soon as possible.
        </p>
        <div className="flex items-center gap-2">
          <MdEmail size={20} />
          <p>abdisileshi123@gmail.com</p>
        </div>
        <div className="flex items-center gap-2">
          <MdPhone size={20} />
          <p>+251-988-73-46-32</p>
        </div>
      </div>
      <div className="">
        <ContactForm />
      </div>
    </div>
  );
};

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
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { ContactForm } from "../../components/Form/ContactForm";
import { motion } from "framer-motion";

export const ContactUsPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50/50">
      <div className="container mx-auto px-4 py-16 md:px-8 lg:px-16 lg:py-24 grid gap-16 lg:grid-cols-2 items-start">

        {/* ------------- info panel ------------- */}
        <motion.aside
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8 md:sticky md:top-32"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Let's Start a <br />
              <span className="text-blue-600">Conversation</span>
            </h1>
            <p className="max-w-md text-lg text-gray-500 leading-relaxed">
              Have questions about your rental? Need assistance with a booking?
              Our team is ready to help you hit the road with confidence.
            </p>
          </div>

          <div className="flex flex-col gap-6 p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <MdEmail size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email Us</h3>
                <p className="text-gray-500 text-sm">abdisileshi123@gmail.com</p>
                <p className="text-gray-400 text-xs mt-1">We usually reply within 24 hours.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <MdPhone size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Call Us</h3>
                <p className="text-gray-500 text-sm">+251 988 73 46 32</p>
                <p className="text-gray-400 text-xs mt-1">Mon-Fri from 8am to 6pm.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                <MdLocationOn size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Visit Us</h3>
                <p className="text-gray-500 text-sm">Addis Ababa, Ethiopia</p>
                <p className="text-gray-400 text-xs mt-1">Come say hello at our HQ.</p>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* ------------- form panel ------------- */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

          <ContactForm />
        </motion.section>
      </div>
    </div>
  );
};

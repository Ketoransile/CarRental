// import { Button, Input } from "@heroui/react";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaInstagram,
//   FaLinkedinIn,
// } from "react-icons/fa";
// export const Footer = () => {
//   return (
//     <div className="w-full flex flex-col gap-10 items-start py-10 px-4 md:px-6 lg:px-10  xl:px-20 pt-32">
//       <div className="w-full flex items-start justify-between  border-b-2 border-neutral-300 pb-10">
//         <p className="text-2xl max-w-lg font-bold text-black">
//           Whether it's a weekend getaway or a business trip, we’ve got the
//           perfect ride to get you there in comfort and style.
//         </p>
//         <div className="flex flex-col gap-2">
//           <h1 className="font-bold">About</h1>
//           <h2>How it Works</h2>
//           <h2>Featured</h2>
//           <h2>Partnership</h2>
//           <h2>Business Relation</h2>
//         </div>
//         <div className="flex flex-col gap-2">
//           <h1 className="font-bold">Community</h1>
//           <h2>Events</h2>
//           <h2>Blog</h2>
//           <h2>Podcast</h2>
//           <h2>Invite a Friend</h2>
//         </div>
//         <div className="flex flex-col gap-2">
//           <h1 className="font-bold">Newsletter</h1>
//           <div className="flex items-center gap-2">
//             <Input placeholder="Enter Your Email" />
//             <Button className="bg-blue-600 px-4 rounded-xl text-white ">
//               Send
//             </Button>
//           </div>
//         </div>
//       </div>
//       <div className="w-full flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <FaFacebookF className="text-[#1877F2]" size={20} />{" "}
//           {/* Facebook Blue */}
//           <FaTwitter className="text-[#1DA1F2]" size={20} />{" "}
//           {/* Twitter Blue */}
//           <FaInstagram className="text-[#E4405F]" size={20} />{" "}
//           {/* Instagram Pink */}
//           <FaLinkedinIn className="text-[#0077B5]" size={20} />{" "}
//           {/* LinkedIn Blue */}
//         </div>
//         <div className="flex items-center gap-8">
//           <p>&copy;All Rights Reserverd</p>
//           <p>Privacy & Policy</p>
//           <p>Terms & Conditions</p>
//         </div>
//       </div>
//     </div>
//   );
// };
import { Button, Input } from "@heroui/react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { motion } from "framer-motion";

export const Footer = () => {
  const socialLinks = [
    {
      icon: <FaFacebookF size={18} />,
      color: "text-[#1877F2]",
      label: "Facebook",
    },
    {
      icon: <FaTwitter size={18} />,
      color: "text-[#1DA1F2]",
      label: "Twitter",
    },
    {
      icon: <FaInstagram size={18} />,
      color: "text-[#E4405F]",
      label: "Instagram",
    },
    {
      icon: <FaLinkedinIn size={18} />,
      color: "text-[#0077B5]",
      label: "LinkedIn",
    },
  ];

  const footerLinks = [
    {
      title: "About",
      items: ["How it Works", "Featured", "Partnership", "Business Relation"],
    },
    {
      title: "Community",
      items: ["Events", "Blog", "Podcast", "Invite a Friend"],
    },
    {
      title: "Support",
      items: ["Help Center", "Contact Us", "FAQs", "Feedback"],
    },
  ];

  return (
    <footer className="w-full bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16"
        >
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              DriveEasy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Whether it's a weekend getaway or a business trip, we've got the
              perfect ride to get you there in comfort and style.
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Subscribe to our newsletter
              </h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Your email"
                  className="flex-1 bg-white dark:bg-neutral-800"
                  radius="lg"
                />
                <Button color="primary" radius="lg" className="font-medium">
                  Send
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 dark:border-neutral-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Copyright */}
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} DriveEasy. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                aria-label={social.label}
                className={`${social.color} w-10 h-10 rounded-full bg-white dark:bg-neutral-800 shadow-sm flex items-center justify-center hover:shadow-md transition-all`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

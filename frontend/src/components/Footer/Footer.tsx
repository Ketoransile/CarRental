import { Button, Input } from "@heroui/react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Footer = () => {
  const socialLinks = [
    {
      icon: <FaFacebookF size={18} />,
      color: "text-blue-600 hover:text-blue-700",
      label: "Facebook",
      href: "#",
    },
    {
      icon: <FaTwitter size={18} />,
      color: "text-sky-500 hover:text-sky-600",
      label: "Twitter",
      href: "#",
    },
    {
      icon: <FaInstagram size={18} />,
      color: "text-pink-600 hover:text-pink-700",
      label: "Instagram",
      href: "#",
    },
    {
      icon: <FaLinkedinIn size={18} />,
      color: "text-blue-700 hover:text-blue-800",
      label: "LinkedIn",
      href: "#",
    },
  ];

  const footerLinks = [
    {
      title: "Company",
      items: [
        { label: "About Us", href: "/about" },
        { label: "Our Fleet", href: "/all-cars" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
      ],
    },
    {
      title: "Support",
      items: [
        { label: "Help Center", href: "#" },
        { label: "Terms & Conditions", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Contact Us", href: "/contactUs" },
      ],
    },
    {
      title: "Partners",
      items: [
        { label: "Become a Host", href: "#" },
        { label: "Affiliate Program", href: "#" },
        { label: "Partner with Us", href: "#" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link to="/" className="text-2xl font-bold flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-blue-700 transition-colors">
                D
              </div>
              <span className="text-gray-900">
                Drive<span className="text-blue-600">zy</span>
              </span>
            </Link>

            <p className="text-gray-500 leading-relaxed max-w-sm">
              Experience the freedom of the open road with our premium car rental service.
              Reliable, affordable, and ready for your next adventure.
            </p>

            <div className="flex flex-col gap-3 mt-4">
              <h4 className="font-semibold text-gray-900">Subscribe for exclusive offers</h4>
              <div className="flex gap-2 max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  classNames={{
                    inputWrapper: "bg-gray-50 border border-gray-200 shadow-none hover:bg-gray-100 group-data-[focus=true]:bg-white",
                  }}
                  radius="lg"
                  size="lg"
                />
                <Button
                  className="bg-blue-600 text-white font-medium px-6"
                  size="lg"
                  radius="lg"
                >
                  Join
                </Button>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((section, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <h3 className="font-bold text-gray-900">{section.title}</h3>
                <ul className="flex flex-col gap-3">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <Link
                        to={item.href}
                        className="text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-400 text-sm font-medium text-center md:text-left">
            &copy; {new Date().getFullYear()} Drivezy. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ y: -3 }}
                className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center transition-all hover:shadow-md ${social.color}`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

import { Button, Input } from "@heroui/react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
export const Footer = () => {
  return (
    <div className="w-full flex flex-col gap-10 items-start py-10 px-4 md:px-6 lg:px-10  xl:px-20 pt-32">
      <div className="w-full flex items-start justify-between  border-b-2 border-neutral-300 pb-10">
        <p className="text-2xl max-w-lg font-bold text-black">
          Whether it's a weekend getaway or a business trip, we’ve got the
          perfect ride to get you there in comfort and style.
        </p>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">About</h1>
          <h2>How it Works</h2>
          <h2>Featured</h2>
          <h2>Partnership</h2>
          <h2>Business Relation</h2>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Community</h1>
          <h2>Events</h2>
          <h2>Blog</h2>
          <h2>Podcast</h2>
          <h2>Invite a Friend</h2>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Newsletter</h1>
          <div className="flex items-center gap-2">
            <Input placeholder="Enter Your Email" />
            <Button className="bg-blue-600 px-4 rounded-xl text-white ">
              Send
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FaFacebookF className="text-[#1877F2]" size={20} />{" "}
          {/* Facebook Blue */}
          <FaTwitter className="text-[#1DA1F2]" size={20} />{" "}
          {/* Twitter Blue */}
          <FaInstagram className="text-[#E4405F]" size={20} />{" "}
          {/* Instagram Pink */}
          <FaLinkedinIn className="text-[#0077B5]" size={20} />{" "}
          {/* LinkedIn Blue */}
        </div>
        <div className="flex items-center gap-8">
          <p>&copy;All Rights Reserverd</p>
          <p>Privacy & Policy</p>
          <p>Terms & Conditions</p>
        </div>
      </div>
    </div>
  );
};

// import { Button, Image } from "@heroui/react";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import checkmark from "../../assets/checkmark.png";
// import { authClient } from "../../lib/auth-client";
// export const SuccessPage = () => {
//   const { data: session } = authClient.useSession();

//   const [userId, setUserId] = useState<string>("");

//   useEffect(() => {
//     if (session?.user?.id) {
//       setUserId(session.user.id);
//     }
//   }, [session]);

//   return (
//     <div className="flex min-h-screen items-center justify-center ">
//       <div className="flex flex-col gap-4 items-center max-w-2xl shadow-2xl shadow-neutral-300 rounded-xl p-20">
//         <Image src={checkmark} alt="order-successfull" width={80} />
//         <h1 className="text-black font-bold text-xl">
//           Thank you for your Ordering!
//         </h1>
//         <p className="text-xs text-neutral-400 text-center pt-2">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit...
//         </p>
//         {userId && (
//           <Link to={`/my-bookings/${userId}`}>
//             <Button className="bg-blue-600 text-white font-bold">
//               View order
//             </Button>
//           </Link>
//         )}

//         <Link to="/all-cars">
//           <Button className="bg-parent border border-neutral-300 rounded-xl">
//             Continue Browsing Cars
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// };
import { Button, Image } from "@heroui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import checkmark from "../../assets/checkmark.png"; // Assuming this is a green checkmark icon
import { authClient } from "../../lib/auth-client";

export const SuccessPage = () => {
  const { data: session } = authClient.useSession();

  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);

  return (
    <div className="flex  items-center justify-center bg-gray-50 p-4 sm:p-6 pt-20">
      <div className="flex flex-col gap-6 items-center w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center border border-gray-100">
        {/* Checkmark Icon */}
        <div className="bg-blue-100 p-4 rounded-full">
          <Image
            src={checkmark}
            alt="Order Successful"
            width={100}
            height={100}
            // className="w-12 h-12"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
          Booking Confirmed!
        </h1>

        {/* Subtitle/Description */}
        <p className="text-base text-gray-600 leading-relaxed">
          Your car rental is successfully booked. We've sent a confirmation
          email with all the details.
        </p>

        {/* Dynamic User ID Section */}
        {userId && (
          <Link to={`/my-bookings/${userId}`} className="w-full">
            <Button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              View My Bookings
            </Button>
          </Link>
        )}

        {/* Continue Browsing Button */}
        <Link to="/all-cars" className="w-full">
          <Button className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Continue Browsing Cars
          </Button>
        </Link>

        {/* Optional: Add a small note or link to support */}
        <p className="text-sm text-gray-500 mt-4">
          Need assistance? Visit our{" "}
          <Link to="/support" className="text-blue-600 hover:underline">
            support page
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

// import { Button, Form, Image, Input, Link } from "@heroui/react";
// import loginImage from "../../assets/login.svg";
// import { FcGoogle } from "react-icons/fc";
// import { RegisterForm } from "../../components/RegisterForm";

// export const Register = () => {
//   return (
//     <div className="w-full flex items-center justify-center min-h-screen bg-gray-100 p-8">
//       {" "}
//       {/* Added p-8 and bg-gray-100 */}
//       <div className="w-1/2 flex flex-col gap-6 items-center justify-center py-16 bg-white rounded-2xl shadow-xl">
//         {" "}
//         {/* Enhanced shadow, rounded corners, background, and spacing */}
//         <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
//           Sign Up to Get Started
//         </h1>{" "}
//         {/* Larger and bolder heading */}
//         <RegisterForm />{" "}
//         {/* Assuming RegisterForm handles its own width/max-width */}
//         <div className="flex items-center w-full max-w-sm gap-4 my-6">
//           {" "}
//           {/* Increased max-w and my */}
//           <div className="flex-1 border-t border-neutral-300"></div>{" "}
//           {/* Softer border color */}
//           <div className="text-neutral-500 text-sm">Or, sign up with</div>{" "}
//           {/* Changed text for consistency */}
//           <div className="flex-1 border-t border-neutral-300"></div>
//         </div>
//         <Link
//           href="/"
//           className="bg-white text-gray-700 flex items-center justify-center gap-2 py-3 w-full max-w-sm border border-neutral-300 rounded-xl hover:bg-gray-50 transition-colors duration-200" // More prominent and interactive button
//         >
//           <FcGoogle size={24} />
//           <p className="font-medium">Sign up with Google</p>{" "}
//           {/* Added font-medium */}
//         </Link>
//         <div className="flex items-center gap-2 mt-6">
//           {" "}
//           {/* Increased margin top */}
//           <p className="text-gray-600">Do you have an account already? </p>
//           <Link
//             href="/login"
//             className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
//           >
//             Login here
//           </Link>{" "}
//           {/* Styled link */}
//         </div>
//       </div>
//       <div className="w-1/2 flex flex-col gap-4 items-center justify-center py-16">
//         {" "}
//         {/* Equal width, centered content */}
//         <Image
//           src={loginImage}
//           width={600}
//           className="max-w-full h-auto"
//         />{" "}
//         {/* Added responsive image classes */}
//       </div>
//     </div>
//   );
// };
import { Image, Link } from "@heroui/react";
import loginImage from "../../assets/login.svg";
import { FcGoogle } from "react-icons/fc";
import { RegisterForm } from "../../components/RegisterForm";

export const Register = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100 py-4 sm:p-8">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6 items-center justify-center px-4 py-8 sm:py-12 lg:py-16 bg-white rounded-2xl shadow-xl mb-8 lg:mb-0 lg:mr-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-2 sm:mb-4">
          Sign Up to Get Started
        </h1>

        <RegisterForm />

        <div className="flex items-center w-full max-w-xs sm:max-w-sm gap-3 sm:gap-4 my-4 sm:my-6">
          <div className="flex-1 border-t border-neutral-300"></div>
          <div className="text-neutral-500 text-xs sm:text-sm">
            Or, sign up with
          </div>
          <div className="flex-1 border-t border-neutral-300"></div>
        </div>

        <Link
          href="/"
          className="bg-white text-gray-700 flex items-center justify-center gap-2 py-2 sm:py-3 w-full max-w-xs sm:max-w-sm border border-neutral-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
        >
          <FcGoogle size={20} className="sm:w-6 sm:h-6" />
          <p className="font-medium text-sm sm:text-base">
            Sign up with Google
          </p>
        </Link>

        <div className="flex items-center gap-2 mt-4 sm:mt-6">
          <p className="text-gray-600 text-sm sm:text-base">
            Do you have an account already?
          </p>
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors duration-200"
          >
            Login here
          </Link>
        </div>
      </div>

      {/* Right Column - Image (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col gap-4 items-center justify-center py-8 lg:py-16">
        <Image
          src={loginImage}
          width={600}
          className="max-w-full h-auto px-4"
          alt="Registration illustration"
        />
      </div>
    </div>
  );
};

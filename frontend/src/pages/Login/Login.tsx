// import { Button, Form, Image, Input, Link } from "@heroui/react";
// import loginImage from "../../assets/login.svg";
// import { FcGoogle } from "react-icons/fc";
// import { LoginForm } from "../../components/LoginForm";

// export const Login = () => {
//   return (
//     <div className="w-full flex items-center justify-center min-h-screen bg-gray-100 p-8">
//       {/* Added p-8 and bg-gray-100 for overall page styling */}
//       <div className="w-1/2 flex flex-col gap-6 items-center justify-center py-16 bg-white rounded-2xl shadow-xl">
//         {" "}
//         {/* Half width, centered content, white background, rounded corners, and a prominent shadow */}
//         <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
//           Welcome Back!
//         </h1>{" "}
//         {/* Larger, bolder, and darker heading */}
//         <LoginForm /> {/* Assuming LoginForm handles its own width/max-width */}
//         <div className="flex items-center w-full max-w-sm gap-4 my-6">
//           {" "}
//           {/* Increased max-width and vertical margin for better spacing */}
//           <div className="flex-1 border-t border-neutral-300"></div>{" "}
//           {/* Softer border color for the separator line */}
//           <div className="text-neutral-500 text-sm">Or, log in with</div>{" "}
//           {/* More descriptive text and neutral color */}
//           <div className="flex-1 border-t border-neutral-300"></div>
//         </div>
//         <Link
//           href="/"
//           className="bg-white text-gray-700 flex items-center justify-center gap-2 py-3 w-full max-w-sm border border-neutral-300 rounded-xl hover:bg-gray-50 transition-colors duration-200" // Styled Google sign-in button with hover effect
//         >
//           <FcGoogle size={24} />
//           <p className="font-medium">Sign in with Google</p>{" "}
//           {/* Added medium font weight */}
//         </Link>
//         <div className="flex items-center gap-2 mt-6">
//           {" "}
//           {/* Increased top margin for spacing */}
//           <p className="text-gray-600">Don't have an account? </p>{" "}
//           {/* Slightly darker text for better readability */}
//           <Link
//             href="/register"
//             className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
//           >
//             Register here
//           </Link>{" "}
//           {/* Styled link with hover effect */}
//         </div>
//       </div>
//       <div className="w-1/2 flex flex-col gap-4 items-center justify-center py-16">
//         {" "}
//         {/* Half width, centered content for the image */}
//         <Image
//           src={loginImage}
//           width={600}
//           className="max-w-full h-auto"
//         />{" "}
//         {/* Ensures image responsiveness */}
//       </div>
//     </div>
//   );
// };
import { Button, Form, Image, Input, Link } from "@heroui/react";
import loginImage from "../../assets/login.svg";
import { FcGoogle } from "react-icons/fc";
import { LoginForm } from "../../components/LoginForm";

export const Login = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100 py-4 sm:p-8">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 items-center justify-center px-4 py-8 sm:py-12 lg:py-16 bg-white rounded-2xl shadow-xl mb-8 lg:mb-0 lg:mr-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-2 sm:mb-4">
          Welcome Back!
        </h1>

        <LoginForm />

        <div className="flex items-center w-full max-w-xs sm:max-w-sm gap-4 my-4 sm:my-6">
          <div className="flex-1 border-t border-neutral-300"></div>
          <div className="text-neutral-500 text-xs sm:text-sm">
            Or, log in with
          </div>
          <div className="flex-1 border-t border-neutral-300"></div>
        </div>

        <Link
          href="/"
          className="bg-white text-gray-700 flex items-center justify-center gap-2 py-2 sm:py-3 w-full max-w-xs sm:max-w-sm border border-neutral-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
        >
          <FcGoogle size={20} className="sm:w-6 sm:h-6" />
          <p className="font-medium text-sm sm:text-base">
            Sign in with Google
          </p>
        </Link>

        <div className="flex items-center gap-2 mt-4 sm:mt-6">
          <p className="text-gray-600 text-sm sm:text-base">
            Don't have an account?
          </p>
          <Link
            href="/register"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors duration-200"
          >
            Register here
          </Link>
        </div>
      </div>

      {/* Right Column - Image (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col gap-4 items-center justify-center py-8 lg:py-16">
        <Image
          src={loginImage}
          width={600}
          className="max-w-full h-auto px-4"
          alt="Login illustration"
        />
      </div>
    </div>
  );
};

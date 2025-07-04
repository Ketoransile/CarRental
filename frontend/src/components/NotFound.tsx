import { Button } from "@heroui/react"; // Assuming Button is available from heroui
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="text-center space-y-6">
        {/* Large, eye-catching 404 */}
        <h1 className="font-extrabold text-blue-600 text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight">
          404
        </h1>

        {/* Clear and concise message */}
        <h2 className="font-bold text-gray-800 text-3xl sm:text-4xl md:text-5xl">
          Page Not Found
        </h2>

        {/* Friendly explanation */}
        <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
          Oops! It looks like the page you're looking for doesn't exist or has
          been moved. Don't worry, we'll help you find your way.
        </p>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link to="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
              Go to Homepage
            </Button>
          </Link>
          {/* Optional: Add a contact/support button if applicable */}
          <Link to="/contact">
            {" "}
            {/* Change /contact to your actual contact page path */}
            <Button className="bg-white border-2 border-blue-600 text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
              Contact Support
            </Button>
          </Link>
        </div>

        {/* Optional: Add a small helpful tip */}
        <p className="text-sm text-gray-500 mt-8">
          If you typed the address, please check for typos.
        </p>
      </div>
    </div>
  );
};

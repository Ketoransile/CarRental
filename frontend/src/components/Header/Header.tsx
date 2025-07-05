// import { Link, NavLink, useLocation } from "react-router-dom";
// import { useAuthStore } from "../../stores/authStore";
// import { UserMenu } from "../UserMenu";

// export const Header = () => {
//   const location = useLocation();
//   const { user } = useAuthStore();

//   const navLinks = [
//     { title: "Home", href: "/" },
//     { title: "Vehicles", href: "/all-cars" },
//     { title: "About us", href: "/about" },
//     { title: "Contact", href: "/contactUs" },
//   ];

//   return (
//     <header className="w-full sticky top-0 bg-white z-50 shadow-sm">
//       <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
//         {/* Logo Section */}
//         <div className="flex items-center gap-8">
//           <Link to="/" className="flex items-center gap-2">
//             <span className="text-2xl md:text-3xl font-bold text-blue-600">
//               Drivezy
//             </span>
//           </Link>

//           {/* Navigation Links - Desktop */}
//           <nav className="hidden md:flex items-center gap-6">
//             {navLinks.map((navLink) => (
//               <NavLink
//                 to={navLink.href}
//                 key={navLink.title}
//                 className={({ isActive }) =>
//                   `text-sm font-medium transition-colors hover:text-blue-600 ${
//                     isActive ? "text-blue-600" : "text-gray-700"
//                   }`
//                 }
//               >
//                 {navLink.title}
//               </NavLink>
//             ))}
//           </nav>
//         </div>

//         {/* Auth Section */}
//         <div className="flex items-center gap-4">
//           {user ? (
//             <UserMenu />
//           ) : (
//             <div className="flex items-center gap-3">
//               <Link
//                 to="/login"
//                 className="hidden sm:block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
//               >
//                 Sign In
//               </Link>
//               <Link to="/register">
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
//                   Get Started
//                 </button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile Navigation - Optional */}
//       {/* <div className="md:hidden bg-gray-50 border-t">
//         Mobile nav content here
//       </div> */}
//     </header>
//   );
// };
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { UserMenu } from "../UserMenu";
import { useState } from "react";
import { X, Menu } from "lucide-react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuthStore();

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Vehicles", href: "/all-cars" },
    { title: "About us", href: "/about" },
    { title: "Contact", href: "/contactUs" },
  ];

  return (
    <header className="w-full sticky top-0 bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-bold text-blue-600">
              Drivezy
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((navLink) => (
              <NavLink
                to={navLink.href}
                key={navLink.title}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive ? "text-blue-600" : "text-gray-700"
                  }`
                }
              >
                {navLink.title}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right Side - Mobile Menu Button or User Menu */}
        <div className="flex items-center gap-4">
          {user ? (
            <UserMenu />
          ) : (
            <button
              className="md:hidden text-gray-700 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-4">
            {navLinks.map((navLink) => (
              <NavLink
                to={navLink.href}
                key={navLink.title}
                className={({ isActive }) =>
                  `py-2 text-base font-medium transition-colors ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {navLink.title}
              </NavLink>
            ))}
            {!user && (
              <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
                <Link
                  to="/login"
                  className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors shadow-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

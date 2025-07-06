// import { Button } from "@heroui/react";
// import { Link, NavLink, useLocation } from "react-router";
// import { authClient } from "../../lib/auth-client";
// import { useEffect } from "react";
// import { useAuthStore } from "../../stores/authStore";

// export const Header = () => {
//   const location = useLocation();
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const { data: session, error } = await authClient.getSession();
//       console.log("Session from header is ", session);
//     };
//     fetchUserData();
//   }, []);
//   const { user, isLoading, fetchSession, logout } = useAuthStore();
//   const isActiveLink = (link: string) => {
//     return location.pathname === link;
//   };

//   const navLinks = [
//     {
//       title: "Home",
//       href: "/",
//     },
//     {
//       title: "Vehicles",
//       href: "/all-cars",
//     },
//     {
//       title: "About us",
//       href: "/about",
//     },
//     {
//       title: "Contact US",
//       href: "/contactUs",
//     },
//   ];
//   return (
//     <div className="w-full sticky top-0 bg-white z-20  py-2 px-4 md:px-6 lg:px-10  xl:px-20 flex items-center justify-between text-base border-b border-neutral-200">
//       <div className="flex items-center gap-4 max-w-[50%] w-full">
//         <Link
//           to="/"
//           className="text-4xl font-bold text-black whitespace-nowrap"
//         >
//           <span className="text-blue-600">Drivezy</span>
//         </Link>
//         {/* <Input
//           className="flex-1 border border-neutral-400 rounded-xl"
//           placeholder="Search..."
//         /> */}
//       </div>

//       <div className="flex items-center gap-10">
//         <nav className="flex items-center gap-10">
//           {navLinks.map((navLink) => (
//             <NavLink
//               to={navLink.href}
//               key={navLink.title}
//               className={`${
//                 isActiveLink(navLink.href) ? "text-blue-600 font-bold" : ""
//               }`}
//             >
//               {navLink.title}
//             </NavLink>
//           ))}
//         </nav>
//         {session?.user}
//         <Link to="/login">
//           <div className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold">
//             Get Started
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };
// import { Button } from "@heroui/react";
// import { Link, NavLink, useLocation } from "react-router-dom"; // Corrected import to react-router-dom
// import { useAuthStore } from "../../stores/authStore"; // Import your auth store
// import { useEffect } from "react"; // Keep useEffect if you still need it for other things, but for session it's handled by store initialization
// import { UserMenu } from "../UserMenu";

// export const Header = () => {
//   const location = useLocation();

//   const { user, isLoading, fetchSession, logout } = useAuthStore();

//   console.log("user from header is ", user);

//   const isActiveLink = (link: string) => {
//     return location.pathname === link;
//   };

//   const navLinks = [
//     { title: "Home", href: "/" },
//     { title: "Vehicles", href: "/all-cars" },
//     { title: "About us", href: "/about" },
//     { title: "Contact US", href: "/contactUs" },
//   ];

//   return (
//     <div className="w-full sticky top-0 bg-white z-20 py-2 px-4 md:px-6 lg:px-10 xl:px-20 flex items-center justify-between text-base border-b border-neutral-200">
//       <div className="flex items-center gap-4 max-w-[50%] w-full">
//         <Link
//           to="/"
//           className="text-4xl font-bold text-black whitespace-nowrap"
//         >
//           <span className="text-blue-600">Drivezy</span>
//         </Link>
//         {/* Search Input can go here */}
//       </div>

//       <div className="flex items-center gap-10">
//         <nav className="flex items-center gap-4">
//           {navLinks.map((navLink) => (
//             <NavLink
//               to={navLink.href}
//               key={navLink.title}
//               className={`${
//                 isActiveLink(navLink.href) ? "text-blue-600 font-bold " : ""
//               }`}
//             >
//               {navLink.title}
//             </NavLink>
//           ))}
//         </nav>

//         {/* {isLoading && (
//           <div>Loading...</div> // Or a spinner
//         )} */}
//         {user ? (
//           <UserMenu />
//         ) : (
//           <Link to="/login">
//             <div className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold">
//               Get Started
//             </div>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // mobile “hamburger” icon
import { LuX } from "react-icons/lu"; // close icon
import { useAuthStore } from "../../stores/authStore";
import { UserMenu } from "../UserMenu";

export const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Vehicles", href: "/all-cars" },
    { title: "About us", href: "/about" },
    { title: "Contact Us", href: "/contactUs" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-sm">
      {/* --- BAR --- */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-10">
        {/* Brand */}
        <Link to="/" className="text-3xl font-bold text-black">
          <span className="text-blue-600">Drivezy</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ title, href }) => (
            <NavLink
              key={title}
              to={href}
              className={({ isActive: navActive }) =>
                `transition-colors ${
                  navActive || isActive(href)
                    ? "text-blue-600 font-semibold"
                    : "text-neutral-700 hover:text-blue-600"
                }`
              }
            >
              {title}
            </NavLink>
          ))}
        </nav>

        {/* Desktop user / CTA */}
        <div className="hidden md:block">
          {user ? (
            <UserMenu />
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow hover:bg-blue-700"
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden"
          aria-label="Open menu"
        >
          {mobileOpen ? <LuX size={24} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* --- MOBILE PANEL --- */}
      {mobileOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col gap-2 border-t border-neutral-200 bg-white px-4 py-4">
            {navLinks.map(({ title, href }) => (
              <NavLink
                key={title}
                to={href}
                onClick={() => setMobileOpen(false)}
                className={({ isActive: navActive }) =>
                  `rounded px-2 py-1 text-base ${
                    navActive || isActive(href)
                      ? "text-blue-600 font-semibold"
                      : "text-neutral-800 hover:bg-neutral-100"
                  }`
                }
              >
                {title}
              </NavLink>
            ))}

            {user ? (
              <>
                <NavLink
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="rounded px-2 py-1 text-neutral-800 hover:bg-neutral-100"
                >
                  Profile
                </NavLink>
                <NavLink
                  to={`/my-bookings/${user.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded px-2 py-1 text-neutral-800 hover:bg-neutral-100"
                >
                  My Bookings
                </NavLink>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="rounded px-2 py-1 text-left text-red-600 hover:bg-neutral-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded px-2 py-1 font-medium text-blue-600 hover:bg-neutral-100"
              >
                Get Started
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

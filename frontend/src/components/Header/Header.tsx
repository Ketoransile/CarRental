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
import { Button } from "@heroui/react";
import { Link, NavLink, useLocation } from "react-router-dom"; // Corrected import to react-router-dom
import { useAuthStore } from "../../stores/authStore"; // Import your auth store
import { useEffect } from "react"; // Keep useEffect if you still need it for other things, but for session it's handled by store initialization
import { UserMenu } from "../UserMenu";

export const Header = () => {
  const location = useLocation();
  // Select state from your Zustand store
  const { user, isLoading, fetchSession, logout } = useAuthStore();

  // The initial session fetch is now handled by the store itself (see useAuthStore.getState().fetchSession() above)
  // You might want to re-fetch if the location changes or if you have other triggers,
  // but for a typical app load, the initial call in the store is sufficient.
  // If you need to re-fetch on specific events (e.g., after login/logout from another component),
  // you would call fetchSession() explicitly.
  // For the header, you likely just need to *read* the current state.

  const isActiveLink = (link: string) => {
    return location.pathname === link;
  };

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Vehicles", href: "/all-cars" },
    { title: "About us", href: "/about" },
    { title: "Contact US", href: "/contactUs" },
  ];

  return (
    <div className="w-full sticky top-0 bg-white z-20 py-2 px-4 md:px-6 lg:px-10 xl:px-20 flex items-center justify-between text-base border-b border-neutral-200">
      <div className="flex items-center gap-4 max-w-[50%] w-full">
        <Link
          to="/"
          className="text-4xl font-bold text-black whitespace-nowrap"
        >
          <span className="text-blue-600">Drivezy</span>
        </Link>
        {/* Search Input can go here */}
      </div>

      <div className="flex items-center gap-10">
        <nav className="flex items-center gap-10">
          {navLinks.map((navLink) => (
            <NavLink
              to={navLink.href}
              key={navLink.title}
              className={`${
                isActiveLink(navLink.href) ? "text-blue-600 font-bold" : ""
              }`}
            >
              {navLink.title}
            </NavLink>
          ))}
        </nav>

        {isLoading ? (
          <div>Loading...</div> // Or a spinner
        ) : user ? (
          // <div className="flex items-center gap-4">
          //   <span className="font-semibold">
          //     Welcome, {user.name || user.email}!
          //   </span>
          //   <Button color="danger" onClick={logout}>
          //     Logout
          //   </Button>
          // </div>
          <UserMenu />
        ) : (
          // User is not logged in, show Get Started button
          <Link to="/login">
            <div className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold">
              Get Started
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

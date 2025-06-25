import { Button } from "@heroui/react";
import { Link, NavLink, useLocation } from "react-router";

export const Header = () => {
  const location = useLocation();
  const isActiveLink = (link: string) => {
    return location.pathname === link;
  };

  const navLinks = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Vehicles",
      href: "/all-cars",
    },
    {
      title: "About us",
      href: "/about",
    },
    {
      title: "Contact US",
      href: "/contactUs",
    },
  ];
  return (
    <div className="w-full sticky top-0 bg-white z-20  py-2 px-4 md:px-6 lg:px-10  xl:px-20 flex items-center justify-between text-base border-b border-neutral-200">
      <div className="flex items-center gap-4 max-w-[50%] w-full">
        <Link
          to="/"
          className="text-4xl font-bold text-black whitespace-nowrap"
        >
          <span className="text-blue-600">Drivezy</span>
        </Link>
        {/* <Input
          className="flex-1 border border-neutral-400 rounded-xl"
          placeholder="Search..."
        /> */}
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
        <Link to="/login">
          <Button className="bg-blue-600 text-white rounded-lg">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

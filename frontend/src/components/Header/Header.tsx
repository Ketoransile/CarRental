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
      title: "About us",
      href: "/about",
    },
    {
      title: "Service",
      href: "/services",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
  ];
  return (
    <div className="w-full sticky top-0 bg-white z-20  py-4 px-4 md:px-6 lg:px-10  xl:px-20 flex items-center justify-between text-base">
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
        <Button color="primary" className="rounded-lg">
          Get Started
        </Button>
      </div>
    </div>
  );
};

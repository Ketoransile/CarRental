import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // mobile “hamburger” icon
import { LuX } from "react-icons/lu"; // close icon
import { useAuthStore } from "../../stores/authStore";
import { UserMenu } from "../UserMenu";
import { authClient } from "../../lib/auth-client";

export const Header = () => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // console.log("session from header", session);
  const [mobileOpen, setMobileOpen] = useState(false);
  // console.log("user from headr is", user);
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

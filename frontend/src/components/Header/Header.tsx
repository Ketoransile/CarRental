import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // mobile “hamburger” icon
import { LuX } from "react-icons/lu"; // close icon
import { useAuthStore } from "../../stores/authStore";
import { UserMenu } from "../UserMenu";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Vehicles", href: "/all-cars" },
    { title: "About us", href: "/about" },
    { title: "Contact Us", href: "/contactUs" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm"
          : "bg-transparent border-transparent"
        }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-blue-700 transition-colors">
            D
          </div>
          <span className="text-gray-900">
            Drive<span className="text-blue-600">zy</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex bg-gray-100/50 p-1 rounded-full border border-gray-200/50 backdrop-blur-sm">
          {navLinks.map(({ title, href }) => (
            <NavLink
              key={title}
              to={href}
              className={({ isActive: navActive }) =>
                `relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${navActive || isActive(href)
                  ? "text-blue-600 bg-white shadow-sm"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-200/50"
                }`
              }
            >
              {title}
            </NavLink>
          ))}
        </nav>

        {/* Desktop user / CTA */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Log In
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/40 transition-all transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          {mobileOpen ? <LuX size={24} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* --- MOBILE PANEL --- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map(({ title, href }) => (
                <NavLink
                  key={title}
                  to={href}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive: navActive }) =>
                    `px-4 py-3 rounded-xl text-base font-medium transition-colors ${navActive || isActive(href)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  {title}
                </NavLink>
              ))}

              <div className="h-px bg-gray-100 my-2" />

              {user ? (
                <>
                  <NavLink
                    to={`/my-bookings/${user.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    My Bookings
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="px-4 py-3 rounded-xl text-base font-medium text-left text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-center font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-center font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

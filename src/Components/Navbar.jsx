import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { selectCartCount } from "../redux/reducers/cartSlice";
import { selectIsAuthenticated, selectCurrentUser } from "../redux/reducers/authSlice";
import { useTheme } from "../hooks/useTheme";
import ThemeToggle from "./ThemeToggle";
import NotificationBell from "./NotificationBell";
import logo from "../../public/assets/logo.png";
import Cart from "./Cart";

const NAV_LINKS = [
  { label: "Featured", href: "#featured" },
  { label: "Our Story", href: "#story" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const { isDark, toggleTheme } = useTheme();

  // Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hero is a dark scene, so links stay light until the glass kicks in
  const linkClass = scrolled
    ? "text-brand-espresso dark:text-brand-cream hover:text-brand-caramel dark:hover:text-brand-caramel"
    : "text-brand-cream hover:text-brand-caramel";
  const iconClass = scrolled ? "text-brand-espresso dark:text-brand-cream" : "text-brand-cream";

  return (
    <>
      <motion.nav
        className={`fixed w-full z-30 top-0 transition-all duration-500 ${
          scrolled ? "glass py-2" : "bg-transparent py-4"
        }`}
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.img
              src={logo}
              className={`h-9 ${scrolled ? "dark:brightness-150" : "brightness-150"}`}
              alt="Brew & Bean logo"
              whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
              transition={{ duration: 0.5 }}
            />
            <span
              className={`text-2xl font-bold font-serif transition-colors duration-500 ${
                scrolled ? "text-brand-espresso dark:text-brand-caramel" : "text-brand-foam"
              }`}
            >
              Brew <span className="text-brand-caramel">&amp;</span> Bean
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/menu" className={`relative py-2 px-4 rounded-lg text-sm font-medium transition-colors group ${linkClass}`}>
              Menu
              <span className="absolute left-4 right-4 -bottom-0.5 h-0.5 bg-brand-caramel scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
            </Link>
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`relative py-2 px-4 rounded-lg text-sm font-medium transition-colors group ${linkClass}`}
              >
                {label}
                <span className="absolute left-4 right-4 -bottom-0.5 h-0.5 bg-brand-caramel scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
              </a>
            ))}
            <Link to="/eshop" className={`relative py-2 px-4 rounded-lg text-sm font-medium transition-colors group ${linkClass}`}>
              E-Shop
              <span className="absolute left-4 right-4 -bottom-0.5 h-0.5 bg-brand-caramel scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
            </Link>

            <ThemeToggle isDark={isDark} onToggle={toggleTheme} className="ml-1" />

            {/* Notification bell — only shown when logged in */}
            {isAuthenticated && (
              <NotificationBell iconClass={scrolled ? "text-brand-espresso dark:text-brand-cream" : "text-brand-cream"} />
            )}

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative ml-1 p-2 rounded-lg hover:bg-brand-caramel/15 transition-colors"
              aria-label={`Open cart — ${cartCount} items`}
            >
              <svg className={`w-6 h-6 transition-colors duration-500 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-brand-caramel text-brand-espresso text-xs font-bold rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </motion.span>
              )}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <Link to="/profile" className={`ml-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${linkClass}`}>
                {user?.name?.split(" ")[0]}
              </Link>
            ) : (
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/login"
                  className="btn-shine ml-2 py-2.5 px-5 rounded-xl text-sm font-bold bg-caramel-gradient text-brand-espresso inline-block"
                >
                  Sign In
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile: theme + cart + hamburger */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-lg" aria-label="Open cart">
              <svg className={`w-6 h-6 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-caramel text-brand-espresso text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={`p-2 rounded-lg transition-colors ${iconClass} hover:bg-brand-caramel/15`}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-caramel-gradient origin-left"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden glass border-t-0 mt-2 mx-3 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="px-4 py-3 space-y-1">
                {[{ label: "Menu", to: "/menu" }, ...NAV_LINKS, { label: "E-Shop", to: "/eshop" }].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    {item.to ? (
                      <Link
                        to={item.to}
                        className="block py-2.5 px-3 rounded-lg text-brand-espresso dark:text-brand-cream font-medium hover:bg-brand-caramel/15"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="block py-2.5 px-3 rounded-lg text-brand-espresso dark:text-brand-cream font-medium hover:bg-brand-caramel/15"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    )}
                  </motion.div>
                ))}
                {isAuthenticated ? (
                  <Link
                    to="/profile"
                    className="block py-2.5 px-3 rounded-lg text-brand-espresso dark:text-brand-cream font-medium hover:bg-brand-caramel/15"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="block py-3 px-3 rounded-xl bg-caramel-gradient text-brand-espresso text-center font-bold"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Cart drawer */}
      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </>
  );
}

export default Navbar;

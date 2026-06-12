import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const BEANS = [
  { left: "8%", top: "20%", size: 26, dur: 6 },
  { left: "16%", top: "70%", size: 20, dur: 7.5 },
  { left: "82%", top: "16%", size: 24, dur: 6.5 },
  { left: "90%", top: "60%", size: 30, dur: 8 },
  { left: "70%", top: "82%", size: 18, dur: 7 },
];

const Bean = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <g transform="rotate(28 20 20)">
      <ellipse cx="20" cy="20" rx="11" ry="16" fill="#6D4C41" />
      <path d="M16 6 Q26 20 14 34" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed(true);
  };

  return (
    <section className="py-24 bg-brand-cream dark:bg-[#1a0f0b] transition-colors duration-500">
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.div
          className="relative overflow-hidden rounded-[2.5rem] bg-coffee-gradient px-6 py-16 md:py-20 text-center shadow-coffee-xl"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          {/* Floating beans */}
          {BEANS.map((b, i) => (
            <motion.span
              key={i}
              className="absolute pointer-events-none opacity-60"
              style={{ left: b.left, top: b.top }}
              animate={reduceMotion ? {} : { y: [0, -20, 0], rotate: [0, 24, 0] }}
              transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
              aria-hidden="true"
            >
              <Bean size={b.size} />
            </motion.span>
          ))}

          <div className="relative max-w-xl mx-auto">
            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="py-6"
                >
                  {/* Animated check */}
                  <motion.div
                    className="mx-auto w-20 h-20 rounded-full bg-brand-caramel flex items-center justify-center shadow-caramel-glow"
                    initial={{ scale: 0, rotate: -120 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 16 }}
                  >
                    <svg className="w-10 h-10 text-brand-espresso" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <motion.path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                      />
                    </svg>
                  </motion.div>
                  <h3 className="mt-6 text-3xl font-serif font-bold text-brand-foam">
                    Welcome to the inner circle ☕
                  </h3>
                  <p className="mt-3 text-brand-latte">
                    Your first perk is on its way to <span className="font-semibold text-brand-caramel">{email}</span>.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-caramel">
                    The Sunday Roast
                  </span>
                  <h2 className="mt-3 text-3xl md:text-5xl font-serif font-bold text-brand-foam leading-tight">
                    Brews, news &amp; member-only perks
                  </h2>
                  <p className="mt-4 text-brand-latte">
                    One email a week. New roasts, secret menu drops, and 10% off your first order.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8" noValidate>
                    <div className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl glass-dark">
                      <label htmlFor="newsletter-email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="newsletter-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="you@example.com"
                        className="flex-1 px-4 py-3.5 bg-transparent text-brand-foam placeholder-brand-latte/60 focus:outline-none text-sm"
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? "newsletter-error" : undefined}
                      />
                      <motion.button
                        type="submit"
                        className="btn-shine px-7 py-3.5 bg-caramel-gradient text-brand-espresso rounded-xl font-bold text-sm shadow-caramel-glow"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        Subscribe
                      </motion.button>
                    </div>
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          id="newsletter-error"
                          className="mt-3 text-sm text-red-300"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          role="alert"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <p className="mt-4 text-xs text-brand-latte/60">
                      No spam, ever. Unsubscribe anytime.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Newsletter;

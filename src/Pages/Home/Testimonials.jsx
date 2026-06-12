import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const AUTO_ADVANCE_MS = 5000;

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Daily Regular, Indiranagar",
    avatar: "https://i.pravatar.cc/100?img=47",
    rating: 5,
    text: "The Caramel Cloud Latte is the best coffee I've had outside of Italy. The app ordering means my cup is ready the moment I walk in.",
  },
  {
    name: "Arjun Mehta",
    role: "Startup Founder",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    text: "I've basically moved my office here. Fast Wi-Fi, quiet corners, and a flat white that never misses. Ten out of ten.",
  },
  {
    name: "Sneha Iyer",
    role: "Home Brewer",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 5,
    text: "Their single-origin beans arrive two days after roasting. You can taste the difference — bright, floral, unbelievable.",
  },
  {
    name: "Rahul Verma",
    role: "Coffee Enthusiast",
    avatar: "https://i.pravatar.cc/100?img=68",
    rating: 4,
    text: "The seasonal specials keep me coming back. The Orange Honey Cold Brew this summer was genuinely inventive.",
  },
];

const Stars = ({ rating, animate }) => (
  <div className="flex gap-1 justify-center" aria-label={`Rated ${rating} out of 5`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <motion.svg
        key={n}
        className={`w-5 h-5 ${n <= rating ? "text-brand-caramel" : "text-brand-latte/50"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        initial={animate ? { opacity: 0, scale: 0, rotate: -90 } : false}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.2 + n * 0.07, type: "spring", stiffness: 300, damping: 18 }}
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.363 1.118l1.286 3.96c.3.922-.755 1.688-1.539 1.118l-3.367-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.783.57-1.838-.196-1.538-1.118l1.285-3.96a1 1 0 00-.362-1.118L2.058 9.387c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.29-3.96z" />
      </motion.svg>
    ))}
  </div>
);

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, reduceMotion]);

  const current = TESTIMONIALS[index];

  return (
    <section
      className="py-24 bg-brand-cream dark:bg-[#1a0f0b] transition-colors duration-500"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-caramel">
            Loved by Thousands
          </span>
          <h2 className="mt-3 mb-12 text-4xl md:text-5xl font-serif font-bold text-brand-espresso dark:text-brand-foam">
            What Our Guests Say
          </h2>
        </motion.div>

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              className="glass rounded-3xl px-8 py-10"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.97 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <motion.img
                src={current.avatar}
                alt={current.name}
                className="w-16 h-16 rounded-full mx-auto ring-4 ring-brand-caramel/40 object-cover"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              />
              <div className="mt-4">
                <Stars rating={current.rating} animate />
              </div>
              <blockquote className="mt-5 text-lg md:text-xl font-serif italic text-brand-espresso dark:text-brand-cream leading-relaxed">
                “{current.text}”
              </blockquote>
              <figcaption className="mt-5">
                <div className="font-bold text-brand-espresso dark:text-brand-foam">{current.name}</div>
                <div className="text-sm text-brand-medium dark:text-brand-latte/70">{current.role}</div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2.5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className="p-1"
            >
              <motion.span
                className={`block h-2 rounded-full ${
                  i === index ? "bg-brand-caramel" : "bg-brand-latte dark:bg-white/20"
                }`}
                animate={{ width: i === index ? 28 : 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

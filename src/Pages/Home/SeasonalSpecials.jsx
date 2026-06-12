import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const FLOATING = [
  { emoji: "🧊", left: "6%", top: "18%", size: "text-3xl", dur: 5 },
  { emoji: "🍊", left: "14%", top: "68%", size: "text-4xl", dur: 6 },
  { emoji: "☕", left: "86%", top: "20%", size: "text-4xl", dur: 5.5 },
  { emoji: "🌿", left: "90%", top: "64%", size: "text-3xl", dur: 7 },
  { emoji: "🍯", left: "76%", top: "78%", size: "text-2xl", dur: 6.5 },
];

function SeasonalSpecials() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-24 bg-brand-foam dark:bg-[#211410] transition-colors duration-500">
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.div
          className="relative overflow-hidden rounded-[2.5rem] px-6 py-16 md:py-20 text-center shadow-coffee-xl"
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {/* Animated gradient backdrop */}
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(120deg,#3E2723,#6D4C41,#C89B3C,#4E342E,#3E2723)] bg-[length:300%_300%]"
            animate={reduceMotion ? {} : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-brand-espresso/30" />

          {/* Floating ingredients */}
          {FLOATING.map((f, i) => (
            <motion.span
              key={i}
              className={`absolute ${f.size} select-none pointer-events-none drop-shadow-lg`}
              style={{ left: f.left, top: f.top }}
              animate={reduceMotion ? {} : { y: [0, -18, 0], rotate: [0, 12, -8, 0] }}
              transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
              aria-hidden="true"
            >
              {f.emoji}
            </motion.span>
          ))}

          <div className="relative">
            <motion.span
              className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-brand-espresso bg-brand-caramel rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 300 }}
            >
              Summer Edition
            </motion.span>

            <motion.h2
              className="mt-6 text-4xl md:text-6xl font-serif font-bold text-brand-foam leading-tight"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            >
              Orange Honey <span className="italic text-caramel-gradient">Cold Brew</span>
            </motion.h2>

            <motion.p
              className="mt-5 max-w-lg mx-auto text-brand-latte text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              18-hour slow steep, wild-forest honey, a whisper of burnt orange.
              Only here for the season — ₹269.
            </motion.p>

            <motion.button
              onClick={() => navigate("/menu")}
              className="btn-shine mt-8 px-8 py-4 bg-brand-foam text-brand-espresso rounded-2xl font-bold shadow-coffee-lg"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              Try It Before It's Gone
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SeasonalSpecials;

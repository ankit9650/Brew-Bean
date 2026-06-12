import React, { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const CYCLE = 5; // seconds — one full ice-drop cycle

/* ── Entrance variants ─────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ── Coffee bean (SVG) ─────────────────────────────────────────── */
const Bean = ({ size = 28, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    className={className}
    aria-hidden="true"
  >
    <g transform="rotate(28 20 20)">
      <ellipse cx="20" cy="20" rx="11" ry="16" fill="#5a3c2e" />
      <ellipse cx="20" cy="20" rx="11" ry="16" fill="url(#beanShade)" opacity="0.5" />
      <path
        d="M16 6 Q26 20 14 34"
        stroke="#2b1a12"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </g>
    <defs>
      <linearGradient id="beanShade" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8D6E63" />
        <stop offset="100%" stopColor="#3E2723" />
      </linearGradient>
    </defs>
  </svg>
);

/* ── One falling ice cube + its splash, ripple and spill ───────── */
function IceDrop({ delay = 0, xOffset = 0, reduceMotion }) {
  if (reduceMotion) return null;
  const t = (s) => s / CYCLE; // map seconds → keyframe time

  // Droplets fan out from the impact point
  const droplets = [
    { dx: -46, dy: -54, s: 1 },
    { dx: -26, dy: -78, s: 0.8 },
    { dx: 8, dy: -86, s: 1.1 },
    { dx: 30, dy: -70, s: 0.7 },
    { dx: 50, dy: -48, s: 0.9 },
  ];

  return (
    <div
      className="absolute left-1/2 top-[38%] -translate-x-1/2 pointer-events-none"
      style={{ marginLeft: xOffset }}
    >
      {/* Ice cube */}
      <motion.div
        className="absolute -translate-x-1/2 w-7 h-7 rounded-[7px] border border-white/70 bg-gradient-to-br from-white/70 via-cyan-50/40 to-white/20 backdrop-blur-[2px] shadow-lg"
        animate={{
          y: [-300, -300, 0, 6, 6],
          rotate: [12, 12, 32, 38, 38],
          opacity: [0, 1, 1, 0, 0],
        }}
        transition={{
          duration: CYCLE,
          times: [0, t(0.1), t(1.0), t(1.15), 1],
          repeat: Infinity,
          delay,
          ease: "easeIn",
        }}
      />

      {/* Splash droplets */}
      {droplets.map(({ dx, dy, s }, i) => (
        <motion.div
          key={i}
          className="absolute -translate-x-1/2 w-2 h-2 rounded-full bg-[#5a3c2e]"
          style={{ scale: s }}
          animate={{
            x: [0, dx, dx * 1.25],
            y: [0, dy, 12],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: CYCLE,
            times: [t(1.0), t(1.35), t(1.75)],
            repeat: Infinity,
            delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Crown splash ring at impact */}
      <motion.div
        className="absolute -translate-x-1/2 w-16 h-5 rounded-[50%] border-2 border-[#8D6E63]/70"
        animate={{ scale: [0.2, 1.5, 2], opacity: [0, 0.8, 0] }}
        transition={{
          duration: CYCLE,
          times: [t(1.0), t(1.3), t(1.7)],
          repeat: Infinity,
          delay,
        }}
      />

      {/* Spill droplet running over the cup edge */}
      <motion.div
        className="absolute w-1.5 h-3 rounded-full bg-[#4E342E]"
        style={{ left: 52 }}
        animate={{ y: [0, 4, 64], opacity: [0, 0.9, 0], scaleY: [1, 1.4, 1.8] }}
        transition={{
          duration: CYCLE,
          times: [t(1.05), t(1.25), t(1.9)],
          repeat: Infinity,
          delay,
          ease: "easeIn",
        }}
      />
    </div>
  );
}

/* ── Steam wisp ────────────────────────────────────────────────── */
const Steam = ({ left, delay, reduceMotion }) => (
  <motion.div
    className="absolute w-2 h-16 rounded-full bg-white/25 blur-md"
    style={{ left, top: "8%" }}
    animate={
      reduceMotion
        ? { opacity: 0.25 }
        : { y: [0, -70], x: [0, 8, -6, 4], opacity: [0, 0.5, 0], scale: [0.8, 1.4] }
    }
    transition={{ duration: 4, repeat: Infinity, delay, ease: "easeOut" }}
  />
);

/* ── The coffee scene (cup, table, ice, beans, rays) ───────────── */
function CoffeeScene({ reduceMotion, parallax }) {
  const { cupX, cupY, beanX, beanY, rayX } = parallax;

  // Ambient floating particles
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: `${8 + ((i * 37) % 86)}%`,
        top: `${10 + ((i * 53) % 75)}%`,
        size: 2 + (i % 3),
        duration: 6 + (i % 5) * 2,
        delay: (i % 7) * 0.8,
      })),
    []
  );

  return (
    <div className="relative w-full max-w-[420px] aspect-[4/5] mx-auto select-none">
      {/* Light rays */}
      <motion.div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[140%] h-[70%] pointer-events-none"
        style={{ x: rayX }}
        aria-hidden="true"
      >
        {[-18, 0, 18].map((deg, i) => (
          <motion.div
            key={deg}
            className="absolute left-1/2 top-0 w-20 h-full origin-top bg-gradient-to-b from-brand-caramel/25 via-brand-caramel/5 to-transparent blur-xl"
            style={{ rotate: deg, translateX: "-50%" }}
            animate={reduceMotion ? {} : { opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 6, repeat: Infinity, delay: i * 1.2 }}
          />
        ))}
      </motion.div>

      {/* Ambient particles */}
      {!reduceMotion &&
        particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-brand-caramel/50"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={{ y: [0, -26, 0], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}

      {/* Floating beans — deeper parallax layer */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: beanX, y: beanY }}>
        {[
          { left: "4%", top: "18%", size: 30, dur: 7, rot: 360 },
          { left: "84%", top: "12%", size: 24, dur: 9, rot: -360 },
          { left: "88%", top: "55%", size: 34, dur: 8, rot: 360 },
          { left: "0%", top: "62%", size: 26, dur: 10, rot: -360 },
          { left: "70%", top: "80%", size: 22, dur: 7.5, rot: 360 },
        ].map((b, i) => (
          <motion.div
            key={i}
            className="absolute drop-shadow-lg"
            style={{ left: b.left, top: b.top }}
            animate={reduceMotion ? {} : { y: [0, -16, 0], rotate: [0, b.rot] }}
            transition={{
              y: { duration: b.dur / 2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: b.dur * 2, repeat: Infinity, ease: "linear" },
            }}
          >
            <Bean size={b.size} />
          </motion.div>
        ))}
      </motion.div>

      {/* Cup + table — main parallax layer */}
      <motion.div className="absolute inset-x-0 bottom-[6%]" style={{ x: cupX, y: cupY }}>
        {/* Wooden table */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[125%] h-12 rounded-[50%] bg-gradient-to-b from-[#6b4a33] via-[#54382a] to-[#3a261d] shadow-coffee-xl" />
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-56 h-7 rounded-[50%] bg-black/40 blur-md" />

        {/* Cup group — wobbles on impact */}
        <motion.div
          className="absolute bottom-9 left-1/2 -translate-x-1/2 w-48"
          animate={reduceMotion ? {} : { rotate: [0, 0, -1.6, 1.2, 0] }}
          transition={{
            duration: CYCLE,
            times: [0, 0.2, 0.24, 0.3, 0.38],
            repeat: Infinity,
          }}
          style={{ transformOrigin: "50% 100%" }}
        >
          {/* Steam */}
          <Steam left="34%" delay={0} reduceMotion={reduceMotion} />
          <Steam left="50%" delay={1.4} reduceMotion={reduceMotion} />
          <Steam left="62%" delay={2.6} reduceMotion={reduceMotion} />

          {/* Saucer */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-52 h-7 rounded-[50%] bg-gradient-to-b from-brand-foam to-brand-latte shadow-coffee-lg" />

          {/* Handle */}
          <div className="absolute right-[-22px] top-[34%] w-12 h-16 border-[10px] border-brand-foam rounded-r-full rounded-l-md shadow-coffee" />

          {/* Cup body */}
          <div className="relative h-36 rounded-b-[4.5rem] rounded-t-[14px] bg-gradient-to-br from-brand-foam via-brand-cream to-brand-latte shadow-coffee-xl overflow-visible">
            {/* Side sheen */}
            <div className="absolute inset-y-3 left-4 w-5 rounded-full bg-white/60 blur-[3px]" />

            {/* Coffee surface */}
            <div className="absolute -top-2 inset-x-2 h-9 rounded-[50%] bg-[radial-gradient(ellipse_at_50%_35%,#6b4a33_0%,#3E2723_55%,#2b1a12_100%)] ring-2 ring-brand-caramel/40 overflow-visible">
              {/* Surface bounce on impact */}
              <motion.div
                className="absolute inset-0 rounded-[50%] bg-[#4E342E]/70"
                animate={reduceMotion ? {} : { scaleY: [1, 1, 1.25, 0.92, 1], opacity: [0, 0, 0.7, 0.3, 0] }}
                transition={{ duration: CYCLE, times: [0, 0.2, 0.23, 0.28, 0.34], repeat: Infinity }}
              />
              {/* Expanding ripples */}
              {[0, 0.25].map((extra, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-4 rounded-[50%] border border-brand-caramel/60"
                  animate={reduceMotion ? {} : { scale: [0.3, 2.6], opacity: [0, 0.8, 0] }}
                  transition={{
                    duration: CYCLE,
                    times: [0.21 + extra * 0.04, 0.3 + extra * 0.04, 0.42 + extra * 0.04],
                    repeat: Infinity,
                  }}
                />
              ))}
              {/* Caramel glint */}
              <div className="absolute left-[22%] top-[28%] w-8 h-2.5 rounded-[50%] bg-brand-caramel/35 blur-[2px]" />
            </div>
          </div>
        </motion.div>

        {/* Falling ice cubes — two staggered drops per cycle */}
        <IceDrop delay={0} xOffset={-8} reduceMotion={reduceMotion} />
        <IceDrop delay={2.5} xOffset={14} reduceMotion={reduceMotion} />
      </motion.div>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────── */
function Herosection() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  // Cursor parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 60, damping: 20 };
  const cupX = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), spring);
  const cupY = useSpring(useTransform(my, [-0.5, 0.5], [-5, 5]), spring);
  const beanX = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), spring);
  const beanY = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), spring);
  const rayX = useSpring(useTransform(mx, [-0.5, 0.5], [26, -26]), spring);
  const bgX = useSpring(useTransform(mx, [-0.5, 0.5], [14, -14]), spring);

  const handleMouseMove = (e) => {
    if (reduceMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      id="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-night text-brand-foam"
    >
      {/* Parallax vignette glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: bgX }}
        aria-hidden="true"
      >
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] rounded-full bg-brand-caramel/10 blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[50vw] h-[50vh] rounded-full bg-[#4E342E]/40 blur-3xl" />
      </motion.div>

      <div className="relative w-full max-w-screen-xl mx-auto px-4 pt-28 pb-16 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">
        {/* Copy */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold text-brand-caramel bg-white/5 border border-brand-caramel/30 rounded-full uppercase tracking-[0.2em] backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-caramel animate-pulse-soft" />
            Brew &amp; Bean — Est. 2018
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="mb-6 text-5xl md:text-6xl xl:text-7xl font-serif font-bold tracking-tight leading-[1.05] text-balance"
          >
            Crafted for Every
            <br />
            <span className="text-caramel-gradient italic">Coffee Moment</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-md mb-10 text-lg text-brand-latte/90 leading-relaxed"
          >
            Premium coffee experiences delivered fresh from Brew &amp; Bean.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <motion.button
              onClick={() => navigate("/menu")}
              className="btn-shine inline-flex items-center gap-2 px-8 py-4 bg-caramel-gradient text-brand-espresso rounded-2xl font-bold text-base shadow-caramel-glow"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Explore Menu
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>

            <motion.button
              onClick={() => navigate("/eshop")}
              className="inline-flex items-center gap-2 px-8 py-4 border border-brand-foam/30 text-brand-foam rounded-2xl font-semibold text-base backdrop-blur-sm hover:bg-brand-foam/10 transition-colors"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Order Now
            </motion.button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-8 mt-12">
            {[
              { value: "10+", label: "Locations" },
              { value: "50+", label: "Brew Varieties" },
              { value: "4.9★", label: "Avg. Rating" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold font-serif text-brand-foam">{value}</div>
                <div className="text-[11px] text-brand-latte/70 uppercase tracking-[0.15em]">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Cinematic cup scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
        >
          <CoffeeScene
            reduceMotion={reduceMotion}
            parallax={{ cupX, cupY, beanX, beanY, rayX }}
          />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#featured"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-latte/60 hover:text-brand-caramel transition-colors"
        animate={reduceMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll to featured collection"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.a>
    </section>
  );
}

export default Herosection;

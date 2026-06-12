import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    step: "01",
    title: "Fresh Beans",
    text: "Hand-picked arabica from high-altitude estates in Chikmagalur and Coorg, graded and cupped within days of harvest.",
    image:
      "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=800&q=80",
    alt: "Green coffee beans in open palms",
  },
  {
    step: "02",
    title: "Roasted with Precision",
    text: "Small 12kg batches on our vintage Probat, profiled by hand. We roast every morning — nothing sits longer than a week.",
    image:
      "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?auto=format&fit=crop&w=800&q=80",
    alt: "Coffee beans tumbling inside a drum roaster",
  },
  {
    step: "03",
    title: "Brewed to Order",
    text: "Every cup is dialed in daily — 18g in, 36g out, 27 seconds. Pour-overs bloom for 45 seconds, never less.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    alt: "Barista pouring a careful pour-over brew",
  },
  {
    step: "04",
    title: "Delivered Fresh",
    text: "Sealed with one-way valves and dispatched same-day, so your home brew tastes exactly like our bar pour.",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80",
    alt: "Takeaway coffee ready for delivery on a café counter",
  },
];

function ExperienceStep({ step, index }) {
  const flip = index % 2 === 1;

  return (
    <div
      className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
        flip ? "md:[direction:rtl]" : ""
      }`}
    >
      {/* Image */}
      <motion.div
        className="[direction:ltr] relative rounded-3xl overflow-hidden shadow-coffee-xl aspect-[4/3] group"
        initial={{ opacity: 0, x: flip ? 56 : -56 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <img
          src={step.image}
          alt={step.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
        />
        <span className="absolute top-5 left-5 font-serif text-6xl font-bold text-brand-foam/90 drop-shadow-lg">
          {step.step}
        </span>
      </motion.div>

      {/* Copy */}
      <motion.div
        className="[direction:ltr]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
      >
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-caramel">
          Step {step.step}
        </span>
        <h3 className="mt-3 text-3xl md:text-4xl font-serif font-bold text-brand-espresso dark:text-brand-foam">
          {step.title}
        </h3>
        <p className="mt-4 text-brand-medium dark:text-brand-latte/80 text-lg leading-relaxed max-w-md">
          {step.text}
        </p>
      </motion.div>
    </div>
  );
}

function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 80%"],
  });

  return (
    <section
      id="experience"
      className="py-24 bg-brand-foam dark:bg-[#211410] transition-colors duration-500"
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-caramel">
            Seed to Sip
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-serif font-bold text-brand-espresso dark:text-brand-foam">
            The Brew &amp; Bean Experience
          </h2>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Scroll progress spine (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-brand-latte/60 dark:bg-white/10 rounded-full" />
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-caramel-gradient rounded-full origin-top"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="space-y-24 md:space-y-32">
            {STEPS.map((step, i) => (
              <ExperienceStep key={step.step} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const MILESTONES = [
  {
    year: "2018",
    title: "A single roaster, one dream",
    text: "Brew & Bean opened its first 12-seat café with a vintage Probat roaster and a promise: never serve a stale bean.",
  },
  {
    year: "2020",
    title: "Direct-trade partnerships",
    text: "We began sourcing directly from estates in Chikmagalur and Coorg, paying growers 40% above market rates.",
  },
  {
    year: "2023",
    title: "Ten locations strong",
    text: "From one corner café to ten neighbourhood roasteries — each cup still pulled by hand, never rushed.",
  },
  {
    year: "Today",
    title: "Fresh to your door",
    text: "Our online ordering brings the same bar-quality brews and whole-bean roasts straight to your home.",
  },
];

function CoffeeStory() {
  const timelineRef = useRef(null);
  const imageRef = useRef(null);

  // Timeline line draws as you scroll through it
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });

  // Image parallax — drifts slower than scroll
  const { scrollYProgress: imgProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(imgProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="story"
      className="py-24 bg-brand-foam dark:bg-[#211410] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-start">
        {/* Sticky imagery */}
        <div ref={imageRef} className="lg:sticky lg:top-28">
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-coffee-xl aspect-[4/5]"
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80"
              alt="Freshly roasted coffee beans being inspected by hand"
              loading="lazy"
              className="w-full h-[115%] object-cover"
              style={{ y: imgY }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-serif italic text-brand-foam text-xl leading-snug">
                “Every bean tells a story. We just make sure it's told well.”
              </p>
              <p className="mt-2 text-brand-caramel text-sm font-semibold tracking-wide">
                — Head Roaster, Brew &amp; Bean
              </p>
            </div>
          </motion.div>
        </div>

        {/* Story + timeline */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-caramel">
              Our Story
            </span>
            <h2 className="mt-3 mb-10 text-4xl md:text-5xl font-serif font-bold text-brand-espresso dark:text-brand-foam leading-tight">
              From Bean to <span className="text-caramel-gradient italic">Belief</span>
            </h2>
          </motion.div>

          <div ref={timelineRef} className="relative pl-10">
            {/* Track + animated progress line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-brand-latte dark:bg-white/10 rounded-full" />
            <motion.div
              className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-caramel-gradient rounded-full origin-top"
              style={{ scaleY: scrollYProgress }}
            />

            <div className="space-y-12">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  className="relative"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                >
                  {/* Bean node */}
                  <span className="absolute -left-10 top-1 w-6 h-6 rounded-full bg-brand-espresso dark:bg-brand-caramel ring-4 ring-brand-caramel/30 flex items-center justify-center">
                    <span className="w-1.5 h-3 rounded-full bg-brand-caramel dark:bg-brand-espresso rotate-12" />
                  </span>
                  <span className="text-sm font-bold text-brand-caramel tracking-widest">{m.year}</span>
                  <h3 className="mt-1 text-xl font-serif font-bold text-brand-espresso dark:text-brand-foam">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-brand-medium dark:text-brand-latte/80 leading-relaxed">
                    {m.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoffeeStory;

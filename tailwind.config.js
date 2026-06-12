/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── Brew & Bean premium palette ──────────────────────────
        // Existing keys are remapped to the new palette so every
        // page inherits the rebrand without class changes.
        brand: {
          espresso: "#3E2723", // primary — rich espresso brown
          bean: "#4E342E", //     primary — coffee bean brown
          dark: "#4E342E", //     alias (legacy usage)
          medium: "#6D4C41",
          warm: "#8D6E63",
          latte: "#D7CCC8", //    secondary — warm latte
          cream: "#F5F0E6", //    secondary — cream beige
          light: "#FFF8E7", //    accent — soft coffee foam
          foam: "#FFF8E7",
          caramel: "#C89B3C", //  accent — caramel gold
          "caramel-light": "#E3BC66",
        },
        // Legacy tokens still referenced by inner pages
        mainhead: { heading: "#3E2723", button: "#3E2723" },
        body: "#F5F0E6",
        main: "#F5F0E6",
        menu: { para: "#8D6E63" },
        footer: { foot: "#8D6E63" },
        about: { img: "#F5F0E6" },
        coffee: { coco: "#8D6E63" },
        darkchocolate: "#3E2723",
      },
      fontFamily: {
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      animation: {
        slowBounce: "bounce 2.5s infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin 14s linear infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
        grain: "grain 8s steps(10) infinite",
        marquee: "marquee 38s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.9" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(-2%,2%)" },
          "40%": { transform: "translate(2%,-1%)" },
          "60%": { transform: "translate(-1%,1%)" },
          "80%": { transform: "translate(1%,2%)" },
        },
      },
      backgroundImage: {
        "coffee-gradient": "linear-gradient(135deg, #3E2723 0%, #6D4C41 100%)",
        "cream-gradient": "linear-gradient(135deg, #FFF8E7 0%, #F5F0E6 100%)",
        "caramel-gradient": "linear-gradient(135deg, #C89B3C 0%, #E3BC66 100%)",
        "hero-night":
          "radial-gradient(ellipse at 50% 20%, #4E342E 0%, #2b1a14 55%, #1a0f0b 100%)",
      },
      boxShadow: {
        "coffee-sm": "0 1px 3px rgba(62,39,35,0.12)",
        coffee: "0 4px 16px rgba(62,39,35,0.15)",
        "coffee-lg": "0 10px 40px rgba(62,39,35,0.2)",
        "coffee-xl": "0 24px 80px -16px rgba(26,15,11,0.45)",
        glass: "0 8px 32px rgba(26,15,11,0.18)",
        "caramel-glow": "0 0 32px rgba(200,155,60,0.35)",
      },
      dropShadow: {
        glow: "0 0 24px rgba(200,155,60,0.45)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};

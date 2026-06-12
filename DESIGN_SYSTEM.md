# Brew & Bean — Design System & Homepage Specification

> Version 3.0 · "Crafted for Every Coffee Moment" redesign
> Stack: React 18 · Vite · Tailwind CSS · Framer Motion

---

## 1. Design Tokens

### 1.1 Color Palette

All tokens live in `tailwind.config.js` under `theme.extend.colors.brand` and are
used as `bg-brand-*` / `text-brand-*` / `border-brand-*`.

| Token | Hex | Role |
|---|---|---|
| `brand-espresso` | `#3E2723` | Primary — rich espresso brown (headings, primary buttons) |
| `brand-bean` / `brand-dark` | `#4E342E` | Primary — coffee bean brown (surfaces, hover states) |
| `brand-medium` | `#6D4C41` | Body copy on light surfaces |
| `brand-warm` | `#8D6E63` | Muted accents, borders |
| `brand-latte` | `#D7CCC8` | Secondary — warm latte (muted text on dark, dividers) |
| `brand-cream` | `#F5F0E6` | Secondary — cream beige (page background, light) |
| `brand-foam` / `brand-light` | `#FFF8E7` | Accent — soft coffee foam (alt sections, light text on dark) |
| `brand-caramel` | `#C89B3C` | Accent — caramel gold (CTAs, highlights, focus rings) |
| `brand-caramel-light` | `#E3BC66` | Gradient endpoint for caramel |

**Gradients** (`backgroundImage`):
- `bg-caramel-gradient` — `#C89B3C → #E3BC66` (CTAs, progress lines, gradient text)
- `bg-coffee-gradient` — `#3E2723 → #6D4C41` (dark panels, newsletter)
- `bg-hero-night` — radial `#4E342E → #2b1a14 → #1a0f0b` (cinematic hero backdrop)
- `bg-cream-gradient` — `#FFF8E7 → #F5F0E6`

**Dark mode** (`darkMode: "class"`, toggled by `useTheme()` on `<html>`):
- Page background `#1a0f0b`, alt sections `#211410`, cards `#241712`
- Light-surface text flips: espresso → foam, medium → latte/80

### 1.2 Typography

| Use | Font | Tailwind |
|---|---|---|
| Headings / display | Playfair Display (serif, 400–700, italic for emphasis words) | `font-serif` |
| Body / UI | Inter (300–700) | `font-body` / `font-sans` |

Scale: H1 `text-5xl → 7xl`, H2 `text-4xl → 5xl`, section eyebrow `text-xs uppercase tracking-[0.3em] text-brand-caramel font-bold`, body `text-base/lg leading-relaxed`.

Pattern: every section header = eyebrow label → serif H2 → one-line muted sub-copy.

### 1.3 Surfaces & Effects (`index.css` component classes)

| Class | Effect |
|---|---|
| `.glass` | Frosted glass: `bg-white/60` (dark: `#2b1a14/60`) + `backdrop-blur-xl` + hairline border + `shadow-glass` |
| `.glass-dark` | Always-dark glass for use over imagery/gradients |
| `.text-caramel-gradient` | Caramel gold gradient clipped to text |
| `.btn-shine` | Light sweep across button on hover (premium "shine") |
| `.skeleton-coffee` | Shimmering skeleton loading state |
| `.mask-fade-x` | Fades marquee edges to transparent |
| Shadows | `shadow-coffee-sm/-/lg/xl`, `shadow-glass`, `shadow-caramel-glow` |

Radii: cards `rounded-2xl/3xl`, hero banners `rounded-[2.5rem]`, buttons `rounded-xl/2xl`, pills `rounded-full`.

---

## 2. Component Hierarchy

```
App
├── Navbar (glass, sticky, scroll-progress, ThemeToggle, cart badge, mobile drawer)
└── Home
    ├── Herosection           — cinematic animated cup scene + CTAs
    │   └── CoffeeScene (light rays · particles · floating beans · cup · IceDrop ×2 · Steam ×3)
    ├── FeaturedCollection    — 4 × TiltCard product cards (rating, price, Add to Cart → Redux)
    ├── CoffeeStory           — sticky parallax image + scroll-drawn timeline (4 milestones)
    ├── BestSellers           — infinite CSS marquee of glass cards (pause on hover, + to add)
    ├── SeasonalSpecials      — animated-gradient banner, floating ingredients, CTA
    ├── Testimonials          — auto-advancing glass cards (5s), animated stars/avatar, dots
    ├── Experience            — 4-step seed-to-sip storytelling, alternating split rows, progress spine
    ├── Newsletter            — floating beans, validated input, drawn-check success state
    └── Contact               — existing RTK Query contact form (#contact)
Footer (animated logo, social micro-interactions, contact info, back-to-top)

Shared: TiltCard · ThemeToggle · useTheme() · PageLoader · ErrorBoundary
```

---

## 3. Animation Specifications

Global easing: `cubic-bezier(0.22, 1, 0.36, 1)` (EASE). Springs: `stiffness 250–400, damping 18–28`.
**Only `transform` and `opacity` are animated → GPU-composited, 60fps.**
`useReducedMotion()` + a global `prefers-reduced-motion` CSS kill-switch disable loops.

### 3.1 Hero — choreographed 5s ice-drop cycle

| t (s) | Event |
|---|---|
| 0.0–0.1 | Ice cube fades in 300px above the cup |
| 0.1–1.0 | Cube falls (easeIn) with slow rotation |
| 1.0 | **Impact**: cube fades out inside the cup |
| 1.0–1.3 | Coffee surface bounces (`scaleY 1 → 1.25 → 0.92 → 1`); crown ring expands |
| 1.0–1.75 | 5 droplets fan outward (−46…+50px x, −86px y) then fall and fade |
| 1.05–1.9 | One spill droplet runs over the cup edge and elongates as it falls |
| 1.0–1.5 | Cup wobbles ±1.6° from its base |
| 1.21–2.1 | Two ripple rings expand across the surface (`scale 0.3 → 2.6`, fade) |

A second `IceDrop` runs offset +2.5s, so an impact lands every ~2.5s.
Continuous: steam wisps (4s rise loop, blur-md, staggered), 5 beans float/rotate (7–10s), 14 particles drift, 3 light rays pulse (6s).

**Cursor parallax** (spring-smoothed `useMotionValue`): beans ±22px, rays ∓26px, cup ±8px, vignette ∓14px — three depth layers.

### 3.2 Section animation patterns

| Pattern | Spec |
|---|---|
| Scroll reveal | `initial {opacity:0, y:32–56}` → `whileInView`, `viewport {once:true, margin:"-80px"}`, stagger 0.08–0.15s |
| 3D tilt (TiltCard) | Cursor → `rotateX/Y ±10°` via springs, `whileHover y:-8`, perspective 1000px |
| Marquee | CSS keyframe `translateX(0 → −50%)`, 38s linear infinite, duplicated list, `hover:[animation-play-state:paused]` |
| Timeline draw | `useScroll` progress → `scaleY` on gradient line (origin-top) |
| Testimonial swap | `AnimatePresence mode="wait"`, 5s auto-advance, pauses on hover; stars pop in with 0.07s stagger springs |
| Gradient banner | `background-position 0% → 100% → 0%`, 14s linear, `bg-[length:300%_300%]` |
| Success check | Circle springs in (`stiffness 220`), SVG `pathLength 0 → 1` over 0.5s |
| Buttons | Spring `scale 1.04 / y:-2` hover, `scale 0.96` tap, `.btn-shine` sweep |
| Nav | Entrance `y:-90 → 0`; scroll-progress bar = spring-smoothed `scaleX(scrollYProgress)` |

### 3.3 Upgrade path to real 3D (optional)

The hero scene is an isolated component (`CoffeeScene`). To go full WebGL later:
`npm i three @react-three/fiber @react-three/drei`, replace `CoffeeScene` with a
`<Canvas>` scene (GLTF cup model + drei `MeshTransmissionMaterial` for ice +
instanced bean particles), keep the same parallax motion values as camera offsets.
True fluid splash requires a sim (e.g. WebGL FLIP) — costly on mobile; the current
choreographed 2.5D sequence is the 60fps-safe production choice.

---

## 4. Layout Specifications

| Breakpoint | Behavior |
|---|---|
| **Mobile < 640px** | Single column. Hero: copy above scene, scene max-w scales down; CTAs wrap. Featured = 1-col, Best Sellers marquee unchanged (touch scroll optional), Experience rows stack image-first, nav collapses to glass drawer with staggered items. |
| **Tablet 640–1024px** | Featured = 2-col grid. Story/Experience remain stacked until `lg`/`md` respectively. Nav still hamburger until `md`. |
| **Desktop ≥ 1024px** | Hero 2-col grid (copy ←→ scene). Featured 4-col. CoffeeStory: image is `lg:sticky top-28` while timeline scrolls. Experience alternates left/right via RTL-grid flip. Max content width `max-w-screen-xl`, gutters `px-4`. |

Vertical rhythm: every section `py-24`; alternating backgrounds `cream → foam → cream…` (dark: `#1a0f0b → #211410`) for scroll cadence.

---

## 5. Accessibility

- **Reduced motion**: every infinite loop is gated by `useReducedMotion()`; a global CSS media query hard-disables remaining animation/transition.
- **Semantics**: `<main>`, `<section>`, `<figure>/<blockquote>` for testimonials, real `<button>`/`<a>` everywhere.
- **Labels**: icon buttons carry `aria-label` (cart count announced, theme toggle states, slider dots, add-to-cart per product); decorative SVGs are `aria-hidden`.
- **Forms**: newsletter input has `sr-only` label, `aria-invalid`, `aria-describedby` + `role="alert"` error.
- **Focus**: global `:focus-visible` caramel ring (`ring-2 ring-brand-caramel ring-offset-2`).
- **Contrast**: espresso `#3E2723` on cream `#F5F0E6` ≈ 12.9:1; foam on hero-night ≥ 13:1; caramel reserved for large text/accents on dark.
- Star ratings expose text alternatives (`aria-label="Rated 4.9 out of 5"`).

## 6. Performance Budget

- Transform/opacity-only animation; `will-change: transform` on the marquee only.
- All below-fold imagery `loading="lazy"`; hero scene is pure DOM/SVG (zero image weight).
- Route-level code splitting retained — Home chunk ≈ 14 kB gzipped.
- No new dependencies added (Framer Motion already in the bundle; GSAP/Three.js not required for v3).

## 7. Premium UI Pattern Inventory

Glassmorphism nav/cards · caramel gradient text · button shine sweep · scroll progress bar · animated nav underlines · 3D tilt cards · infinite marquee with edge fade · sticky-image storytelling · scroll-drawn timelines · auto-advancing testimonial carousel with spring dots · animated gradient promo banner · floating ambient objects (beans/ice/particles) · drawn-path success check · skeleton shimmer (`.skeleton-coffee`) · back-to-top micro-interaction · dark/light theme with animated sun↔moon toggle.

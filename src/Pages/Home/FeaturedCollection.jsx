import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addItem } from "../../redux/reducers/cartSlice";
import { useGetProductsQuery } from "../../redux/services/productApi";
import TiltCard from "../../Components/TiltCard";

const EASE = [0.22, 1, 0.36, 1];

// Curated picks for this section, resolved against live catalog data below —
// keeps price/stock/image in sync with whatever the admin panel has set.
const FEATURED_SLUGS = [
  { slug: "signature-espresso", rating: 4.9, tag: "Best Seller" },
  { slug: "caramel-cloud-latte", rating: 4.8, tag: "New" },
  { slug: "single-origin-pourover", rating: 4.9, tag: "Limited" },
  { slug: "velvet-cold-brew", rating: 4.7, tag: "Iced" },
];

const Stars = ({ rating }) => (
  <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <svg
        key={n}
        className={`w-3.5 h-3.5 ${n <= Math.round(rating) ? "text-brand-caramel" : "text-brand-latte"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.363 1.118l1.286 3.96c.3.922-.755 1.688-1.539 1.118l-3.367-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.783.57-1.838-.196-1.538-1.118l1.285-3.96a1 1 0 00-.362-1.118L2.058 9.387c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.29-3.96z" />
      </svg>
    ))}
    <span className="ml-1 text-xs font-semibold text-brand-medium dark:text-brand-latte">{rating}</span>
  </div>
);

function FeaturedCard({ product, index }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: parseFloat(product.price),
        quantity: 1,
        image: product.image,
      })
    );
    toast.success(`${product.title} added to cart`);
  };
  const inStock = product.in_stock !== false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
    >
      <TiltCard className="group h-full">
        <div className="card-coffee h-full flex flex-col shadow-coffee-lg group-hover:shadow-coffee-xl transition-shadow duration-500">
          <div className="relative overflow-hidden aspect-[4/3]">
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${!inStock ? "grayscale opacity-60" : ""}`}
            />
            <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-brand-espresso/85 text-brand-caramel rounded-full backdrop-blur-sm">
              {inStock ? product.tag : "Sold Out"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="flex flex-col flex-1 p-5">
            <Stars rating={product.rating} />
            <h3 className="mt-2 text-lg font-serif font-bold text-brand-espresso dark:text-brand-foam">
              {product.title}
            </h3>
            <p className="mt-1.5 text-sm text-brand-medium dark:text-brand-latte/80 leading-relaxed flex-1">
              {product.description}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold font-serif text-brand-espresso dark:text-brand-caramel">
                ₹{parseFloat(product.price).toFixed(0)}
              </span>
              <motion.button
                onClick={handleAdd}
                disabled={!inStock}
                className="btn-shine px-4 py-2.5 bg-brand-espresso dark:bg-brand-caramel text-white dark:text-brand-espresso text-sm font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={inStock ? { scale: 1.05 } : undefined}
                whileTap={inStock ? { scale: 0.94 } : undefined}
              >
                {inStock ? "Add to Cart" : "Sold Out"}
              </motion.button>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

function FeaturedCollection() {
  const { data } = useGetProductsQuery({ limit: 200 });
  const products = data?.data?.products ?? [];

  const featured = useMemo(() => {
    return FEATURED_SLUGS.map(({ slug, rating, tag }) => {
      const p = products.find((pr) => pr.slug === slug);
      if (!p) return null;
      return { id: p.id, title: p.name, description: p.description, price: p.price, image: p.image_url, in_stock: p.in_stock, rating, tag };
    }).filter(Boolean);
  }, [products]);

  if (featured.length === 0) return null;

  return (
    <section id="featured" className="py-24 bg-brand-cream dark:bg-[#1a0f0b] transition-colors duration-500">
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-caramel">
            Curated Daily
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-serif font-bold text-brand-espresso dark:text-brand-foam">
            Featured Coffee Collection
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-brand-medium dark:text-brand-latte/80">
            Small-batch roasts and signature pours, crafted by our master baristas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <FeaturedCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCollection;

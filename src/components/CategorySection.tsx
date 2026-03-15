import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/products";
import catNecklaces from "@/assets/cat-necklaces.jpeg";
import catShades from "@/assets/cat-shades.jpeg";
import catWatches from "@/assets/cat-watches.jpeg";
import catBracelets from "@/assets/cat-bracelets.jpeg";
import catTshirts from "@/assets/cat-tshirts.jpeg";

const categoryImageOverrides: Record<string, string> = {
  Necklaces: catNecklaces,
  Shades: catShades,
  Watches: catWatches,
  Bracelets: catBracelets,
  "T-Shirts": catTshirts,
};

const CategorySection = () => {
  return (
    <section className="py-12 px-4">
      <h2 className="font-display text-2xl md:text-3xl text-primary text-center mb-8">
        Shop By Category
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide max-w-6xl mx-auto">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={cat.name === "All" ? "/products" : `/products?category=${cat.name}`}
              className="flex flex-col items-center gap-2 min-w-[80px]"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-colors">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="font-body text-xs md:text-sm text-foreground text-center">
                {cat.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;

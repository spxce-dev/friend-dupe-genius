import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/hooks/use-products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group cursor-pointer"
      >
        <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary mb-3">
          <img
            src={product.image || ""}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {product.best_seller && (
            <span className="absolute top-2 left-2 bg-badge text-badge-foreground text-[10px] font-body font-semibold px-2 py-1 rounded">
              Best Sellers
            </span>
          )}
        </div>
        <h3 className="font-display text-sm md:text-base text-primary text-center leading-tight mb-1">
          {product.name}
        </h3>
        <p className="font-body text-xs text-muted-foreground text-center line-clamp-2 mb-1 px-1">
          {product.description}
        </p>
        <p className="font-body text-sm text-primary text-center font-semibold">
          ${product.price}
        </p>
      </motion.div>
    </Link>
  );
};

export default ProductCard;

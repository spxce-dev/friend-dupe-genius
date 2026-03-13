import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState("M");

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <p className="font-body text-muted-foreground">Product not found</p>
        </div>
      </div>
    );
  }

  const sizes = ["XS", "S", "M", "L", "XL"];
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link to="/products" className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors font-body text-sm mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square rounded-lg overflow-hidden bg-secondary"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            {product.bestSeller && (
              <span className="inline-block w-fit bg-badge text-badge-foreground text-[10px] font-body font-semibold px-2 py-1 rounded mb-3">
                Best Seller
              </span>
            )}
            <h1 className="font-display text-2xl md:text-3xl text-foreground mb-2">
              {product.name}
            </h1>
            <p className="font-body text-muted-foreground mb-4">
              {product.description}
            </p>
            <p className="font-display text-3xl text-primary mb-6">
              ${product.price}
            </p>

            <div className="mb-6">
              <p className="font-body text-sm text-foreground mb-2">Size</p>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded font-body text-sm transition-colors ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3 rounded-lg font-body font-semibold text-sm tracking-wide"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </motion.button>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-xl text-primary text-center mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-2">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <p className="font-display text-sm text-primary text-center">{p.name}</p>
                  <p className="font-body text-sm text-primary text-center">${p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;

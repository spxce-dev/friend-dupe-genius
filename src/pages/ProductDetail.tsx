import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useProduct, useProducts } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id || "");
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColour, setSelectedColour] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Derive sizes and colours from either attributes or variations
  const sizeAttr = product?.attributes?.find(
    (a) => a.name.toLowerCase() === "size"
  );
  const sizes = sizeAttr?.options || [];

  const colourAttr = product?.attributes?.find(
    (a) => ["colour", "color"].includes(a.name.toLowerCase())
  );
  const colours = colourAttr?.options || [];

  useEffect(() => {
    if (sizes.length > 0 && !selectedSize) {
      setSelectedSize(sizes.includes("M") ? "M" : sizes[0]);
    }
    if (colours.length > 0 && !selectedColour) {
      setSelectedColour(colours[0]);
    }
  }, [product?.id]);

  // Find matching variation for selected attributes
  const activeVariation = useMemo(() => {
    if (!product?.variations?.length) return null;
    return product.variations.find((v) => {
      const sizeMatch =
        !selectedSize || !v.attributes.size || v.attributes.size === selectedSize;
      const colorMatch =
        !selectedColour ||
        !v.attributes.color ||
        v.attributes.color.toLowerCase() === selectedColour.toLowerCase();
      return sizeMatch && colorMatch;
    });
  }, [product?.variations, selectedSize, selectedColour]);

  // Use variation-specific price/image when available
  const displayPrice =
    activeVariation?.price ? parseFloat(activeVariation.price) : product?.price ?? 0;
  const displayImage =
    activeVariation?.image || product?.image || "";

  const { data: allProducts } = useProducts(product?.category);
  const related =
    allProducts?.filter((p) => p.id !== product?.id).slice(0, 4) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-pulse flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-muted" />
            <p className="font-body text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

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

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      price: displayPrice,
      variation_id: activeVariation?.id,
    };
    addToCart(productToAdd, selectedSize || "One Size", quantity);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors font-body text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square rounded-lg overflow-hidden bg-secondary"
          >
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            {product.best_seller && (
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
              R{displayPrice.toFixed(2)}
            </p>

            {colours.length > 0 && (
              <div className="mb-6">
                <p className="font-body text-sm text-foreground mb-2">
                  Colour:{" "}
                  <span className="font-semibold">{selectedColour}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {colours.map((colour) => (
                    <button
                      key={colour}
                      onClick={() => setSelectedColour(colour)}
                      className={`px-4 py-2 rounded font-body text-sm transition-colors ${
                        selectedColour === colour
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                      }`}
                    >
                      {colour}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sizes.length > 0 && (
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
            )}

            <div className="mb-6">
              <p className="font-body text-sm text-foreground mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded bg-secondary text-secondary-foreground font-body text-lg hover:bg-primary/10 transition-colors"
                >
                  −
                </button>
                <span className="font-body text-foreground w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded bg-secondary text-secondary-foreground font-body text-lg hover:bg-primary/10 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3 rounded-lg font-body font-semibold text-sm tracking-wide"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </motion.button>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-xl text-primary text-center mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-2">
                    <img
                      src={p.image || ""}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <p className="font-display text-sm text-primary text-center">
                    {p.name}
                  </p>
                  <p className="font-body text-sm text-primary text-center">
                    R{p.price}
                  </p>
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

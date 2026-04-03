import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { Link } from "react-router-dom";

const Slideshow = () => {
  const { data: products } = useProducts();
  const [current, setCurrent] = useState(0);

  // Pick products with images for the slideshow
  const slides = products?.filter((p) => p.image).slice(0, 6) || [];

  const next = useCallback(() => {
    if (slides.length > 0) setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    if (slides.length > 0) setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[current];

  return (
    <section className="py-12 px-4 bg-secondary/30">
      <h2 className="font-display text-2xl md:text-3xl text-primary text-center mb-8">
        Fresh Drops
      </h2>
      <div className="relative max-w-5xl mx-auto overflow-hidden rounded-lg">
        <div className="relative aspect-[16/7] md:aspect-[16/6] bg-secondary">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex"
            >
              <div className="w-1/2 md:w-2/5 relative overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-1/2 md:w-3/5 flex flex-col justify-center px-4 md:px-10">
                <h3 className="font-display text-lg md:text-2xl text-foreground mb-2 line-clamp-2">
                  {slide.name}
                </h3>
                <p className="font-body text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2 hidden sm:block">
                  {slide.description}
                </p>
                <p className="font-display text-xl md:text-2xl text-primary mb-4">
                  R{slide.price}
                </p>
                <Link
                  to={`/product/${slide.id}`}
                  className="inline-block w-fit bg-primary text-primary-foreground px-5 py-2 rounded-lg font-body text-xs md:text-sm font-semibold"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center shadow hover:bg-background transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center shadow hover:bg-background transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 text-foreground" />
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === current ? "bg-primary" : "bg-foreground/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slideshow;

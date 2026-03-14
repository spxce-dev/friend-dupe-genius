import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury jewelry and accessories"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero/60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="font-display text-5xl md:text-7xl text-hero-foreground mb-4 tracking-tight">
          Frienemies
        </h1>
        <p className="font-body text-hero-muted text-lg md:text-xl mb-8 tracking-wide">
          Where love, tension, and style collide.
        </p>
        <Link to="/products">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block font-body text-sm tracking-[0.2em] uppercase text-hero-foreground border-b-2 border-hero-foreground pb-1 hover:border-primary hover:text-primary transition-colors cursor-pointer"
          >
            Shop Now
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;

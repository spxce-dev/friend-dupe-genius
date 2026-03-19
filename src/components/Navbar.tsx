import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/use-cart";
import logoImg from "@/assets/toplogo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-center px-4 py-3 bg-background border-b border-border relative">
        <button onClick={() => setMenuOpen(true)} className="absolute left-4 top-1/2 -translate-y-1/2 p-1">
          <Menu className="w-5 h-5 text-primary" />
        </button>

        <Link to="/">
          <img src={logoImg} alt="Frienemies" className="h-20 object-contain" />
        </Link>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
          <Link to="/products">
            <Search className="w-5 h-5 text-primary" />
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-body font-bold">
              {count}
            </span>
          </Link>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/50"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 z-50 h-full w-72 bg-background p-6 shadow-xl"
            >
              <button onClick={() => setMenuOpen(false)} className="mb-4">
                <X className="w-5 h-5 text-primary" />
              </button>
              <div className="flex justify-center mb-6">
                <img src={logoImg} alt="Frienemies" className="h-16 object-contain" />
              </div>
              <div className="flex flex-col gap-5">
                {[
                  { label: "Home", to: "/" },
                  { label: "Shop All", to: "/products" },
                  { label: "Jackets", to: "/products?category=Jackets" },
                  { label: "Hoodies", to: "/products?category=Hoodies" },
                  { label: "Accessories", to: "/products?category=Watches" },
                  { label: "Cart", to: "/cart" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-xl text-primary hover:text-primary/70 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

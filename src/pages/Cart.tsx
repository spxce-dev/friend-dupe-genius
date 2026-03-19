import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const Cart = () => {
  const { items, count, total, loading, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl text-primary text-center mb-8">
          Your Cart {count > 0 && `(${count})`}
        </h1>

        {loading ? (
          <div className="text-center py-12">
            <p className="font-body text-muted-foreground">Loading cart...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="font-body text-muted-foreground mb-4">Your cart is empty</p>
            <Link
              to="/products"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-body font-semibold text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex gap-4 p-4 bg-card rounded-lg border border-border"
                >
                  <Link to={`/product/${item.product_id}`} className="shrink-0">
                    <img
                      src={item.product?.image || ""}
                      alt={item.product?.name || ""}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product_id}`}>
                      <h3 className="font-display text-sm text-primary truncate">{item.product?.name}</h3>
                    </Link>
                    <p className="font-body text-xs text-muted-foreground">Size: {item.size}</p>
                    <p className="font-body text-sm text-primary font-semibold mt-1">
                      ${item.product?.price}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded bg-secondary flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-body text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded bg-secondary flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex justify-between font-body text-sm mb-2">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-body text-sm mb-4">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">Free</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between font-display text-lg">
                <span className="text-primary">Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
              <button className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-lg font-body font-semibold text-sm">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;

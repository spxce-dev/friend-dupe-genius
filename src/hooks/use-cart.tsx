import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Product } from "@/hooks/use-products";
import { siteConfig } from "@/lib/config";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  size: string;
  product?: Product;
}

interface CartContextType {
  items: CartItem[];
  count: number;
  total: number;
  loading: boolean;
  addToCart: (product: Product, size: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  checkout: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const LOCAL_CART_KEY = "frienemies_cart";

const getLocalCart = (): CartItem[] => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_CART_KEY) || "[]");
  } catch {
    return [];
  }
};

const setLocalCart = (items: CartItem[]) => {
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items));
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(getLocalCart);
  const [loading] = useState(false);

  const persist = useCallback((updated: CartItem[]) => {
    setLocalCart(updated);
    setItems(updated);
  }, []);

  const addToCart = async (product: Product, size: string, quantity = 1) => {
    const local = getLocalCart();
    const existing = local.find((i) => i.product_id === product.id && i.size === size);
    if (existing) {
      existing.quantity += quantity;
    } else {
      local.push({ id: crypto.randomUUID(), product_id: product.id, quantity, size, product });
    }
    persist(local);
    toast.success("Added to cart");
  };

  const removeFromCart = async (itemId: string) => {
    persist(getLocalCart().filter((i) => i.id !== itemId));
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(itemId);
    const local = getLocalCart();
    const item = local.find((i) => i.id === itemId);
    if (item) item.quantity = quantity;
    persist([...local]);
  };

  const clearCart = async () => {
    persist([]);
  };

  const checkout = () => {
    // Build WooCommerce cart URL with items
    const cartItems = items.map((i) => `${i.product_id}:${i.quantity}`).join(",");
    const url = `${siteConfig.checkoutUrl}?cart=${encodeURIComponent(cartItems)}`;
    window.open(url, "_blank");
  };

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + (i.product?.price ?? 0) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, count, total, loading, addToCart, removeFromCart, updateQuantity, clearCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

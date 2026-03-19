import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/hooks/use-products";
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
  isAuthenticated: boolean;
  addToCart: (product: Product, size: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

// Local storage fallback for unauthenticated users
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
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const isAuthenticated = !!userId;

  // Listen for auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Fetch cart items
  const fetchCart = useCallback(async () => {
    if (!userId) {
      setItems(getLocalCart());
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("cart_items")
      .select("*, products(*)")
      .eq("user_id", userId);
    if (!error && data) {
      setItems(data.map((item) => ({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        size: item.size || "M",
        product: item.products as unknown as Product,
      })));
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (product: Product, size: string, quantity = 1) => {
    if (!userId) {
      // Local cart
      const local = getLocalCart();
      const existing = local.find((i) => i.product_id === product.id && i.size === size);
      if (existing) {
        existing.quantity += quantity;
      } else {
        local.push({ id: crypto.randomUUID(), product_id: product.id, quantity, size, product });
      }
      setLocalCart(local);
      setItems(local);
      toast.success("Added to cart");
      return;
    }

    const { error } = await supabase.from("cart_items").upsert(
      { user_id: userId, product_id: product.id, size, quantity },
      { onConflict: "user_id,product_id,size" }
    );
    if (error) {
      toast.error("Failed to add to cart");
    } else {
      toast.success("Added to cart");
      fetchCart();
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!userId) {
      const local = getLocalCart().filter((i) => i.id !== itemId);
      setLocalCart(local);
      setItems(local);
      return;
    }
    await supabase.from("cart_items").delete().eq("id", itemId);
    fetchCart();
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(itemId);
    if (!userId) {
      const local = getLocalCart();
      const item = local.find((i) => i.id === itemId);
      if (item) item.quantity = quantity;
      setLocalCart(local);
      setItems([...local]);
      return;
    }
    await supabase.from("cart_items").update({ quantity }).eq("id", itemId);
    fetchCart();
  };

  const clearCart = async () => {
    if (!userId) {
      setLocalCart([]);
      setItems([]);
      return;
    }
    await supabase.from("cart_items").delete().eq("user_id", userId);
    fetchCart();
  };

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + (i.product?.price ?? 0) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, count, total, loading, isAuthenticated, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

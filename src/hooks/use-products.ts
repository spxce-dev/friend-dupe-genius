import { useQuery } from "@tanstack/react-query";
import { siteConfig } from "@/lib/config";

export interface ProductAttribute {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  short_description: string;
  image: string;
  categories: string[];
  featured: boolean;
  best_seller: boolean;
  in_stock: boolean;
  category: string;
  attributes: ProductAttribute[];
  permalink: string;
  variation_id?: number;
}

interface WooProduct {
  id: string;
  name: string;
  price: string;
  description: string;
  short_description: string;
  image: string;
  categories: string[];
  featured: boolean;
  attributes: { name: string; options: string[] }[];
  permalink: string;
}

const mapProduct = (p: WooProduct): Product => ({
  id: p.id,
  name: p.name,
  price: parseFloat(p.price) || 0,
  description: p.short_description || p.description?.replace(/<[^>]*>/g, "") || "",
  short_description: p.short_description || "",
  image: p.image || "",
  categories: p.categories || [],
  featured: p.featured,
  best_seller: p.featured,
  in_stock: true,
  category: p.categories?.[0] || "Uncategorized",
  attributes: p.attributes || [],
  permalink: p.permalink,
});

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${siteConfig.wooBase}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data: WooProduct[] = await res.json();
  return data.map(mapProduct);
};

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const all = await fetchProducts();
      if (!category || category === "All") return all;
      return all.filter((p) => p.categories.includes(category));
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const all = await fetchProducts();
      const product = all.find((p) => p.id === id);
      if (!product) throw new Error("Product not found");
      return product;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useBestSellers = () => {
  return useQuery({
    queryKey: ["products", "best-sellers"],
    queryFn: async () => {
      const all = await fetchProducts();
      const featured = all.filter((p) => p.featured);
      return featured.length > 0 ? featured : all.slice(0, 4);
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const all = await fetchProducts();
      const catSet = new Set<string>();
      all.forEach((p) => p.categories.forEach((c) => catSet.add(c)));
      const cats = Array.from(catSet).sort();
      return [
        { name: "All", image: "", sort_order: 0 },
        ...cats.map((name, i) => ({ name, image: "", sort_order: i + 1 })),
      ];
    },
    staleTime: 5 * 60 * 1000,
  });
};

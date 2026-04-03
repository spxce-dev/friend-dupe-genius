import { useQuery } from "@tanstack/react-query";
import { siteConfig } from "@/lib/config";

export interface ProductVariation {
  id: number;
  price: string;
  image: string;
  attributes: {
    size?: string;
    color?: string;
  };
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
  attributes: { name: string; options: string[] }[];
  permalink: string;
  type: string;
  variations: ProductVariation[];
  variation_id?: number;
}

interface WooProduct {
  id: string | number;
  name: string;
  price: string;
  description: string;
  short_description?: string;
  image: string;
  categories?: string[];
  featured?: boolean;
  bestSeller?: boolean;
  best_seller?: boolean;
  attributes?: { name: string; options: string[] }[];
  permalink?: string;
  type?: string;
  variations?: ProductVariation[];
}

/**
 * Derives top-level attributes (sizes, colours) from variations array
 * when the API doesn't return a top-level `attributes` field.
 */
const deriveAttributesFromVariations = (variations: ProductVariation[]) => {
  const sizeSet = new Set<string>();
  const colorSet = new Set<string>();

  variations.forEach((v) => {
    if (v.attributes.size) sizeSet.add(v.attributes.size);
    if (v.attributes.color) colorSet.add(v.attributes.color);
  });

  const attrs: { name: string; options: string[] }[] = [];
  if (sizeSet.size > 0) attrs.push({ name: "size", options: Array.from(sizeSet) });
  if (colorSet.size > 0) attrs.push({ name: "colour", options: Array.from(colorSet) });
  return attrs;
};

const mapProduct = (p: WooProduct): Product => {
  const variations = p.variations || [];
  const apiAttributes = p.attributes || [];
  // If no top-level attributes but we have variations, derive them
  const attributes =
    apiAttributes.length > 0
      ? apiAttributes
      : deriveAttributesFromVariations(variations);

  return {
    id: String(p.id),
    name: p.name,
    price: parseFloat(p.price) || 0,
    description: p.short_description || p.description?.replace(/<[^>]*>/g, "") || "",
    short_description: p.short_description || "",
    image: p.image || "",
    categories: p.categories || [],
    featured: p.featured ?? p.bestSeller ?? false,
    best_seller: p.bestSeller ?? p.featured ?? false,
    in_stock: true,
    category: p.categories?.[0] || "Uncategorized",
    attributes,
    permalink: p.permalink || "",
    type: p.type || "simple",
    variations,
  };
};

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${siteConfig.wooBase}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data: WooProduct[] = await res.json();
  return data.map(mapProduct);
};

const fetchSingleProduct = async (id: string): Promise<Product> => {
  // Try single-product endpoint first, fall back to filtering all products
  try {
    const res = await fetch(`${siteConfig.wooBase}/products/${id}`);
    if (res.ok) {
      const data: WooProduct = await res.json();
      return mapProduct(data);
    }
  } catch {
    // fall through
  }
  const all = await fetchProducts();
  const product = all.find((p) => p.id === id);
  if (!product) throw new Error("Product not found");
  return product;
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
    queryFn: () => fetchSingleProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useBestSellers = () => {
  return useQuery({
    queryKey: ["products", "best-sellers"],
    queryFn: async () => {
      const all = await fetchProducts();
      const featured = all.filter((p) => p.best_seller);
      return featured.length > 0 ? featured : all.slice(0, 4);
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      // Try dedicated categories endpoint first
      try {
        const res = await fetch(`${siteConfig.wooBase}/categories`);
        if (res.ok) {
          const cats: { id: number; name: string; slug: string; image: string }[] = await res.json();
          return [
            { name: "All", image: "", sort_order: 0 },
            ...cats.map((c, i) => ({ name: c.name, image: c.image || "", sort_order: i + 1 })),
          ];
        }
      } catch {
        // fall through
      }
      // Fallback: derive from products
      const all = await fetchProducts();
      const catSet = new Set<string>();
      all.forEach((p) => p.categories.forEach((c) => catSet.add(c)));
      const catArr = Array.from(catSet).sort();
      return [
        { name: "All", image: "", sort_order: 0 },
        ...catArr.map((name, i) => ({ name, image: "", sort_order: i + 1 })),
      ];
    },
    staleTime: 5 * 60 * 1000,
  });
};

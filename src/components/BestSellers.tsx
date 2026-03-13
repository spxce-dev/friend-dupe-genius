import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const BestSellers = () => {
  const bestSellers = products.filter((p) => p.bestSeller);

  return (
    <section className="py-12 px-4 bg-secondary/50">
      <h2 className="font-display text-2xl md:text-3xl text-primary text-center mb-8">
        Best Sellers
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;

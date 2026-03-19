import ProductCard from "@/components/ProductCard";
import { useBestSellers } from "@/hooks/use-products";

const BestSellers = () => {
  const { data: bestSellers, isLoading } = useBestSellers();

  if (isLoading) {
    return (
      <section className="py-12 px-4 bg-secondary/50">
        <h2 className="font-display text-2xl md:text-3xl text-primary text-center mb-8">
          Best Sellers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square rounded-lg bg-muted mb-3" />
              <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2" />
              <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-secondary/50">
      <h2 className="font-display text-2xl md:text-3xl text-primary text-center mb-8">
        Best Sellers
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
        {bestSellers?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;

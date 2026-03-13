import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import BestSellers from "@/components/BestSellers";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CategorySection />
      <BestSellers />
      <footer className="py-8 text-center font-body text-xs text-muted-foreground border-t border-border">
        © 2025 Frienemies. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;

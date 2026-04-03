import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import BestSellers from "@/components/BestSellers";
import Slideshow from "@/components/Slideshow";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CategorySection />
      <BestSellers />
      <Slideshow />
      <Footer />
    </div>
  );
};

export default Index;

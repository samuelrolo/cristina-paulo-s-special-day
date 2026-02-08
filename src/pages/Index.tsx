import { useState, useCallback } from "react";
import { OpeningAnimation } from "@/components/OpeningAnimation";
import WeddingNav from "@/components/WeddingNav";
import HeroSection from "@/components/HeroSection";
import WeddingDetails from "@/components/WeddingDetails";
import RSVPForm from "@/components/RSVPForm";
import FAQSection from "@/components/FAQSection";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/WeddingFooter";

const Index = () => {
  const [showContent, setShowContent] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setShowContent(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <OpeningAnimation onComplete={handleAnimationComplete} />
      
      <div
        className={`transition-opacity duration-1000 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <WeddingNav />
        <HeroSection />
        <WeddingDetails />
        <RSVPForm />
        <GallerySection />
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;

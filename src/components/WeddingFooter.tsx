import { Heart } from "lucide-react";
import { WeddingRings } from "./OpeningAnimation";

const Footer = () => {
  return (
    <footer className="py-12 px-4 text-center border-t border-border/50">
      <WeddingRings size={40} className="mx-auto mb-4 opacity-50" />
      <p className="font-serif text-2xl text-foreground mb-2">
        Cristina & Paulo
      </p>
      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
        26 · 09 · 2026
      </p>
      <div className="flex items-center justify-center gap-1 text-muted-foreground/50 text-xs">
        <span>Feito com</span>
        <Heart className="w-3 h-3 text-accent fill-accent" />
      </div>
    </footer>
  );
};

export default Footer;

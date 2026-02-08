import { Camera } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const GallerySection = () => {
  return (
    <section id="galeria" className="wedding-section">
      <div className="wedding-container text-center">
        <ScrollReveal>
          <p className="wedding-subheading text-xs mb-4">Os Nossos Momentos</p>
          <h2 className="wedding-heading">Galeria</h2>
          <div className="wedding-divider" />
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-10 wedding-card max-w-lg mx-auto py-12">
            <Camera className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" strokeWidth={1} />
            <p className="font-serif text-xl text-foreground mb-2">Em breve...</p>
            <p className="wedding-body text-sm">
              Após o casamento, partilharemos aqui os melhores momentos do nosso dia especial.
              Fiquem atentos! 📸
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GallerySection;

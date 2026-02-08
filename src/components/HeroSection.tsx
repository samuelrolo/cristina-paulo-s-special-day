import { WeddingRings } from "./OpeningAnimation";
import CountdownTimer from "./CountdownTimer";
import heroImage from "@/assets/hero-wedding.jpg";

const HeroSection = () => {
  const weddingDate = new Date("2027-07-07T15:00:00");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Arranjo floral elegante"
          className="w-full h-full object-cover opacity-20"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <div className="fade-in-section fade-in-delay-1">
          <WeddingRings size={80} className="mx-auto mb-6 animate-float" />
        </div>

        <div className="fade-in-section fade-in-delay-2">
          <p className="wedding-subheading text-xs md:text-sm mb-4">Temos o prazer de vos convidar</p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-foreground leading-none">
            Cristina
          </h1>
          <p className="font-serif text-3xl md:text-4xl text-gold italic my-2">&</p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-foreground leading-none">
            Paulo
          </h1>
        </div>

        <div className="fade-in-section fade-in-delay-3">
          <div className="wedding-divider mt-10" />
          <p className="wedding-subheading text-xs md:text-sm mt-6">7 de Julho de 2027</p>
          <p className="text-muted-foreground font-light mt-2 text-sm">Mafra, Portugal</p>
        </div>

        <div className="fade-in-section fade-in-delay-4 mt-12 md:mt-16">
          <CountdownTimer targetDate={weddingDate} />
        </div>

        <div className="fade-in-section fade-in-delay-4 mt-12">
          <a
            href="#rsvp"
            className="inline-block px-8 py-3 border border-primary text-primary text-sm tracking-[0.2em] uppercase font-light hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Confirmar Presença
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 fade-in-section fade-in-delay-4">
        <div className="w-px h-12 bg-primary/30 mx-auto" />
      </div>
    </section>
  );
};

export default HeroSection;

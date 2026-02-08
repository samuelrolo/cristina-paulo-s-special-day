import { MapPin, Clock, PartyPopper, Church } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const events = [
  {
    icon: Church,
    title: "Cerimónia",
    time: "15:00",
    location: "Mafra",
    description: "Cerimónia religiosa num cenário histórico e deslumbrante.",
    mapUrl: "https://www.google.com/maps/search/Mafra+Portugal",
  },
  {
    icon: PartyPopper,
    title: "Festa",
    time: "17:30",
    location: "Quinta do Lumarinho",
    description: "Cocktail, jantar e festa num ambiente encantador rodeado de natureza.",
    mapUrl: "https://www.google.com/maps/search/Quinta+do+Lumarinho",
  },
];

const WeddingDetails = () => {
  return (
    <section id="detalhes" className="wedding-section bg-secondary/30">
      <div className="wedding-container text-center">
        <ScrollReveal>
          <p className="wedding-subheading text-xs mb-4">O Grande Dia</p>
          <h2 className="wedding-heading">Detalhes</h2>
          <div className="wedding-divider" />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-12">
          {events.map((event, index) => (
            <ScrollReveal key={event.title} delay={index * 150}>
              <div className="wedding-card text-center group hover:shadow-lg transition-shadow duration-300">
                <event.icon className="w-8 h-8 text-accent mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-2">
                  {event.title}
                </h3>
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                  <Clock className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm tracking-wider">{event.time}</span>
                </div>
                <p className="wedding-body mb-4">{event.description}</p>
                <div className="flex items-center justify-center gap-2 text-primary">
                  <MapPin className="w-4 h-4" strokeWidth={1.5} />
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm tracking-wider hover:text-accent transition-colors underline underline-offset-4"
                  >
                    {event.location}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="mt-12 p-6 border border-border rounded-sm">
            <p className="wedding-subheading text-xs mb-3">Programa</p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground font-light">
              <span>15:00 — Cerimónia</span>
              <span className="text-gold">·</span>
              <span>16:30 — Cocktail</span>
              <span className="text-gold">·</span>
              <span>18:30 — Jantar</span>
              <span className="text-gold">·</span>
              <span>21:00 — Festa & Dança</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WeddingDetails;

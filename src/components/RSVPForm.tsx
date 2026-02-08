import { useState } from "react";
import { Heart, Users, UtensilsCrossed, MessageCircle, Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { toast } from "sonner";

interface RSVPData {
  name: string;
  email: string;
  attending: "yes" | "no" | "";
  guests: number;
  dietaryRestrictions: string;
  message: string;
}

const RSVPForm = () => {
  const [formData, setFormData] = useState<RSVPData>({
    name: "",
    email: "",
    attending: "",
    guests: 0,
    dietaryRestrictions: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.attending) {
      toast.error("Por favor preencha o nome e confirme a presença.");
      return;
    }

    // For now, store locally. Backend can be added later.
    setSubmitted(true);
    toast.success("Obrigado pela sua confirmação! 💕");
  };

  if (submitted) {
    return (
      <section id="rsvp" className="wedding-section">
        <div className="wedding-container text-center">
          <ScrollReveal>
            <div className="wedding-card max-w-lg mx-auto py-12">
              <Check className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="font-serif text-3xl font-light text-foreground mb-3">
                Obrigado, {formData.name}!
              </h3>
              <p className="wedding-body">
                {formData.attending === "yes"
                  ? "Estamos muito felizes por contar convosco neste dia tão especial! 💕"
                  : "Lamentamos que não possam estar presentes. Estarão nos nossos corações! 💕"}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="wedding-section">
      <div className="wedding-container text-center">
        <ScrollReveal>
          <p className="wedding-subheading text-xs mb-4">Esperamos por Vós</p>
          <h2 className="wedding-heading">Confirmar Presença</h2>
          <div className="wedding-divider" />
          <p className="wedding-body max-w-lg mx-auto mt-4">
            Por favor confirmem a vossa presença até 7 de Maio de 2027.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 space-y-6 text-left">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-sm tracking-wider text-foreground mb-2 font-light">
                <Heart className="w-4 h-4 text-accent" strokeWidth={1.5} />
                Nome Completo *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary font-light text-sm"
                placeholder="O vosso nome"
                maxLength={100}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm tracking-wider text-foreground mb-2 font-light">
                <MessageCircle className="w-4 h-4 text-accent" strokeWidth={1.5} />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary font-light text-sm"
                placeholder="O vosso email"
                maxLength={255}
              />
            </div>

            {/* Attending */}
            <div>
              <label className="text-sm tracking-wider text-foreground mb-3 block font-light">
                Vão estar presentes? *
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: "yes" })}
                  className={`flex-1 py-3 border text-sm tracking-wider font-light transition-all duration-300 rounded-sm ${
                    formData.attending === "yes"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary"
                  }`}
                >
                  Sim, com alegria!
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: "no", guests: 0 })}
                  className={`flex-1 py-3 border text-sm tracking-wider font-light transition-all duration-300 rounded-sm ${
                    formData.attending === "no"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary"
                  }`}
                >
                  Infelizmente não
                </button>
              </div>
            </div>

            {/* Number of guests */}
            {formData.attending === "yes" && (
              <div className="animate-[fade-in_0.3s_ease-out]">
                <label className="flex items-center gap-2 text-sm tracking-wider text-foreground mb-2 font-light">
                  <Users className="w-4 h-4 text-accent" strokeWidth={1.5} />
                  Número de acompanhantes
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-light text-sm"
                >
                  <option value={0}>Apenas eu</option>
                  <option value={1}>+1 acompanhante</option>
                  <option value={2}>+2 acompanhantes</option>
                  <option value={3}>+3 acompanhantes</option>
                  <option value={4}>+4 acompanhantes</option>
                </select>
              </div>
            )}

            {/* Dietary restrictions */}
            {formData.attending === "yes" && (
              <div className="animate-[fade-in_0.3s_ease-out]">
                <label className="flex items-center gap-2 text-sm tracking-wider text-foreground mb-2 font-light">
                  <UtensilsCrossed className="w-4 h-4 text-accent" strokeWidth={1.5} />
                  Restrições Alimentares
                </label>
                <input
                  type="text"
                  value={formData.dietaryRestrictions}
                  onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary font-light text-sm"
                  placeholder="Ex: Vegetariano, alergias, intolerâncias..."
                  maxLength={500}
                />
              </div>
            )}

            {/* Message */}
            <div>
              <label className="text-sm tracking-wider text-foreground mb-2 block font-light">
                Deixar uma mensagem aos noivos
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary font-light text-sm resize-none"
                placeholder="Uma palavra carinhosa para a Cristina e o Paulo..."
                maxLength={1000}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-accent text-accent-foreground text-sm tracking-[0.2em] uppercase font-light hover:opacity-90 transition-all duration-300 rounded-sm"
            >
              Confirmar
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default RSVPForm;

import { ChevronDown } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useState } from "react";

const faqs = [
  {
    question: "As crianças são bem-vindas?",
    answer: "Sim, as crianças são bem-vindas! Teremos um espaço dedicado para os mais pequenos durante a festa.",
  },
  {
    question: "Qual é o dress code?",
    answer: "O dress code é formal elegante. Sugerimos tons neutros e elegantes — evitem branco, por favor! 😊",
  },
  {
    question: "Existe estacionamento no local?",
    answer: "Sim, tanto a cerimónia como a Quinta do Lumarinho dispõem de estacionamento gratuito para os convidados.",
  },
  {
    question: "Posso sugerir músicas para a festa?",
    answer: "Claro que sim! Podem deixar as vossas sugestões musicais no formulário de confirmação de presença.",
  },
  {
    question: "Há alojamento próximo?",
    answer: "Sim! Recomendamos o Hotel & Spa na região de Mafra. Temos um código de desconto especial — contactem-nos para mais informações.",
  },
  {
    question: "A que horas termina a festa?",
    answer: "A festa está prevista terminar por volta das 3:00 da manhã. Dancem até não poder mais! 💃🕺",
  },
  {
    question: "Como chego ao local da cerimónia?",
    answer: "A cerimónia será em Mafra. Podem utilizar os links do Google Maps disponíveis na secção de detalhes acima para obter direções.",
  },
  {
    question: "Posso levar acompanhante?",
    answer: "Os convites são pessoais. Se tiver dúvidas, por favor contactem-nos diretamente.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="wedding-section bg-secondary/30">
      <div className="wedding-container text-center">
        <ScrollReveal>
          <p className="wedding-subheading text-xs mb-4">Questões</p>
          <h2 className="wedding-heading">Perguntas Frequentes</h2>
          <div className="wedding-divider" />
        </ScrollReveal>

        <div className="max-w-2xl mx-auto mt-10 space-y-3 text-left">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 80}>
              <div className="border border-border rounded-sm overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-card/50 transition-colors"
                >
                  <span className="font-serif text-lg text-foreground">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-4 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-4 wedding-body text-sm">{faq.answer}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

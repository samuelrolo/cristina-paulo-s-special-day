import { useState, useEffect } from "react";

const WeddingRings = ({ className = "", size = 64 }: { className?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Left ring */}
    <ellipse
      cx="38"
      cy="40"
      rx="22"
      ry="22"
      stroke="hsl(var(--gold))"
      strokeWidth="3"
      fill="none"
    />
    <ellipse
      cx="38"
      cy="40"
      rx="18"
      ry="18"
      stroke="hsl(var(--gold-light))"
      strokeWidth="1"
      fill="none"
      opacity="0.5"
    />
    {/* Right ring */}
    <ellipse
      cx="62"
      cy="40"
      rx="22"
      ry="22"
      stroke="hsl(var(--gold))"
      strokeWidth="3"
      fill="none"
    />
    <ellipse
      cx="62"
      cy="40"
      rx="18"
      ry="18"
      stroke="hsl(var(--gold-light))"
      strokeWidth="1"
      fill="none"
      opacity="0.5"
    />
    {/* Small diamond on left ring */}
    <path
      d="M38 20 L40 16 L38 12 L36 16 Z"
      fill="hsl(var(--gold))"
      opacity="0.8"
    />
  </svg>
);

interface OpeningAnimationProps {
  onComplete: () => void;
}

const OpeningAnimation = ({ onComplete }: OpeningAnimationProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => onComplete(), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-1000 ${
        phase >= 3 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className={`transition-all duration-1000 ${phase >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
        <WeddingRings size={120} className="animate-rings-spin" />
      </div>
      
      <div className={`mt-8 text-center transition-all duration-700 ${phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <p className="wedding-subheading text-sm tracking-[0.3em] mb-3">É com muita alegria que vos convidamos</p>
        <h1 className="font-serif text-5xl md:text-7xl font-light text-foreground">
          Cristina <span className="text-gold italic">&</span> Paulo
        </h1>
        <p className="mt-4 text-muted-foreground font-light tracking-widest text-sm">26 · 09 · 2026</p>
      </div>
    </div>
  );
};

export { OpeningAnimation, WeddingRings };

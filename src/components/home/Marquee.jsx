import React from "react";

const items = [
  "Qualidade Premium",
  "Atacado Exclusivo",
  "Entrega para Todo Brasil",
  "Novidades Semanais",
  "Moda Fitness",
  "Revendedoras",
];

export default function Marquee() {
  return (
    <section className="bg-primary text-primary-foreground py-6 overflow-hidden border-y border-primary">
      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-16">
            <span className="font-serif text-xl md:text-2xl italic">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          </div>
        ))}
      </div>
    </section>
  );
}

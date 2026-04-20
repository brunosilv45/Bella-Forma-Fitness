import React from "react";
import { motion } from "framer-motion";
import { Package, Truck, Sparkles, HandCoins } from "lucide-react";

const benefits = [
  {
    icon: Package,
    title: "Kits Exclusivos",
    desc: "Sortimentos pensados para maximizar seu giro e lucro.",
  },
  {
    icon: HandCoins,
    title: "Preços Atacado",
    desc: "Condições especiais para revendedoras a partir de pequenas quantidades.",
  },
  {
    icon: Truck,
    title: "Envio Nacional",
    desc: "Enviamos para todo o Brasil com rapidez e segurança.",
  },
  {
    icon: Sparkles,
    title: "Novidades Sempre",
    desc: "Novas coleções toda semana para surpreender suas clientes.",
  },
];

export default function Wholesale() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs tracking-luxe uppercase text-primary">
            Por que Bella Forma
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-3">
            Feito para quem <em className="text-primary">revende</em>.
          </h2>
          <p className="text-muted-foreground text-lg mt-6">
            Um universo completo de moda fitness, pensado para impulsionar o seu
            negócio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background p-10 text-center group hover:bg-secondary/50 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 border border-primary/30 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <b.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl mb-3">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

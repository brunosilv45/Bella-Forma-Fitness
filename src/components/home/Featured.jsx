import React from "react";
import { motion } from "framer-motion";

export default function Featured() {
  return (
    <section className="py-24 md:py-32 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img
              src="https://media.base44.com/images/public/69e4fe10717171f12456abe4/34c7f7848_generated_dbdc0ebc.png"
              alt="Nada básico"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-luxe uppercase text-primary">
            Coleção Essenciais
          </span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl mt-4 leading-none">
            Não pode <em className="text-primary">faltar</em>,
            <br />
            <span className="italic font-light">nada básico.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mt-8 max-w-md">
            Peças fundamentais que toda revendedora precisa ter no estoque.
            Confecção impecável, modelagem que valoriza e tecidos de alta
            performance.
          </p>
          <ul className="mt-10 space-y-4">
            {[
              "Tecidos de alta compressão",
              "Costura reforçada e acabamento premium",
              "Modelagem exclusiva para brasileiras",
              "Do PP ao Plus Size",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-6 h-px bg-primary mt-3 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

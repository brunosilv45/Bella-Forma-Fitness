import React from "react";
import { motion } from "framer-motion";
import { Instagram, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-luxe uppercase text-primary">
            Nossa História
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mt-4 leading-tight">
            Mais que moda, <br />
            <em className="text-primary">um movimento.</em>
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] overflow-hidden bg-muted"
          >
            <img
              src="https://media.base44.com/images/public/69e4fe10717171f12456abe4/710b2a6e7_generated_b17107df.png"
              alt="Bella Forma"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-foreground leading-relaxed"
          >
            <p className="font-serif text-2xl md:text-3xl leading-snug">
              A Bella Forma Fitness nasceu da paixão por vestir mulheres fortes
              e empoderar revendedoras apaixonadas pelo universo fitness.
            </p>
            <p className="text-muted-foreground">
              Trabalhamos apenas com moda fitness no{" "}
              <strong>atacado</strong>, oferecendo às revendedoras peças de
              altíssima qualidade, com modelagens exclusivas e tecidos escolhidos
              a dedo.
            </p>
            <p className="text-muted-foreground">
              Cada coleção é pensada para que sua loja venda mais e com mais
              diferencial. Seja bem-vinda ao nosso universo.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                to="/atacado"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-xs tracking-luxe uppercase hover:bg-primary/90"
              >
                Seja Revendedora
              </Link>
              <a
                href="https://www.instagram.com/bellaformafitness.oficial/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-foreground/20 text-foreground text-xs tracking-luxe uppercase hover:bg-foreground hover:text-background transition-all"
              >
                <Instagram className="w-4 h-4" /> Instagram
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-secondary/50 p-10 md:p-16 text-center"
        >
          <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Nosso Showroom
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-2">
            Av. J-2 com a L-12, QD 04 Lt 32, Sala 03 — Papillon Park
          </p>
          <p className="text-muted-foreground">
            Seg a Sex: 09h às 19h · Sáb: 09h às 16h
          </p>
        </motion.div>
      </div>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Instagram, ArrowRight } from "lucide-react";

const hours = [
  { day: "Segunda", time: "09h às 19h" },
  { day: "Terça", time: "09h às 19h" },
  { day: "Quarta", time: "09h às 19h" },
  { day: "Quinta", time: "09h às 19h" },
  { day: "Sexta", time: "09h às 19h" },
  { day: "Sábado", time: "09h às 16h" },
];

export default function Visit() {
  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-luxe uppercase text-accent">
            Visite-nos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 leading-tight">
            Venha conhecer nosso{" "}
            <em className="italic text-accent">showroom</em>.
          </h2>
          <p className="text-primary-foreground/70 text-lg mt-6 max-w-md">
            Um espaço pensado para você escolher com calma as peças que vão
            transformar sua loja.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 mt-1 text-accent flex-shrink-0" />
              <div>
                <p className="text-xs tracking-luxe uppercase text-primary-foreground/50 mb-1">
                  Endereço
                </p>
                <p className="text-primary-foreground leading-relaxed">
                  Av. J-2 com a L-12, QD 04 Lt 32, Sala 03
                  <br />
                  Papillon Park
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Instagram className="w-5 h-5 mt-1 text-accent flex-shrink-0" />
              <div>
                <p className="text-xs tracking-luxe uppercase text-primary-foreground/50 mb-1">
                  Instagram
                </p>
                <a
                  href="https://www.instagram.com/bellaformafitness.oficial/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
                >
                  @bellaformafitness.oficial
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-background text-foreground p-10 md:p-12 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-2xl md:text-3xl">
              Horário de Atendimento
            </h3>
          </div>
          <div className="space-y-4">
            {hours.map((h) => (
              <div
                key={h.day}
                className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
              >
                <span className="text-xs tracking-luxe uppercase text-muted-foreground">
                  {h.day}
                </span>
                <span className="font-serif text-lg">{h.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-xs tracking-luxe uppercase text-muted-foreground mb-2">
              Domingo
            </p>
            <p className="font-serif text-lg italic text-muted-foreground">
              Fechado
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

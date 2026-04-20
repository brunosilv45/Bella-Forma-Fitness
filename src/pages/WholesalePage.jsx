import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Instagram,
  MapPin,
  Clock,
  Check,
} from "lucide-react";

export default function WholesalePage() {
  const [form, setForm] = useState({
    name: "",
    store: "",
    city: "",
    phone: "",
    message: "",
  });

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Olá Bella Forma! Gostaria de fazer um pedido no atacado.\n\n*Nome:* ${form.name}\n*Loja:* ${form.store}\n*Cidade:* ${form.city}\n*Telefone:* ${form.phone}\n\n*Interesse:*\n${form.message}`
    );
    window.open(`https://wa.me/5562986442634?text=${text}`, "_blank");
  };

  const benefits = [
    "Preços exclusivos para revendedoras",
    "Peças de altíssima qualidade",
    "Entrega para todo o Brasil",
    "Novas coleções toda semana",
    "Atendimento personalizado",
    "Kits sortidos sob medida",
  ];

  return (
    <div className="pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <span className="text-xs tracking-luxe uppercase text-primary">
            Atacado
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mt-4 leading-tight">
            Seja uma <em className="text-primary">revendedora</em>.
          </h1>
          <p className="text-muted-foreground text-lg mt-6">
            Entre em contato e descubra as condições especiais para você vender a
            moda fitness mais desejada do Brasil.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-8">
              Vantagens exclusivas
            </h2>
            <ul className="space-y-4 mb-12">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>

            <div className="bg-secondary/50 p-8 space-y-5">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-luxe uppercase text-muted-foreground mb-1">
                    Showroom
                  </p>
                  <p className="text-foreground">
                    Av. J-2 com a L-12, QD 04 Lt 32, Sala 03 — Papillon Park
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-luxe uppercase text-muted-foreground mb-1">
                    Horário
                  </p>
                  <p className="text-foreground">
                    Seg a Sex: 09h às 19h · Sáb: 09h às 16h
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Instagram className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-luxe uppercase text-muted-foreground mb-1">
                    Instagram
                  </p>
                  <a
                    href="https://www.instagram.com/bellaformafitness.oficial/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground hover:text-primary"
                  >
                    @bellaformafitness.oficial
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleWhatsApp}
            className="bg-primary text-primary-foreground p-8 md:p-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-2">
              Fazer Pedido
            </h2>
            <p className="text-primary-foreground/70 mb-8 text-sm">
              Preencha abaixo e te levaremos direto ao WhatsApp para finalizar.
            </p>

            <div className="space-y-5">
              <div>
                <label className="text-[10px] tracking-luxe uppercase text-primary-foreground/60">
                  Nome
                </label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-primary-foreground/30 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-luxe uppercase text-primary-foreground/60">
                  Sua loja
                </label>
                <input
                  type="text"
                  value={form.store}
                  onChange={(e) =>
                    setForm({ ...form, store: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-primary-foreground/30 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Nome da loja (opcional)"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] tracking-luxe uppercase text-primary-foreground/60">
                    Cidade
                  </label>
                  <input
                    required
                    type="text"
                    value={form.city}
                    onChange={(e) =>
                      setForm({ ...form, city: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-primary-foreground/30 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Cidade"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-luxe uppercase text-primary-foreground/60">
                    Telefone
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-primary-foreground/30 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent transition-colors"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] tracking-luxe uppercase text-primary-foreground/60">
                  Interesse
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-primary-foreground/30 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Conte-nos o que procura..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-10 w-full bg-accent text-accent-foreground py-4 text-xs tracking-luxe uppercase hover:bg-accent/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Enviar via WhatsApp
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

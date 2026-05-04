import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10"
        >
          <span className="inline-block text-xs tracking-luxe uppercase text-primary mb-6 border-b border-primary pb-1">
            Atacado · Nova Coleção
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground mb-8">
            Força, estilo e{" "}
            <em className="text-primary not-italic">liberdade</em> em cada peça.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-10">
            Moda fitness feminina para revendedoras que buscam qualidade premium,
            design exclusivo e o melhor preço no atacado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/colecao"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-xs tracking-luxe uppercase hover:bg-primary/90 transition-all"
            >
              Ver Coleção
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/atacado"
              className="inline-flex items-center justify-center px-8 py-4 border border-foreground/20 text-foreground text-xs tracking-luxe uppercase hover:bg-foreground hover:text-background transition-all"
            >
              Fazer Pedido Atacado
            </Link>
          </div>

          <div className="flex items-center gap-8 mt-16 pt-8 border-t border-border">
            <div>
              <p className="font-serif text-3xl text-primary">P–G3</p>
              <p className="text-xs tracking-luxe uppercase text-muted-foreground mt-1">
                Tamanhos
              </p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="font-serif text-3xl text-primary">100%</p>
              <p className="text-xs tracking-luxe uppercase text-muted-foreground mt-1">
                Qualidade
              </p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="font-serif text-3xl text-primary">8+</p>
              <p className="text-xs tracking-luxe uppercase text-muted-foreground mt-1">
                Categorias
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -top-6 -right-6 w-32 h-32 md:w-40 md:h-40 bg-accent/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            <img
              src="https://dfrjpvwdigdhxqbdgubm.supabase.co/storage/v1/object/public/product-images/blusa_de_manga/1776703523251-blusa-de-manga-03.png"
              alt="Blusa Com Manga Branca"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-background border border-border p-5 shadow-lg hidden md:block">
            <p className="text-xs tracking-luxe uppercase text-muted-foreground">
              Destaque
            </p>
            <p className="font-serif text-xl text-foreground mt-1">
              Blusa Com Manga Branca
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

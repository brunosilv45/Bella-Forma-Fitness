import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Calças",
    slug: "calcas",
    image:
      "https://dfrjpvwdigdhxqbdgubm.supabase.co/storage/v1/object/public/product-images/calca_com_bolso/1776703694456-calca-com-bolso-01.png",
    desc: "Lisa e com Bolso",
  },
  {
    name: "Shorts",
    slug: "shorts",
    image:
      "https://dfrjpvwdigdhxqbdgubm.supabase.co/storage/v1/object/public/product-images/short/1776699474021-short-06.png",
    desc: "Liso e com Bolso",
  },
  {
    name: "Ciclistas",
    slug: "ciclista",
    image:
      "https://dfrjpvwdigdhxqbdgubm.supabase.co/storage/v1/object/public/product-images/ciclista_lisa/1776702856583-ciclista-lisa-01.png",
    desc: "Lisa e com Bolso",
  },
  {
    name: "Regatas",
    slug: "regata",
    image:
      "https://dfrjpvwdigdhxqbdgubm.supabase.co/storage/v1/object/public/product-images/regata/1776700804870-regata-01.png",
    desc: "Nadador, Tapa Bumbum, Arrastão e Tule",
  },
  {
    name: "Blusas",
    slug: "blusas",
    image:
      "https://dfrjpvwdigdhxqbdgubm.supabase.co/storage/v1/object/public/product-images/blusa_long/1776703598586-blusa-long-01.png",
    desc: "Com Manga e Long",
  },
  {
    name: "Croppeds",
    slug: "cropped",
    image:
      "https://dfrjpvwdigdhxqbdgubm.supabase.co/storage/v1/object/public/product-images/cropped/1776703074816-cropped-01.png",
    desc: "Peças versáteis para o dia a dia",
  },
  {
    name: "Tops",
    slug: "top",
    image:
      "https://dfrjpvwdigdhxqbdgubm.supabase.co/storage/v1/object/public/product-images/top_alca/1776698078258-top-alca-01.png",
    desc: "Faixa, Nadador e Regata",
  },
  {
    name: "Macacão",
    slug: "macacao",
    image:
      "https://dfrjpvwdigdhxqbdgubm.supabase.co/storage/v1/object/public/product-images/macacao_saia/1776702063006-macacao-saia-01.png",
    desc: "Curto e Longo",
  },
  {
    name: "Plus Size",
    slug: "plus_size",
    image:
      "https://dfrjpvwdigdhxqbdgubm.supabase.co/storage/v1/object/public/product-images/plus_size/1776697543298-plus-size-01.png",
    desc: "Top, Regatas, Blusas, Ciclista e Calça",
  },
];

export default function Categories() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <span className="text-xs tracking-luxe uppercase text-primary">
              Categorias
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-3 max-w-xl">
              Para cada mulher,{" "}
              <em className="text-primary">um estilo</em>.
            </h2>
          </div>
          <Link
            to="/colecao"
            className="inline-flex items-center gap-2 text-xs tracking-luxe uppercase text-foreground border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors self-start md:self-auto"
          >
            Ver todas <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link to={`/colecao?cat=${cat.slug}`} className="group block">
                <div className="aspect-[3/4] overflow-hidden bg-muted mb-4 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">
                      {cat.desc}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

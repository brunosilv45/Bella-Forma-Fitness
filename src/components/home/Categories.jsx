import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Plus Size",
    slug: "plus_size",
    image:
      "https://media.base44.com/images/public/69e4fe10717171f12456abe4/41ffaed09_generated_36d0eb5e.png",
    desc: "Todas as mulheres, toda a beleza",
  },
  {
    name: "Tactel",
    slug: "tactel",
    image:
      "https://media.base44.com/images/public/69e4fe10717171f12456abe4/2eb3b59b9_generated_dc1e381d.png",
    desc: "Shorts leves e confortáveis",
  },
  {
    name: "Tops",
    slug: "top",
    image:
      "https://media.base44.com/images/public/69e4fe10717171f12456abe4/43e40950f_generated_03e887e1.png",
    desc: "Alça, Dry Fit, Nadador e mais",
  },
  {
    name: "Shorts",
    slug: "short",
    image:
      "https://media.base44.com/images/public/69e4fe10717171f12456abe4/ca85a05ac_generated_a5fe7af0.png",
    desc: "Bella Fit, Duplo, Saia e mais",
  },
  {
    name: "Regatas",
    slug: "regata",
    image:
      "https://media.base44.com/images/public/69e4fe10717171f12456abe4/34c7f7848_generated_dbdc0ebc.png",
    desc: "Regata e Regata de Ajuste",
  },
  {
    name: "Macacão",
    slug: "macacão",
    image:
      "https://media.base44.com/images/public/69e4fe10717171f12456abe4/b7a50503a_generated_77cf7ef2.png",
    desc: "Peça única, máximo estilo",
  },
  {
    name: "Ciclistas",
    slug: "ciclista_lisa",
    image:
      "https://media.base44.com/images/public/69e4fe10717171f12456abe4/710b2a6e7_generated_b17107df.png",
    desc: "Lisa e com Bolso",
  },
  {
    name: "Cropped",
    slug: "cropped",
    image:
      "https://media.base44.com/images/public/69e4fe10717171f12456abe4/43e40950f_generated_03e887e1.png",
    desc: "Peças versáteis para o dia a dia",
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

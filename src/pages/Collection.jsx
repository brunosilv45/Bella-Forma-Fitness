import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/products/ProductCard";
import CategoryFilter from "@/components/products/CategoryFilter";

export default function Collection() {
  const [activeCat, setActiveCat] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat");
    if (cat) setActiveCat(cat);
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const groupMap = {
    calcas: ["calca_lisa", "calca_com_bolso", "calca_com_detalhes", "gloss_calca", "cirre_3d"],
    shorts: ["short_liso", "short_com_bolso", "short", "short_duplo", "short_com_detalhes", "short_bella_fit", "short_saia", "gloss_short", "tactel"],
    ciclista: ["ciclista_lisa", "ciclista_com_bolso"],
    regata: ["regata_nadador", "regata_tapa_bumbum", "regata_arrastao", "regata_tule", "regata", "regata_de_ajuste"],
    blusas: ["blusa_com_manga", "blusa_long", "blusa_de_manga"],
    top: ["top_faixa", "top_nadador", "top_regata", "top_dry_fit", "top_estampado", "top_alca"],
    macacao: ["macacao_curto", "macacao_longo", "macacao_saia"],
    plus_size: ["plus_size_top", "plus_size_regata", "plus_size_blusa", "plus_size_ciclista", "plus_size_calca"],
  };

  const filtered =
    activeCat === "all"
      ? products
      : groupMap[activeCat]
        ? products.filter((p) => p.category === activeCat || groupMap[activeCat].includes(p.category))
        : products.filter((p) => p.category === activeCat);

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-luxe uppercase text-primary">
            Nossa Coleção
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mt-4">
            Moda Fitness <em className="text-primary">Premium</em>
          </h1>
          <p className="text-muted-foreground text-lg mt-6 max-w-xl mx-auto">
            Peças selecionadas com carinho para sua loja. Passe o mouse sobre
            uma peça e clique no WhatsApp para solicitar atacado.
          </p>
        </motion.div>

        <div className="mb-16">
          <CategoryFilter active={activeCat} onChange={setActiveCat} />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-muted mb-4" />
                  <div className="h-3 bg-muted w-20 mb-2" />
                  <div className="h-5 bg-muted w-40" />
                </div>
              ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-muted-foreground">
              Nenhum produto encontrado nesta categoria.
            </p>
            <p className="text-muted-foreground mt-2">
              Cadastre produtos pelo painel admin ou selecione outra categoria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

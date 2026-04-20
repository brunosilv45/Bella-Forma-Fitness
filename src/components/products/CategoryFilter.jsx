import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const topSubs = [
  { value: "top_alca", label: "Top Alça" },
  { value: "top_bella_shopee", label: "Top Bella Shopee" },
  { value: "top_dry_fit", label: "Top Dry Fit" },
  { value: "top_estampado", label: "Top Estampado" },
  { value: "top_faixa", label: "Top Faixa" },
  { value: "top_nadador", label: "Top Nadador" },
];

const cats = [
  { value: "all", label: "Todas" },
  { value: "plus_size", label: "Plus Size" },
  { value: "tactel", label: "Tactel" },
  { value: "top", label: "Top", subs: topSubs },
  { value: "short", label: "Short" },
  { value: "short_bella_fit", label: "Short Bella Fit" },
  { value: "short_com_bolso", label: "Short com Bolso" },
  { value: "short_com_detalhes", label: "Short com Detalhes" },
  { value: "short_duplo", label: "Short Duplo" },
  { value: "short_saia", label: "Short Saia" },
  { value: "regata", label: "Regata" },
  { value: "regata_de_ajuste", label: "Regata de Ajuste" },
  { value: "macacão", label: "Macacão" },
  { value: "calca_shopee", label: "Calça Shopee" },
  { value: "ciclista_com_bolso", label: "Ciclista com Bolso" },
  { value: "ciclista_lisa", label: "Ciclista Lisa" },
  { value: "cirre_3d", label: "Cirrê 3D" },
  { value: "cropped", label: "Cropped" },
  { value: "gloss", label: "GLOSS" },
  { value: "blusa_de_manga", label: "Blusa de Manga" },
  { value: "blusa_long", label: "Blusa Long" },
  { value: "calca_com_bolso", label: "Calça com Bolso" },
  { value: "calca_com_detalhes", label: "Calça com Detalhes" },
  { value: "top_alca", label: "Top Alça", hidden: true },
  { value: "top_bella_shopee", label: "Top Bella Shopee", hidden: true },
  { value: "top_dry_fit", label: "Top Dry Fit", hidden: true },
  { value: "top_estampado", label: "Top Estampado", hidden: true },
  { value: "top_faixa", label: "Top Faixa", hidden: true },
  { value: "top_nadador", label: "Top Nadador", hidden: true },
];

const allTopValues = topSubs.map((s) => s.value);

export default function CategoryFilter({ active, onChange }) {
  const [topOpen, setTopOpen] = useState(false);

  const isTopActive = active === "top" || allTopValues.includes(active);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {cats
        .filter((c) => !c.hidden)
        .map((cat) =>
          cat.subs ? (
            <div key={cat.value} className="relative">
              <button
                onClick={() => setTopOpen(!topOpen)}
                className={`px-4 py-2 text-xs tracking-luxe uppercase transition-all inline-flex items-center gap-1.5 ${
                  isTopActive
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-foreground/70 hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {cat.label}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${topOpen ? "rotate-180" : ""}`}
                />
              </button>

              {topOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setTopOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 z-20 bg-background border border-border shadow-xl min-w-[200px]">
                    <button
                      onClick={() => {
                        onChange("top");
                        setTopOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-xs tracking-luxe uppercase transition-colors ${
                        active === "top"
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground/70 hover:bg-secondary/50 hover:text-foreground"
                      }`}
                    >
                      Todos os Tops
                    </button>
                    {cat.subs.map((sub) => (
                      <button
                        key={sub.value}
                        onClick={() => {
                          onChange(sub.value);
                          setTopOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-xs tracking-luxe uppercase transition-colors border-t border-border ${
                          active === sub.value
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground/70 hover:bg-secondary/50 hover:text-foreground"
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              key={cat.value}
              onClick={() => onChange(cat.value)}
              className={`px-4 py-2 text-xs tracking-luxe uppercase transition-all ${
                active === cat.value
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-foreground/70 hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          )
        )}
    </div>
  );
}

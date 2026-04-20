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

const macacaoSubs = [
  { value: "macacão_saia", label: "Macacão Saia" },
  { value: "macacão_curto", label: "Macacão Curto" },
  { value: "macacão_longo", label: "Macacão Longo" },
];

const glossSubs = [
  { value: "gloss_calca", label: "Calça" },
  { value: "gloss_short", label: "Short" },
];

const cats = [
  { value: "all", label: "Todas" },
  { value: "plus_size", label: "Plus Size" },
  { value: "tactel", label: "Tactel" },
  { value: "top", label: "Top", subs: topSubs, allLabel: "Todos os Tops" },
  { value: "short", label: "Short" },
  { value: "short_bella_fit", label: "Short Bella Fit" },
  { value: "short_com_bolso", label: "Short com Bolso" },
  { value: "short_com_detalhes", label: "Short com Detalhes" },
  { value: "short_duplo", label: "Short Duplo" },
  { value: "short_saia", label: "Short Saia" },
  { value: "regata", label: "Regata" },
  { value: "regata_de_ajuste", label: "Regata de Ajuste" },
  { value: "macacão", label: "Macacão", subs: macacaoSubs, allLabel: "Todos os Macacões" },
  { value: "calca_shopee", label: "Calça Shopee" },
  { value: "ciclista_com_bolso", label: "Ciclista com Bolso" },
  { value: "ciclista_lisa", label: "Ciclista Lisa" },
  { value: "cirre_3d", label: "Cirrê 3D" },
  { value: "cropped", label: "Cropped" },
  { value: "gloss", label: "GLOSS", subs: glossSubs, allLabel: "Todos os GLOSS" },
  { value: "blusa_de_manga", label: "Blusa de Manga" },
  { value: "blusa_long", label: "Blusa Long" },
  { value: "calca_com_bolso", label: "Calça com Bolso" },
  { value: "calca_com_detalhes", label: "Calça com Detalhes" },
];

const allTopValues = topSubs.map((s) => s.value);
const allMacacaoValues = macacaoSubs.map((s) => s.value);
const allGlossValues = glossSubs.map((s) => s.value);
const allSubValues = [...allTopValues, ...allMacacaoValues, ...allGlossValues];

export default function CategoryFilter({ active, onChange }) {
  const [openMenu, setOpenMenu] = useState(null);

  function isGroupActive(cat) {
    if (active === cat.value) return true;
    if (cat.subs) return cat.subs.some((s) => s.value === active);
    return false;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {cats.map((cat) =>
        cat.subs ? (
          <div key={cat.value} className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === cat.value ? null : cat.value)}
              className={`px-4 py-2 text-xs tracking-luxe uppercase transition-all inline-flex items-center gap-1.5 ${
                isGroupActive(cat)
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-foreground/70 hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {cat.label}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${openMenu === cat.value ? "rotate-180" : ""}`}
              />
            </button>

            {openMenu === cat.value && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setOpenMenu(null)}
                />
                <div className="absolute top-full left-0 mt-2 z-20 bg-background border border-border shadow-xl min-w-[200px]">
                  <button
                    onClick={() => {
                      onChange(cat.value);
                      setOpenMenu(null);
                    }}
                    className={`w-full text-left px-4 py-3 text-xs tracking-luxe uppercase transition-colors ${
                      active === cat.value
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/70 hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    {cat.allLabel}
                  </button>
                  {cat.subs.map((sub) => (
                    <button
                      key={sub.value}
                      onClick={() => {
                        onChange(sub.value);
                        setOpenMenu(null);
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

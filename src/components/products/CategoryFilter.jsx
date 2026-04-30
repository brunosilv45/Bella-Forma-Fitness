import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const calcaSubs = [
  { value: "calca_lisa", label: "Lisa" },
  { value: "calca_com_bolso", label: "Com Bolso" },
];

const shortSubs = [
  { value: "short_liso", label: "Liso" },
  { value: "short_com_bolso", label: "Com Bolso" },
];

const ciclistaSubs = [
  { value: "ciclista_lisa", label: "Lisa" },
  { value: "ciclista_com_bolso", label: "Com Bolso" },
];

const regataSubs = [
  { value: "regata_nadador", label: "Nadador" },
  { value: "regata_tapa_bumbum", label: "Tapa Bumbum" },
  { value: "regata_arrastao", label: "Arrastão" },
  { value: "regata_tule", label: "Tule" },
];

const blusaSubs = [
  { value: "blusa_com_manga", label: "Com Manga" },
  { value: "blusa_long", label: "Long" },
];

const topSubs = [
  { value: "top_faixa", label: "Top Faixa" },
  { value: "top_nadador", label: "Top Nadador" },
  { value: "top_regata", label: "Top Regata" },
];

const macacaoSubs = [
  { value: "macacao_curto", label: "Curto" },
  { value: "macacao_longo", label: "Longo" },
  { value: "macacao_saia", label: "Saia" },
];

const plusSizeSubs = [
  { value: "plus_size_top", label: "Top" },
  { value: "plus_size_regata", label: "Regatas" },
  { value: "plus_size_blusa", label: "Blusas" },
  { value: "plus_size_ciclista", label: "Ciclista" },
  { value: "plus_size_calca", label: "Calça" },
];

const cats = [
  { value: "all", label: "Todas" },
  { value: "calcas", label: "Calça", subs: calcaSubs, allLabel: "Todas as Calças" },
  { value: "shorts", label: "Short", subs: shortSubs, allLabel: "Todos os Shorts" },
  { value: "ciclista", label: "Ciclista", subs: ciclistaSubs, allLabel: "Todas as Ciclistas" },
  { value: "regata", label: "Regata", subs: regataSubs, allLabel: "Todas as Regatas" },
  { value: "blusas", label: "Blusa", subs: blusaSubs, allLabel: "Todas as Blusas" },
  { value: "cropped", label: "Cropped" },
  { value: "top", label: "Top", subs: topSubs, allLabel: "Todos os Tops" },
  { value: "macacao", label: "Macacão", subs: macacaoSubs, allLabel: "Todos os Macacões" },
  { value: "plus_size", label: "Plus Size", subs: plusSizeSubs, allLabel: "Todos Plus Size" },
];

const allSubValues = [
  ...calcaSubs, ...shortSubs, ...ciclistaSubs, ...regataSubs,
  ...blusaSubs, ...topSubs, ...macacaoSubs, ...plusSizeSubs,
].map((s) => s.value);

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

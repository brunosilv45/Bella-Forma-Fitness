/**
 * Rótulo curto do tipo de roupa (em português), derivado do slug `category` do banco.
 * Deixa explícito se é regata, blusa, calça, ciclista, top, etc.
 */

const LABELS = {
  calca_lisa: "Calça lisa",
  calca_com_bolso: "Calça com bolso",
  calca_com_detalhes: "Calça com detalhes",
  gloss_calca: "Calça gloss",
  cirre_3d: "Calça cirré 3D",
  short_liso: "Short liso",
  short_com_bolso: "Short com bolso",
  short_duplo: "Short duplo",
  short_com_detalhes: "Short com detalhes",
  short_bella_fit: "Short Bella Fit",
  short_saia: "Short saia",
  gloss_short: "Short gloss",
  tactel: "Short tactel",
  ciclista_lisa: "Ciclista",
  ciclista_com_bolso: "Ciclista com bolso",
  regata_nadador: "Regata nadador",
  regata_arrastao: "Regata arrastão",
  regata_tule: "Regata tule",
  regata_de_ajuste: "Regata de ajuste",
  blusa_com_manga: "Blusa com manga",
  blusa_long: "Blusa long",
  blusa_de_manga: "Blusa de manga",
  blusa_tule: "Blusa tule",
  blusa_arrastao: "Blusa arrastão",
  top_faixa: "Top faixa",
  top_nadador: "Top nadador",
  top_regata: "Top regata",
  top_dry_fit: "Top dry fit",
  top_estampado: "Top estampado",
  top_alca: "Top alça",
  macacao_curto: "Macacão curto",
  macacao_longo: "Macacão longo",
  macacao_saia: "Macacão saia",
  plus_size_top: "Top · linha Plus",
  plus_size_regata: "Regata · linha Plus",
  plus_size_blusa: "Blusa · linha Plus",
  plus_size_ciclista: "Ciclista · linha Plus",
  plus_size_calca: "Calça · linha Plus",
  cropped: "Cropped",
};

function slugToTitle(slug) {
  return slug
    .split("_")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** @param {string | undefined | null} category */
export function getGarmentCategoryLabel(category) {
  const c = (category || "").trim();
  if (!c) return "Peça fitness";
  return LABELS[c] || slugToTitle(c);
}

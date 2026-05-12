/**
 * Gera uma pagina HTML autocontida (tmp_validation/index.html) com todos os
 * produtos cadastrados nesta sessao para revisao visual. Para cada produto
 * mostra id, nome atual, categoria e a imagem. O usuario pode editar inline,
 * marcar correcoes e exportar um JSON com os ajustes.
 */

const fs = require("fs");
const path = require("path");

const OUT = path.resolve(__dirname, "..", "tmp_validation");
fs.mkdirSync(OUT, { recursive: true });

const products = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "..", "tmp_session_products.json"), "utf-8"),
);

const groups = {};
for (const p of products) {
  const key = `${p.category} | ${p.name}`;
  if (!groups[key]) groups[key] = [];
  groups[key].push(p);
}

const sections = Object.keys(groups)
  .sort()
  .map((key) => {
    const items = groups[key];
    const cards = items
      .map(
        (it) => `
        <div class="card" data-id="${it.id}">
          <img src="${it.image_url}" loading="lazy" />
          <div class="meta">
            <div><b>id</b> ${it.id}</div>
            <input class="newname" type="text" placeholder="novo nome (deixe vazio para manter)" />
            <div class="categoria">cat: ${it.category}</div>
          </div>
        </div>`,
      )
      .join("\n");
    return `
    <section>
      <h2>${key} <small>(${items.length})</small></h2>
      <div class="grid">${cards}</div>
    </section>`;
  })
  .join("\n");

const html = `<!doctype html>
<html lang="pt-br">
<head>
<meta charset="utf-8" />
<title>Validacao de produtos - sessao</title>
<style>
  body { font-family: system-ui, sans-serif; background: #111; color: #eee; margin: 0; padding: 24px; }
  h1 { margin: 0 0 16px; }
  h2 { margin: 32px 0 12px; font-size: 18px; color: #ffd; border-bottom: 1px solid #333; padding-bottom: 4px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
  .card { background: #1c1c1c; border: 1px solid #2a2a2a; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; }
  .card img { width: 100%; aspect-ratio: 3/4; object-fit: cover; background: #000; }
  .meta { padding: 8px; font-size: 12px; display: flex; flex-direction: column; gap: 4px; }
  .meta b { color: #9fdfff; }
  .newname { width: 100%; padding: 4px 6px; border: 1px solid #444; background: #0f0f0f; color: #fff; font-size: 12px; border-radius: 4px; box-sizing: border-box; }
  .newname:focus { border-color: #6cf; outline: none; }
  .categoria { color: #888; font-size: 11px; }
  .toolbar { position: sticky; top: 0; background: #111; padding: 12px 0; z-index: 10; display: flex; gap: 8px; align-items: center; border-bottom: 1px solid #333; }
  button { padding: 8px 16px; background: #2a7; color: #000; border: 0; border-radius: 6px; font-weight: bold; cursor: pointer; }
  button:hover { background: #4c9; }
  #out { width: 100%; min-height: 100px; background: #000; color: #6cf; padding: 8px; font-family: monospace; font-size: 11px; border: 1px solid #333; border-radius: 6px; }
  .count { color: #6f6; font-size: 14px; }
</style>
</head>
<body>
<h1>Validacao de produtos da sessao</h1>
<p>Total: <b>${products.length}</b> produtos em <b>${Object.keys(groups).length}</b> grupos.</p>
<div class="toolbar">
  <button onclick="exportar()">Exportar correcoes (JSON)</button>
  <span class="count" id="count">0 correcoes</span>
</div>
<textarea id="out" placeholder="JSON com as correcoes aparece aqui..."></textarea>
${sections}
<script>
function colher() {
  const out = [];
  document.querySelectorAll('.card').forEach(c => {
    const id = +c.dataset.id;
    const v = c.querySelector('.newname').value.trim();
    if (v) out.push({ id, name: v });
  });
  return out;
}
function exportar() {
  const out = colher();
  document.getElementById('out').value = JSON.stringify(out, null, 2);
  document.getElementById('count').textContent = out.length + ' correcoes';
}
document.addEventListener('input', () => {
  document.getElementById('count').textContent = colher().length + ' correcoes';
});
</script>
</body>
</html>`;

fs.writeFileSync(path.join(OUT, "index.html"), html);
console.log(`Gerado: ${path.join(OUT, "index.html")}`);
console.log(`Abra no navegador, ajuste os nomes errados e clique "Exportar correcoes".`);

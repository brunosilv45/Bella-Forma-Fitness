/**
 * Upload em massa de imagens para o Supabase.
 *
 * Uso:
 *   node scripts/upload-products.js <pasta-com-imagens> <categoria>
 *
 * Exemplo:
 *   node scripts/upload-products.js public/images/tactel tactel
 *   node scripts/upload-products.js "C:\Fotos\Short Bella Fit" short_bella_fit
 *
 * O script:
 *   1. Lê todos os arquivos de imagem na pasta
 *   2. Sobe cada um para o Supabase Storage (bucket product-images/<categoria>/)
 *   3. Insere um registro na tabela `products` com nome, categoria e URL pública
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2NTU5OCwiZXhwIjoyMDkyMjQxNTk4fQ.tXPzd7xT0SoDqEfmyZ1MUkVepQ-unJjtBHSi5U-b6jM";

const BUCKET = "product-images";
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

function humanName(filename) {
  const name = path.basename(filename, path.extname(filename));
  return name
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log("Uso: node scripts/upload-products.js <pasta> <categoria>");
    console.log('Ex:  node scripts/upload-products.js "./public/images/tactel" tactel');
    process.exit(1);
  }

  const folder = path.resolve(args[0]);
  const category = args[1];

  if (!fs.existsSync(folder)) {
    console.error(`Pasta nao encontrada: ${folder}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(folder)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()));

  if (files.length === 0) {
    console.log("Nenhuma imagem encontrada na pasta.");
    process.exit(0);
  }

  console.log(`\nCategoria: ${category}`);
  console.log(`Pasta: ${folder}`);
  console.log(`Imagens encontradas: ${files.length}\n`);

  let success = 0;
  let errors = 0;

  for (const file of files) {
    const filePath = path.join(folder, file);
    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(file).toLowerCase();

    const mimeMap = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
      ".gif": "image/gif",
      ".avif": "image/avif",
    };

    const storagePath = `${category}/${Date.now()}-${file}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType: mimeMap[ext] || "image/png",
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error(`  ERRO upload ${file}: ${uploadError.message}`);
      errors++;
      continue;
    }

    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath);

    const productName = humanName(file);

    const { error: dbError } = await supabase.from("products").insert({
      name: productName,
      category,
      description: "",
      image_path: storagePath,
      image_url: urlData.publicUrl,
    });

    if (dbError) {
      console.error(`  ERRO banco ${file}: ${dbError.message}`);
      errors++;
      continue;
    }

    console.log(`  OK: ${file} -> ${productName} [${category}]`);
    success++;
  }

  console.log(`\nResultado: ${success} enviadas, ${errors} erros.`);
}

main();

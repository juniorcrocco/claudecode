#!/usr/bin/env node
/**
 * Baixa TODOS os clipes (e fotos) da pasta publica do Google Drive para
 * public/video/ e public/audio/ usando os IDs ja mapeados em
 * clips.manifest.json. Nao precisa de API key — a pasta esta compartilhada
 * como "qualquer pessoa com o link".
 *
 * Uso:
 *   node scripts/fetch-drive.mjs            # baixa os videos
 *   node scripts/fetch-drive.mjs --photos   # baixa tambem as fotos
 *
 * Rode na SUA maquina (onde o drive.google.com abre normalmente).
 * Re-executar pula o que ja foi baixado.
 */
import { createWriteStream } from 'node:fs';
import { mkdir, stat, readFile, rename, unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const VIDEO_DIR = join(ROOT, 'public', 'video');
const manifest = JSON.parse(await readFile(join(ROOT, 'clips.manifest.json'), 'utf8'));

const wantPhotos = process.argv.includes('--photos');
const CONCURRENCY = 4;

const exists = async (p) => {
  try {
    const s = await stat(p);
    return s.size > 0;
  } catch {
    return false;
  }
};

// Extrai os campos do formulario de "confirmacao de virus scan" do Drive.
function parseConfirmForm(html) {
  const action = html.match(/action="([^"]+)"/)?.[1];
  const fields = {};
  const re = /name="([^"]+)"\s+value="([^"]*)"/g;
  let m;
  while ((m = re.exec(html))) fields[m[1]] = m[2];
  if (!action) return null;
  const url = new URL(action.replace(/&amp;/g, '&'));
  for (const [k, v] of Object.entries(fields)) url.searchParams.set(k, v);
  return url.toString();
}

async function fetchToFile(id, dest) {
  const base = `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`;
  let res = await fetch(base, { redirect: 'follow' });

  // Arquivos grandes podem devolver a pagina de confirmacao em HTML.
  const ctype = res.headers.get('content-type') || '';
  if (ctype.includes('text/html')) {
    const html = await res.text();
    const confirmUrl = parseConfirmForm(html);
    if (!confirmUrl) throw new Error('nao consegui confirmar o download (HTML inesperado)');
    res = await fetch(confirmUrl, { redirect: 'follow' });
  }
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

  const tmp = `${dest}.part`;
  await pipeline(Readable.fromWeb(res.body), createWriteStream(tmp));
  await rename(tmp, dest);
  const { size } = await stat(dest);
  if (size < 1024) {
    await unlink(dest).catch(() => {});
    throw new Error('arquivo suspeito (muito pequeno) — provavelmente bloqueio de permissao');
  }
  return size;
}

async function run(items, dir, label) {
  await mkdir(dir, { recursive: true });
  let ok = 0;
  let fail = 0;
  let skip = 0;
  let idx = 0;

  async function worker() {
    while (idx < items.length) {
      const i = idx++;
      const it = items[i];
      const dest = join(dir, it.file);
      if (await exists(dest)) {
        console.log(`• [${i + 1}/${items.length}] ${it.file} ja existe, pulando`);
        skip++;
        continue;
      }
      try {
        const size = await fetchToFile(it.id, dest);
        console.log(`✓ [${i + 1}/${items.length}] ${it.file}  (${(size / 1e6).toFixed(1)} MB)`);
        ok++;
      } catch (e) {
        console.warn(`✗ [${i + 1}/${items.length}] ${it.file} — ${e.message}`);
        fail++;
      }
    }
  }

  console.log(`\n→ Baixando ${items.length} ${label} em ${dir}\n`);
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`\n${label}: ${ok} baixados, ${skip} pulados, ${fail} falhas.`);
  return fail;
}

let fails = await run(manifest.videos, VIDEO_DIR, 'videos');
if (wantPhotos) {
  fails += await run(manifest.photos, VIDEO_DIR, 'fotos');
}

if (fails > 0) {
  console.error('\nAlgumas falhas. Re-execute o comando para tentar os que faltaram.');
  process.exit(1);
}
console.log('\nPronto! Agora rode:  npm run render');

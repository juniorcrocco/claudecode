// Baixa footage vertical do Pexels para cada cena e salva com o nome do campo
// `bg` do scenes.ts em public/video/. Roda só quando a rede liberar api.pexels.com
// + videos.pexels.com e a env PEXELS_API_KEY estiver setada.
//
// Uso:  PEXELS_API_KEY=xxxx node scripts/fetch-footage.mjs
//
// Pexels é gratuito e sem exigência de atribuição para uso. Chave free instantânea
// em https://www.pexels.com/api/

import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const KEY = process.env.PEXELS_API_KEY;
if (!KEY) {
  console.error('Defina PEXELS_API_KEY no ambiente. Ex: PEXELS_API_KEY=xxxx node scripts/fetch-footage.mjs');
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'video');

// nome do arquivo -> { query de busca, duração mínima em segundos }
const CLIPS = [
  { file: 'bg-fachada.mp4',     q: 'elegant beauty salon interior',       min: 2 },
  { file: 'bg-espelho.mp4',     q: 'woman looking salon mirror hair',      min: 2 },
  { file: 'bg-cabelo.mp4',      q: 'hairdresser cutting hair scissors',    min: 2 },
  { file: 'bg-cor.mp4',         q: 'hair coloring salon',                  min: 2 },
  { file: 'bg-loiro.mp4',       q: 'blonde hair shine',                    min: 2 },
  { file: 'bg-tratamento.mp4',  q: 'hair treatment mask spa',              min: 2 },
  { file: 'bg-escova.mp4',      q: 'blow drying hair brush salon',         min: 2 },
  { file: 'bg-unhas.mp4',       q: 'manicure nails polish',                min: 2 },
  { file: 'bg-pes.mp4',         q: 'pedicure feet spa',                    min: 2 },
  { file: 'bg-sobrancelha.mp4', q: 'eyebrow grooming beauty',              min: 2 },
  { file: 'bg-pele.mp4',        q: 'facial skincare treatment',            min: 2 },
  { file: 'bg-make.mp4',        q: 'makeup brush applying face',           min: 2 },
  { file: 'bg-noiva.mp4',       q: 'bride hair makeup wedding',            min: 2 },
  { file: 'bg-eles.mp4',        q: 'barber shaving man beard',             min: 2 },
  { file: 'bg-headspa.mp4',     q: 'relaxing head massage spa',            min: 3 },
  { file: 'bg-rituais.mp4',     q: 'spa candles oil flowers calm',         min: 3 },
  { file: 'bg-deus.mp4',        q: 'woman relaxing window sunlight calm',  min: 3 },
  { file: 'bg-casal.mp4',       q: 'couple relaxing spa',                  min: 3 },
  { file: 'bg-fechamento.mp4',  q: 'beautiful woman smiling hair confident', min: 6 },
];

const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

// escolhe o melhor arquivo de vídeo vertical (retrato) e com altura decente
function pickVerticalFile(video) {
  const portrait = video.video_files
    .filter((f) => f.width && f.height && f.height >= f.width) // retrato
    .sort((a, b) => b.height - a.height);
  // prefere algo perto de 1080x1920 sem exagerar no tamanho
  return portrait.find((f) => f.height >= 1280) || portrait[0] || null;
}

async function search(q, min) {
  const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(q)}&orientation=portrait&size=medium&per_page=15`;
  const res = await fetch(url, { headers: { Authorization: KEY } });
  if (!res.ok) throw new Error(`API ${res.status} para "${q}"`);
  const data = await res.json();
  const candidates = (data.videos || [])
    .filter((v) => v.duration >= min)
    .map((v) => ({ v, f: pickVerticalFile(v) }))
    .filter((x) => x.f);
  // prioriza maior duração (mais folga) e boa resolução
  candidates.sort((a, b) => b.v.duration - a.v.duration);
  return candidates[0] || null;
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf.length;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  let ok = 0, fail = 0;
  for (const c of CLIPS) {
    const dest = join(OUT_DIR, c.file);
    if (await exists(dest)) { console.log(`• ${c.file} já existe, pulando`); ok++; continue; }
    try {
      const hit = await search(c.q, c.min);
      if (!hit) { console.warn(`✗ ${c.file} — nenhum clipe retrato p/ "${c.q}"`); fail++; continue; }
      const size = await download(hit.f.link, dest);
      console.log(`✓ ${c.file}  (${hit.f.width}x${hit.f.height}, ${hit.v.duration}s, ${(size/1e6).toFixed(1)}MB)  «${c.q}»  por ${hit.v.user?.name ?? 'Pexels'}`);
      ok++;
    } catch (e) {
      console.warn(`✗ ${c.file} — ${e.message}`); fail++;
    }
  }
  console.log(`\nConcluído: ${ok} ok, ${fail} falhas. Revise os clipes em public/video/ e ajuste se algum não combinar.`);
}

main().catch((e) => { console.error(e); process.exit(1); });

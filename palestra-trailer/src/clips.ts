import { random } from 'remotion';
import { config } from './config';
import manifest from '../clips.manifest.json';

export type Shot = {
  file: string;
  from: number; // frame de inicio na timeline
  dur: number; // duracao em frames
  startFrom: number; // offset de entrada dentro do clipe
  kb: 'in' | 'out';
  speed: number; // playbackRate
};

export type Kicker = { text: string; from: number; dur: number };

export type Timeline = {
  fps: number;
  total: number;
  beat: number;
  intro: { from: number; dur: number };
  shots: Shot[];
  flashes: number[];
  title: { from: number; dur: number };
  kickers: Kicker[];
  endcard: { from: number; dur: number; file: string };
  climaxFrom: number;
};

/**
 * Monta a linha do tempo do trailer a partir dos clipes do manifesto.
 *
 * Estrutura (estilo trailer de cinema):
 *   1. INTRO no preto      — hook sussurrado
 *   2. BUILD               — cortes mais longos, respirando (push-in)
 *   3. TITLE DROP          — corta pro preto, titulo "bate"
 *   4. MID                 — cortes no beat, energia subindo
 *   5. CLIMAX              — rajada no meio-beat + flashes + kickers
 *   6. END CARD            — clipe heroi em slow-mo + nome/CTA
 *
 * TODOS os clipes entram pelo menos uma vez; se sobrar tempo, a rajada
 * recicla os melhores.
 */
export function buildTimeline(): Timeline {
  const fps = config.fps;
  const beat = Math.round((fps * 60) / config.bpm); // ex.: 30fps/100bpm = 18f
  const files = manifest.videos.map((v) => v.file);
  const N = files.length;

  const startOf = (i: number) => Math.round(random(`s${i}`) * 14);
  const kbOf = (i: number) => (i % 2 === 0 ? 'in' : 'out') as 'in' | 'out';

  const shots: Shot[] = [];
  const flashes: number[] = [];
  let cursor = 0;

  // 1. INTRO no preto
  const intro = { from: 0, dur: beat * 2 };
  cursor = intro.from + intro.dur;

  // particiona os clipes nas fases
  const buildCount = Math.max(4, Math.round(N * 0.32));
  const midCount = Math.max(4, Math.round(N * 0.28));
  const buildFiles = files.slice(0, buildCount);
  const midFiles = files.slice(buildCount, buildCount + midCount);
  const climaxFiles = files.slice(buildCount + midCount);

  // 2. BUILD — cortes longos (1.5 beat), push-in, com flash na entrada
  buildFiles.forEach((file, i) => {
    const dur = Math.round(beat * 1.5);
    flashes.push(cursor);
    shots.push({ file, from: cursor, dur, startFrom: startOf(i), kb: kbOf(i), speed: 1 });
    cursor += dur;
  });

  // 3. TITLE DROP — preto + titulo batendo
  flashes.push(cursor);
  const title = { from: cursor, dur: beat * 3 };
  cursor += title.dur;

  // 4. MID — cortes no beat
  midFiles.forEach((file, i) => {
    const dur = beat;
    flashes.push(cursor);
    shots.push({ file, from: cursor, dur, startFrom: startOf(100 + i), kb: kbOf(i), speed: 1 });
    cursor += dur;
  });

  // 5. CLIMAX — rajada no meio-beat, ciclando todos os clipes restantes
  const climaxFrom = cursor;
  const half = Math.max(5, Math.round(beat / 2));
  const burst = [...climaxFiles, ...buildFiles.slice(0, 4)]; // recicla pra encher a rajada
  burst.forEach((file, i) => {
    const dur = half;
    if (i % 2 === 0) flashes.push(cursor);
    shots.push({ file, from: cursor, dur, startFrom: startOf(200 + i), kb: 'in', speed: 1 });
    cursor += dur;
  });

  // kickers (palavras de impacto) distribuidos pela rajada
  const kickers: Kicker[] = config.kickers.map((text, i) => {
    const from = climaxFrom + i * half * 2;
    return { text, from, dur: half * 2 };
  });

  // 6. END CARD — ultimo clipe em slow-mo sob grade escura
  flashes.push(cursor);
  const heroFile = files[files.length - 1];
  const endcard = { from: cursor, dur: beat * 5, file: heroFile, };
  cursor += endcard.dur;

  return {
    fps,
    total: cursor,
    beat,
    intro,
    shots,
    flashes,
    title,
    kickers,
    endcard,
    climaxFrom,
  };
}

export const manifestData = manifest;

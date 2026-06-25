import { FPS, SPEAKER, TAGLINE, EVENT, HANDLE } from './config';

// ──────────────────────────────────────────────────────────────────────────
//  O ROTEIRO DO TRAILER, EM DADOS.
//  Cada "shot" é um card de texto OU um clipe de vídeo. Reordene, mude
//  durações (em frames @30fps) e textos à vontade. Para usar um clipe real,
//  preencha `src` com o nome do arquivo em public/footage/ e ponha
//  USE_PLACEHOLDER = false no config.ts.
// ──────────────────────────────────────────────────────────────────────────

export type Section = 'open' | 'name' | 'rajada' | 'drop' | 'respira' | 'cta';
export type Enter = 'fadeUp' | 'blurIn' | 'wordPop';
export type Transition = { type: 'fade' | 'wipe-left' | 'flash'; dur: number };

export interface CardShot {
  kind: 'card';
  id: string;
  dur: number;
  section: Section;
  enter: Enter;
  kicker?: string;
  title?: string; // \n quebra linha
  hero?: boolean; // tipografia gigante
  italic?: boolean;
  transitionIn?: Transition;
}

export interface ClipShot {
  kind: 'clip';
  id: string;
  dur: number;
  section: Section;
  src?: string; // arquivo em public/footage/ (ex.: 'clip01.mp4')
  trimBefore?: number; // pula N frames do início do arquivo
  speed?: number; // playbackRate (1 = normal)
  kb?: 'in' | 'out'; // direção do Ken Burns
  kicker?: string; // label uppercase no rodapé
  caption?: string; // legenda/frase sobre o clipe
  tone?: number; // 0..5 — varia o gradiente do placeholder
  transitionIn?: Transition;
}

export type Shot = CardShot | ClipShot;

const s = (sec: number) => Math.round(sec * FPS);

// O arco: silêncio → tensão → seu nome → rajada no beat → frase de impacto →
// respiro emocional → chamada final.
export const timeline: Shot[] = [
  // ── COLD OPEN (preto, respira devagar) ───────────────────────────────────
  { kind: 'card', id: 'open1', section: 'open', dur: s(1.4), enter: 'fadeUp', title: 'Tem gente que assiste.' },
  { kind: 'card', id: 'open2', section: 'open', dur: s(1.6), enter: 'fadeUp', title: 'Tem gente que\nfaz acontecer.', transitionIn: { type: 'fade', dur: s(0.3) } },
  { kind: 'clip', id: 'open3', section: 'open', dur: s(1.3), src: 'clip01.mp4', kb: 'in', tone: 0, transitionIn: { type: 'fade', dur: s(0.4) } },

  // ── SEU NOME (build) ──────────────────────────────────────────────────────
  { kind: 'card', id: 'name', section: 'name', dur: s(1.9), enter: 'blurIn', kicker: TAGLINE.toUpperCase(), title: SPEAKER, hero: true, transitionIn: { type: 'flash', dur: s(0.2) } },

  // ── RAJADA (cortes no beat ~120bpm) ──────────────────────────────────────
  { kind: 'clip', id: 'r1', section: 'rajada', dur: s(0.5), src: 'clip02.mp4', kb: 'in', tone: 1, kicker: 'PALCO', transitionIn: { type: 'flash', dur: s(0.12) } },
  { kind: 'clip', id: 'r2', section: 'rajada', dur: s(0.5), src: 'clip03.mp4', kb: 'out', tone: 2, kicker: 'PLATEIA' },
  { kind: 'clip', id: 'r3', section: 'rajada', dur: s(0.5), src: 'clip04.mp4', kb: 'in', tone: 3, kicker: 'ENERGIA' },
  { kind: 'clip', id: 'r4', section: 'rajada', dur: s(0.5), src: 'clip05.mp4', kb: 'out', tone: 4, kicker: 'VERDADE' },
  { kind: 'clip', id: 'r5', section: 'rajada', dur: s(0.5), src: 'clip06.mp4', kb: 'in', tone: 5, kicker: 'PRESENÇA' },
  { kind: 'clip', id: 'r6', section: 'rajada', dur: s(0.5), src: 'clip07.mp4', kb: 'out', tone: 1, kicker: 'IMPACTO' },

  // ── FRASE DE IMPACTO (drop) ──────────────────────────────────────────────
  { kind: 'card', id: 'drop', section: 'drop', dur: s(1.8), enter: 'wordPop', title: 'Uma ideia pode\nmudar tudo.', hero: true, transitionIn: { type: 'flash', dur: s(0.15) } },

  // ── RESPIRA (herói lento, emocional) ─────────────────────────────────────
  { kind: 'clip', id: 'breathe', section: 'respira', dur: s(2.2), src: 'clip08.mp4', kb: 'in', speed: 1, tone: 0, caption: '"A sua próxima decisão começa aqui."', transitionIn: { type: 'fade', dur: s(0.5) } },

  // ── CHAMADA FINAL (CTA) ──────────────────────────────────────────────────
  { kind: 'card', id: 'cta1', section: 'cta', dur: s(1.4), enter: 'blurIn', kicker: 'AO VIVO', title: SPEAKER, hero: true, transitionIn: { type: 'fade', dur: s(0.4) } },
  { kind: 'card', id: 'cta2', section: 'cta', dur: s(2.2), enter: 'fadeUp', title: EVENT, kicker: HANDLE },
];

// Duração total da composição = soma das durações menos a sobreposição das
// transições (cada transição "come" `dur` frames do encadeamento).
export const totalDuration = timeline.reduce(
  (acc, shot) => acc + shot.dur - (shot.transitionIn ? shot.transitionIn.dur : 0),
  0,
);

import { interpolate, Easing, spring } from 'remotion';

// entrada padrao: sobe + fade
export const fadeUp = (frame: number, delay = 0, dist = 40) => {
  const opacity = interpolate(frame, [delay, delay + 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const y = interpolate(frame, [delay, delay + 18], [dist, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return { opacity, transform: `translateY(${y}px)` };
};

// entrada premium: desfoca pra dentro
export const blurIn = (frame: number, delay = 0, blur = 14) => {
  const opacity = interpolate(frame, [delay, delay + 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const b = interpolate(frame, [delay, delay + 22], [blur, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  return { opacity, filter: `blur(${b}px)` };
};

// IMPACTO: o titulo "bate" — escala grande pra dentro com overshoot + leve blur.
export const slamIn = (frame: number, fps: number, delay = 0) => {
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.9 },
  });
  const scale = interpolate(s, [0, 1], [1.45, 1]);
  const blur = interpolate(s, [0, 0.6, 1], [22, 4, 0], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [delay, delay + 4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return { opacity, filter: `blur(${blur}px)`, transform: `scale(${scale})` };
};

// kicker que estala no beat (palavra de impacto da montagem)
export const wordPop = (frame: number, fps: number) => {
  const s = spring({ frame, fps, config: { damping: 13, stiffness: 220, mass: 0.5 } });
  const opacity = interpolate(frame, [0, 4], [0, 1], { extrapolateRight: 'clamp' });
  return { opacity, transform: `scale(${0.86 + 0.14 * s})` };
};

// saida: fade nos ultimos N frames
export const fadeOut = (frame: number, durationInFrames: number, len = 10) =>
  interpolate(frame, [durationInFrames - len, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

// fundo: Ken Burns lento (push in / pull out)
export const kenBurns = (
  frame: number,
  durationInFrames: number,
  dir: 'in' | 'out' = 'in',
  amount = 0.12,
) => {
  const range: [number, number] =
    dir === 'in' ? [1 + amount * 0.4, 1 + amount * 1.4] : [1 + amount * 1.4, 1 + amount * 0.4];
  const scale = interpolate(frame, [0, durationInFrames], range, {
    extrapolateRight: 'clamp',
  });
  return scale;
};

// flash branco em cima de um corte (transicao). Pico em `at`, decai rapido.
export const flash = (frame: number, at: number, len = 6) => {
  return interpolate(frame, [at, at + len], [0.85, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });
};

// shake sutil da camera (energia no climax)
export const shake = (frame: number, intensity = 1) => {
  const x = Math.sin(frame * 1.7) * 3 * intensity + Math.sin(frame * 0.6) * 2 * intensity;
  const y = Math.cos(frame * 1.9) * 3 * intensity + Math.cos(frame * 0.8) * 2 * intensity;
  return `translate(${x}px, ${y}px)`;
};

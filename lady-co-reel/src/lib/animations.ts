import { interpolate, Easing, spring } from 'remotion';

// entrada padrão: sobe + fade
export const fadeUp = (frame: number, delay = 0) => {
  const opacity = interpolate(frame, [delay, delay + 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const y = interpolate(frame, [delay, delay + 18], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return { opacity, transform: `translateY(${y}px)` };
};

// entrada premium: desfoca pra dentro
export const blurIn = (frame: number, delay = 0) => {
  const opacity = interpolate(frame, [delay, delay + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const b = interpolate(frame, [delay, delay + 20], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  return { opacity, filter: `blur(${b}px)` };
};

// impacto: spring de escala (kickers da rajada batem no beat)
export const wordPop = (frame: number, fps: number) => {
  const s = spring({ frame, fps, config: { damping: 14, stiffness: 140, mass: 0.6 } });
  const opacity = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: 'clamp' });
  return { opacity, transform: `scale(${0.92 + 0.08 * s})` };
};

// saída padrão: fade nos últimos N frames
export const fadeOut = (frame: number, durationInFrames: number, len = 10) =>
  interpolate(frame, [durationInFrames - len, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

// fundo: Ken Burns lento
export const kenBurns = (
  frame: number,
  durationInFrames: number,
  dir: 'in' | 'out' = 'in'
) => {
  const range = dir === 'in' ? [1.06, 1.16] : [1.16, 1.06];
  const scale = interpolate(frame, [0, durationInFrames], range as [number, number]);
  return { transform: `scale(${scale})` };
};

import { interpolate, Easing, spring } from 'remotion';

// entrada padrão: sobe + fade
export const fadeUp = (frame: number, delay = 0) => {
  const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const y = interpolate(frame, [delay, delay + 16], [50, 0], {
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
  const b = interpolate(frame, [delay, delay + 22], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  return { opacity, filter: `blur(${b}px)` };
};

// impacto: spring de escala (palavra bate no beat)
export const wordPop = (frame: number, fps: number, delay = 0) => {
  const s = spring({ frame: frame - delay, fps, config: { damping: 13, stiffness: 150, mass: 0.6 } });
  const opacity = interpolate(frame, [delay, delay + 5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return { opacity, transform: `scale(${0.9 + 0.1 * s})` };
};

// saída padrão: fade nos últimos N frames
export const fadeOut = (frame: number, durationInFrames: number, len = 8) =>
  interpolate(frame, [durationInFrames - len, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

// fundo: Ken Burns lento (push-in ou pull-out)
export const kenBurns = (
  frame: number,
  durationInFrames: number,
  dir: 'in' | 'out' = 'in',
) => {
  const range = dir === 'in' ? [1.05, 1.18] : [1.18, 1.05];
  const scale = interpolate(frame, [0, durationInFrames], range as [number, number], {
    extrapolateRight: 'clamp',
  });
  return { transform: `scale(${scale})` };
};

import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../theme';

/**
 * Barras pretas de cinema (cinemascope). Fecham nos primeiros frames,
 * dando o "respiro" de tela larga. Altura final ~11% em cima e embaixo.
 */
export const Letterbox: React.FC<{ closeAt?: number }> = ({ closeAt = 24 }) => {
  const frame = useCurrentFrame();
  const h = interpolate(frame, [0, closeAt], [0, 11], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bar: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    height: `${h}%`,
    background: theme.color.ink,
  };
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div style={{ ...bar, top: 0 }} />
      <div style={{ ...bar, bottom: 0 }} />
    </AbsoluteFill>
  );
};

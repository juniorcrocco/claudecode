import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { flash } from '../lib/animations';

/** Flashes brancos curtos em cada ponto de corte — o "soco" da transicao. */
export const FlashLayer: React.FC<{ flashes: number[] }> = ({ flashes }) => {
  const frame = useCurrentFrame();
  // pega o flash ativo mais forte
  let o = 0;
  for (const f of flashes) {
    if (frame >= f && frame <= f + 6) o = Math.max(o, flash(frame, f, 6));
  }
  if (o <= 0) return null;
  return (
    <AbsoluteFill
      style={{
        background: 'rgba(255,250,240,1)',
        opacity: o,
        mixBlendMode: 'screen',
        pointerEvents: 'none',
      }}
    />
  );
};

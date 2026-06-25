import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Shot as ShotType } from '../timeline';
import { Card } from './Card';
import { Clip } from './Clip';

// Flash branco rápido no início do shot (usado nos cortes "flash" da rajada
// e nas entradas de impacto). Não encurta a timeline — é só um overlay.
const FlashIn: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, dur], [0.9, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill
      style={{ background: '#FFFFFF', opacity, mixBlendMode: 'screen', pointerEvents: 'none' }}
    />
  );
};

export const Shot: React.FC<{ shot: ShotType }> = ({ shot }) => {
  const flash = shot.transitionIn?.type === 'flash' ? shot.transitionIn.dur : 0;
  return (
    <AbsoluteFill>
      {shot.kind === 'card' ? <Card shot={shot} /> : <Clip shot={shot} />}
      {flash > 0 && <FlashIn dur={flash} />}
    </AbsoluteFill>
  );
};

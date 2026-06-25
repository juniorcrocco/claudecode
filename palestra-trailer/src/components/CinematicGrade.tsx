import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * Camada cinematográfica global, aplicada por cima de TODAS as cenas — é o
 * "grade único" que amarra clipes diferentes na mesma família de cor.
 * Cor quente de holofote + grão de filme + vinheta + light leak dourado.
 */
export const CinematicGrade: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leak = interpolate(Math.sin((frame / fps) * 0.7), [-1, 1], [0.04, 0.2]);
  const leakShift = interpolate(Math.sin((frame / fps) * 0.45), [-1, 1], [-10, 10]);
  const seed = (frame * 101) % 1019;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {/* 1. Color grade — esquenta luzes, esfria sombras (teal & orange) */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(150deg, rgba(229,180,91,0.16) 0%, rgba(14,17,22,0.0) 45%, rgba(20,28,38,0.30) 100%)',
          mixBlendMode: 'soft-light',
        }}
      />

      {/* 2. Light leak dourado que respira */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(55% 45% at ${80 + leakShift}% 12%, rgba(229,180,91,${leak}) 0%, rgba(229,180,91,0) 60%)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* 3. Vinheta — escurece bordas, foca o centro */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(125% 85% at 50% 45%, rgba(0,0,0,0) 52%, rgba(4,5,7,0.62) 100%)',
        }}
      />

      {/* 4. Grão de filme animado */}
      <AbsoluteFill style={{ opacity: 0.09, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <filter id="filmGrain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves={2}
              seed={seed}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#filmGrain)" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

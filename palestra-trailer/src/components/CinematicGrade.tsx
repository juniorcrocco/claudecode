import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * Grade cinematografica global por cima de TODAS as cenas. Amarra todos os
 * clipes na mesma familia de cor (teal & orange), com vinheta, grao de filme
 * animado e um brilho quente que respira.
 */
export const CinematicGrade: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glow = interpolate(Math.sin((frame / fps) * 0.7), [-1, 1], [0.05, 0.2]);
  const glowShift = interpolate(Math.sin((frame / fps) * 0.4), [-1, 1], [-8, 8]);
  const seed = (frame * 97) % 1019;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {/* sombras frias (teal) */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(8,40,48,0.30) 0%, rgba(4,12,16,0.10) 45%, rgba(6,24,29,0.40) 100%)',
          mixBlendMode: 'soft-light',
        }}
      />
      {/* luzes quentes (ambar) que respiram */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 55% at ${72 + glowShift}% 22%, rgba(245,166,35,${glow}) 0%, rgba(245,166,35,0) 60%)`,
          mixBlendMode: 'screen',
        }}
      />
      {/* vinheta */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(130% 85% at 50% 45%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.62) 100%)',
        }}
      />
      {/* grao de filme animado */}
      <AbsoluteFill style={{ opacity: 0.11, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves={2}
              seed={seed}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

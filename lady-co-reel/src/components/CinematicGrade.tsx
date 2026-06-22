import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * Camada cinematográfica global aplicada por cima de TODAS as cenas.
 * Unifica o visual (color grade quente) e adiciona textura de cinema:
 * vinheta, grão de filme animado e um light leak que respira.
 *
 * Também funciona por cima de footage real — é o "grade único" que amarra
 * todos os clipes na mesma família de cor (a dica de cor do roteiro).
 */
export const CinematicGrade: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Light leak quente que entra e sai lentamente, varrendo de um canto.
  const leak = interpolate(
    Math.sin((frame / fps) * 0.6),
    [-1, 1],
    [0.05, 0.22],
  );
  const leakShift = interpolate(Math.sin((frame / fps) * 0.4), [-1, 1], [-8, 8]);

  // Grão: muda a seed a cada frame para dar o "flicker" de filme.
  const seed = (frame * 97) % 1019;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {/* 1. Color grade quente — realça creme/rosé, esquenta as sombras */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(160deg, rgba(201,155,140,0.18) 0%, rgba(90,74,64,0.10) 45%, rgba(43,35,32,0.28) 100%)',
          mixBlendMode: 'soft-light',
        }}
      />

      {/* 2. Light leak quente que respira */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 50% at ${78 + leakShift}% 18%, rgba(199,168,117,${leak}) 0%, rgba(199,168,117,0) 60%)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* 3. Vinheta — escurece as bordas, foca o centro */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(120% 80% at 50% 42%, rgba(0,0,0,0) 55%, rgba(20,15,13,0.55) 100%)',
        }}
      />

      {/* 4. Grão de filme animado (SVG fractal noise) */}
      <AbsoluteFill style={{ opacity: 0.10, mixBlendMode: 'overlay' }}>
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

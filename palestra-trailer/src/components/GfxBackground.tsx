import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { theme } from '../theme';

/**
 * Fundo de motion-graphics (sem footage) usado no TEASER que renderiza neste
 * ambiente. Blooms de luz que respiram + bokeh derivando + faixas de luz.
 */
export const GfxBackground: React.FC<{ seedKey?: string }> = ({ seedKey = 'a' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dots = new Array(9).fill(0).map((_, i) => {
    const k = `${seedKey}-${i}`;
    const baseX = random(`x${k}`) * 100;
    const baseY = random(`y${k}`) * 100;
    const size = 160 + random(`s${k}`) * 380;
    const speed = 0.12 + random(`v${k}`) * 0.22;
    const phase = random(`p${k}`) * Math.PI * 2;
    const x = baseX + Math.sin((frame / fps) * speed + phase) * 5;
    const y = baseY + Math.cos((frame / fps) * speed + phase) * 4;
    const opacity = interpolate(
      Math.sin((frame / fps) * speed + phase),
      [-1, 1],
      [0.05, 0.26],
    );
    const tint = i % 3 === 0 ? theme.color.ember : theme.color.amber;
    return { x, y, size, opacity, tint, key: i };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.color.ink }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(70% 60% at 30% 20%, ${theme.color.teal} 0%, rgba(0,0,0,0) 60%), radial-gradient(70% 70% at 80% 85%, ${theme.color.tealDeep} 0%, rgba(0,0,0,0) 60%), linear-gradient(160deg, ${theme.color.tealDeep}, ${theme.color.ink})`,
        }}
      />
      <AbsoluteFill style={{ filter: 'blur(2px)' }}>
        {dots.map((d) => (
          <div
            key={d.key}
            style={{
              position: 'absolute',
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.size,
              height: d.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${d.tint} 0%, rgba(0,0,0,0) 70%)`,
              opacity: d.opacity,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

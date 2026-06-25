import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { theme } from '../theme';

// Gradientes "cinema" variados por tom — usados enquanto não há clipe real.
const tones: string[] = [
  `radial-gradient(80% 60% at 30% 25%, ${theme.color.steel} 0%, rgba(0,0,0,0) 55%), linear-gradient(160deg, ${theme.color.night}, ${theme.color.ink})`,
  `radial-gradient(75% 55% at 70% 25%, ${theme.color.gold}88 0%, rgba(0,0,0,0) 55%), linear-gradient(160deg, ${theme.color.night}, ${theme.color.ink})`,
  `radial-gradient(80% 60% at 50% 20%, ${theme.color.blood}88 0%, rgba(0,0,0,0) 60%), linear-gradient(160deg, ${theme.color.night}, ${theme.color.ink})`,
  `radial-gradient(80% 60% at 25% 75%, ${theme.color.steel} 0%, rgba(0,0,0,0) 55%), linear-gradient(160deg, ${theme.color.night}, ${theme.color.ink})`,
  `radial-gradient(75% 70% at 80% 80%, ${theme.color.goldSoft}aa 0%, rgba(0,0,0,0) 60%), linear-gradient(160deg, ${theme.color.night}, ${theme.color.ink})`,
  `radial-gradient(80% 60% at 50% 30%, ${theme.color.gold}66 0%, rgba(0,0,0,0) 55%), linear-gradient(160deg, ${theme.color.night}, ${theme.color.ink})`,
];

const Bokeh: React.FC<{ tone: number }> = ({ tone }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tint = tone % 2 === 0 ? theme.color.steel : theme.color.gold;

  const dots = new Array(7).fill(0).map((_, i) => {
    const baseX = random(`x-${tone}-${i}`) * 100;
    const baseY = random(`y-${tone}-${i}`) * 100;
    const size = 120 + random(`s-${tone}-${i}`) * 280;
    const speed = 0.15 + random(`v-${tone}-${i}`) * 0.25;
    const phase = random(`p-${tone}-${i}`) * Math.PI * 2;
    const x = baseX + Math.sin((frame / fps) * speed + phase) * 4;
    const y = baseY + Math.cos((frame / fps) * speed + phase) * 3;
    const opacity = interpolate(Math.sin((frame / fps) * speed + phase), [-1, 1], [0.04, 0.2]);
    return { x, y, size, opacity, key: i };
  });

  return (
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
            background: `radial-gradient(circle, ${tint} 0%, rgba(0,0,0,0) 70%)`,
            opacity: d.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

export const Placeholder: React.FC<{ tone?: number }> = ({ tone = 0 }) => {
  const t = tone % tones.length;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: tones[t] }} />
      <Bokeh tone={t} />
    </AbsoluteFill>
  );
};

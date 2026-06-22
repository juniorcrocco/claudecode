import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  random,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { kenBurns } from '../lib/animations';
import { theme } from '../theme';
import { USE_PLACEHOLDER_BG } from '../config';
import { Block } from '../scenes';

// Gradientes em camadas por bloco — blooms radiais quentes em vez de um
// degradê liso, dando profundidade e clima de luz natural.
const blockBg: Record<Block, string> = {
  abertura: `radial-gradient(80% 60% at 30% 25%, ${theme.color.coffee} 0%, rgba(0,0,0,0) 55%), radial-gradient(70% 70% at 80% 80%, ${theme.color.rose}55 0%, rgba(0,0,0,0) 60%), linear-gradient(160deg, ${theme.color.coffee}, ${theme.color.ink})`,
  rajada: `radial-gradient(75% 55% at 70% 25%, ${theme.color.rose} 0%, rgba(0,0,0,0) 55%), radial-gradient(70% 70% at 20% 80%, ${theme.color.gold}44 0%, rgba(0,0,0,0) 60%), linear-gradient(160deg, ${theme.color.coffee}, ${theme.color.ink})`,
  respira: `radial-gradient(80% 60% at 50% 20%, ${theme.color.sage} 0%, rgba(0,0,0,0) 60%), radial-gradient(70% 70% at 80% 85%, ${theme.color.coffee} 0%, rgba(0,0,0,0) 60%), linear-gradient(160deg, ${theme.color.sage}, ${theme.color.ink})`,
  fechamento: `radial-gradient(80% 60% at 50% 30%, ${theme.color.gold}66 0%, rgba(0,0,0,0) 55%), radial-gradient(75% 70% at 25% 80%, ${theme.color.rose}55 0%, rgba(0,0,0,0) 60%), linear-gradient(160deg, ${theme.color.coffee}, ${theme.color.ink})`,
};

// Algumas bolhas de bokeh desfocadas que derivam lentamente, criando
// sensação de profundidade de campo (luzes fora de foco ao fundo).
const Bokeh: React.FC<{ block: Block }> = ({ block }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tint = block === 'respira' ? theme.color.sage : theme.color.gold;

  const dots = new Array(7).fill(0).map((_, i) => {
    const baseX = random(`x-${i}`) * 100;
    const baseY = random(`y-${i}`) * 100;
    const size = 120 + random(`s-${i}`) * 260;
    const speed = 0.15 + random(`v-${i}`) * 0.25;
    const phase = random(`p-${i}`) * Math.PI * 2;
    const drift = Math.sin((frame / fps) * speed + phase);
    const x = baseX + drift * 4;
    const y = baseY + Math.cos((frame / fps) * speed + phase) * 3;
    const opacity = interpolate(
      Math.sin((frame / fps) * speed + phase),
      [-1, 1],
      [0.05, 0.22],
    );
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

export const Background: React.FC<{ bg?: string; block: Block }> = ({ bg, block }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const kb = kenBurns(frame, durationInFrames, 'in');

  const useVideo = !USE_PLACEHOLDER_BG && bg;

  return (
    <AbsoluteFill>
      {useVideo ? (
        <AbsoluteFill style={{ ...kb }}>
          <OffthreadVideo
            src={staticFile(`video/${bg}`)}
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AbsoluteFill>
      ) : (
        <AbsoluteFill style={{ ...kb }}>
          <AbsoluteFill style={{ background: blockBg[block] }} />
          <Bokeh block={block} />
        </AbsoluteFill>
      )}

      {/* overlay para legibilidade do texto */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(43,35,32,0.25) 0%, rgba(43,35,32,0.65) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

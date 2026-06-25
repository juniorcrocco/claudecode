import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { Kicker } from '../clips';
import { theme } from '../theme';
import { wordPop } from '../lib/animations';

const KickerWord: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = wordPop(frame, fps);
  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: '16%' }}>
      <span
        style={{
          fontFamily: theme.font.display,
          color: theme.color.paper,
          fontSize: 96,
          letterSpacing: 4,
          textTransform: 'uppercase',
          textShadow: '0 6px 40px rgba(0,0,0,0.7)',
          WebkitTextStroke: `1px ${theme.color.amber}`,
          ...pop,
        }}
      >
        {text}
      </span>
    </AbsoluteFill>
  );
};

/** Palavras de impacto que estalam no beat durante a rajada. */
export const Kickers: React.FC<{ kickers: Kicker[] }> = ({ kickers }) => (
  <>
    {kickers.map((k, i) => (
      <Sequence key={i} from={k.from} durationInFrames={k.dur}>
        <KickerWord text={k.text} />
      </Sequence>
    ))}
  </>
);

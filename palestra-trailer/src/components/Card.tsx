import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { CardShot } from '../timeline';
import { blurIn, fadeOut, fadeUp, wordPop } from '../lib/animations';
import { DISPLAY, LABEL, sizes, theme } from '../theme';

const CardBg: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = interpolate(Math.sin((frame / fps) * 0.5), [-1, 1], [0.25, 0.5]);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: theme.color.ink }} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(70% 55% at 50% 42%, rgba(229,180,91,${glow * 0.18}) 0%, rgba(0,0,0,0) 60%), linear-gradient(160deg, ${theme.color.night}, ${theme.color.ink})`,
        }}
      />
    </AbsoluteFill>
  );
};

export const Card: React.FC<{ shot: CardShot }> = ({ shot }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();
  const sz = sizes(width);
  const out = fadeOut(frame, durationInFrames, 7);

  const enter = (delay = 0) => {
    if (shot.enter === 'blurIn') return blurIn(frame, delay);
    if (shot.enter === 'wordPop') return wordPop(frame, fps, delay);
    return fadeUp(frame, delay);
  };

  const titleSize = shot.hero ? sz.hero : sz.title;
  const lines = (shot.title ?? '').split('\n');

  return (
    <AbsoluteFill style={{ opacity: out }}>
      <CardBg />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: `0 ${sz.pad}px`,
        }}
      >
        {shot.kicker && (
          <div
            style={{
              fontFamily: LABEL,
              fontWeight: 600,
              fontSize: sz.kicker,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: theme.color.gold,
              marginBottom: sz.kicker * 0.7,
              ...fadeUp(frame, 4),
            }}
          >
            {shot.kicker}
          </div>
        )}
        <div
          style={{
            fontFamily: DISPLAY,
            fontSize: titleSize,
            lineHeight: 1.02,
            letterSpacing: shot.hero ? '0.01em' : '0',
            fontStyle: shot.italic ? 'italic' : 'normal',
            color: theme.color.white,
            textTransform: shot.hero ? 'uppercase' : 'none',
            textShadow: '0 8px 40px rgba(0,0,0,0.5)',
          }}
        >
          {lines.map((l, i) => (
            <div key={l + i} style={{ ...enter(i * 6) }}>
              {l}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

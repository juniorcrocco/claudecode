import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { config } from '../config';
import { theme } from '../theme';
import { slamIn, fadeUp } from '../lib/animations';

/** O "title drop": corta pro preto e o titulo bate na tela. */
export const TitleCard: React.FC<{ solidBg?: boolean }> = ({ solidBg = true }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const l1 = slamIn(frame, fps, 2);
  const l2 = slamIn(frame, fps, 8);
  const sub = fadeUp(frame, 22, 24);

  // linha que cresce do centro
  const lineW = interpolate(frame, [16, 34], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const out = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: solidBg
          ? `radial-gradient(80% 80% at 50% 45%, ${theme.color.tealDeep} 0%, ${theme.color.ink} 75%)`
          : 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: out,
      }}
    >
      <div style={{ textAlign: 'center', padding: '0 6%' }}>
        <h1
          style={{
            margin: 0,
            fontFamily: theme.font.display,
            color: theme.color.paper,
            fontSize: 150,
            lineHeight: 0.94,
            letterSpacing: 2,
            textTransform: 'uppercase',
            textShadow: '0 8px 60px rgba(0,0,0,0.6)',
          }}
        >
          <span style={{ display: 'block', ...l1 }}>{config.title.line1}</span>
          <span
            style={{
              display: 'block',
              color: theme.color.amber,
              ...l2,
            }}
          >
            {config.title.line2}
          </span>
        </h1>

        <div
          style={{
            height: 3,
            width: `${lineW}%`,
            margin: '34px auto 26px',
            background: `linear-gradient(90deg, transparent, ${theme.color.ember}, transparent)`,
          }}
        />

        <p
          style={{
            margin: 0,
            fontFamily: theme.font.body,
            color: theme.color.smoke,
            fontSize: 30,
            letterSpacing: 6,
            textTransform: 'uppercase',
            ...sub,
          }}
        >
          {config.subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};

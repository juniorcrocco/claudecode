import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { config } from '../config';
import { theme } from '../theme';

/** Abertura no preto: o hook entra em letter-spacing e some pro corte. */
export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [4, 14, durationInFrames - 8, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const spacing = interpolate(frame, [4, durationInFrames], [22, 38], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.color.ink,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span
        style={{
          fontFamily: theme.font.body,
          color: theme.color.smoke,
          fontSize: 34,
          fontWeight: 600,
          letterSpacing: spacing,
          textTransform: 'uppercase',
          opacity,
        }}
      >
        {config.hook}
      </span>
    </AbsoluteFill>
  );
};

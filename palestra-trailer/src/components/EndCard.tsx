import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { config } from '../config';
import { theme } from '../theme';
import { fadeUp, blurIn, kenBurns } from '../lib/animations';

/** Cartao final: clipe heroi em slow-mo, escurecido, com nome + CTA. */
export const EndCard: React.FC<{ file: string }> = ({ file }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scale = kenBurns(frame, durationInFrames, 'in', 0.1);

  const speaker = blurIn(frame, 10, 16);
  const end = fadeUp(frame, 26, 20);
  const cta = fadeUp(frame, 36, 16);

  // fade pra preto no fim
  const toBlack = interpolate(
    frame,
    [durationInFrames - 22, durationInFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: theme.color.ink }}>
      <AbsoluteFill style={{ transform: `scale(${scale})`, opacity: 0.55 }}>
        <OffthreadVideo
          src={staticFile(`video/${file}`)}
          muted
          playbackRate={0.6}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(5,8,11,0.55) 0%, rgba(5,8,11,0.35) 45%, rgba(5,8,11,0.85) 100%)',
        }}
      />

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: theme.font.display,
              color: theme.color.paper,
              fontSize: 92,
              letterSpacing: 3,
              textTransform: 'uppercase',
              ...speaker,
            }}
          >
            {config.speaker}
          </div>
          <div
            style={{
              fontFamily: theme.font.body,
              color: theme.color.amber,
              fontSize: 30,
              letterSpacing: 10,
              textTransform: 'uppercase',
              marginTop: 18,
              ...end,
            }}
          >
            {config.endline}
          </div>
          <div
            style={{
              fontFamily: theme.font.body,
              color: theme.color.smoke,
              fontSize: 24,
              letterSpacing: 4,
              marginTop: 14,
              ...cta,
            }}
          >
            {config.cta}
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ background: '#000', opacity: toBlack }} />
    </AbsoluteFill>
  );
};

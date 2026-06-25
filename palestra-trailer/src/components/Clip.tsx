import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Video } from '@remotion/media';
import { ClipShot } from '../timeline';
import { USE_PLACEHOLDER } from '../config';
import { kenBurns, fadeUp } from '../lib/animations';
import { Placeholder } from './Placeholder';
import { LABEL, DISPLAY, sizes, theme } from '../theme';

export const Clip: React.FC<{ shot: ClipShot }> = ({ shot }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width } = useVideoConfig();
  const sz = sizes(width);
  const kb = kenBurns(frame, durationInFrames, shot.kb ?? 'in');
  const showVideo = !USE_PLACEHOLDER && shot.src;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.color.ink }}>
      {/* fundo: vídeo real ou placeholder, ambos com Ken Burns */}
      <AbsoluteFill style={{ ...kb }}>
        {showVideo ? (
          <Video
            src={staticFile(`footage/${shot.src}`)}
            muted
            playbackRate={shot.speed ?? 1}
            trimBefore={shot.trimBefore}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Placeholder tone={shot.tone} />
        )}
      </AbsoluteFill>

      {/* overlay para legibilidade do texto */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(4,5,7,0.35) 0%, rgba(4,5,7,0.0) 35%, rgba(4,5,7,0.0) 55%, rgba(4,5,7,0.78) 100%)',
        }}
      />

      {/* kicker no rodapé esquerdo (estilo lower-third de trailer) */}
      {shot.kicker && (
        <AbsoluteFill style={{ justifyContent: 'flex-end', padding: sz.pad }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, ...fadeUp(frame, 2) }}>
            <div style={{ width: 46, height: 3, background: theme.color.gold }} />
            <span
              style={{
                fontFamily: LABEL,
                fontWeight: 600,
                fontSize: sz.kicker,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: theme.color.white,
              }}
            >
              {shot.kicker}
            </span>
          </div>
        </AbsoluteFill>
      )}

      {/* caption central-baixa (frase sobre o clipe herói) */}
      {shot.caption && (
        <AbsoluteFill
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            textAlign: 'center',
            padding: `${sz.pad}px ${sz.pad * 1.4}px`,
          }}
        >
          <div
            style={{
              fontFamily: DISPLAY,
              fontSize: sz.titleSm,
              lineHeight: 1.1,
              color: theme.color.white,
              textShadow: '0 6px 30px rgba(0,0,0,0.6)',
              ...fadeUp(frame, 6),
            }}
          >
            {shot.caption}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

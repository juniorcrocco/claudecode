import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { config } from './config';
import { theme } from './theme';
import { fadeUp, blurIn } from './lib/animations';
import { Fonts } from './Fonts';
import { GfxBackground } from './components/GfxBackground';
import { Intro } from './components/Intro';
import { TitleCard } from './components/TitleCard';
import { CinematicGrade } from './components/CinematicGrade';
import { Letterbox } from './components/Letterbox';
import { FlashLayer } from './components/FlashLayer';
import { Soundtrack } from './components/Soundtrack';

/**
 * TEASER — versao 100% motion-graphics (sem footage). Renderiza neste
 * ambiente (usa Google Fonts, sem precisar dos videos do Drive). Serve de
 * preview do estilo; o trailer completo com a sua filmagem e a comp
 * "PalestraTrailer".
 */
const INTRO = 40;
const TITLE = 120;
const END = 110;
export const TEASER_DURATION = INTRO + TITLE + END;
const FLASHES = [0, INTRO, INTRO + TITLE];

const GfxEndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const speaker = blurIn(frame, 8, 16);
  const end = fadeUp(frame, 22, 20);
  const cta = fadeUp(frame, 32, 16);
  const toBlack = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  return (
    <AbsoluteFill>
      <GfxBackground seedKey="end" />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div>
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

export const Teaser: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.color.ink }}>
      <Fonts />
      <Soundtrack />

      <Sequence from={0} durationInFrames={INTRO}>
        <Intro />
      </Sequence>

      <Sequence from={INTRO} durationInFrames={TITLE}>
        <AbsoluteFill>
          <GfxBackground seedKey="title" />
          <TitleCard solidBg={false} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={INTRO + TITLE} durationInFrames={END}>
        <GfxEndCard />
      </Sequence>

      <FlashLayer flashes={FLASHES} />
      <CinematicGrade />
      <Letterbox />
    </AbsoluteFill>
  );
};

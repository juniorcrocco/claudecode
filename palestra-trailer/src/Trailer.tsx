import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { buildTimeline } from './clips';
import { theme } from './theme';
import { shake } from './lib/animations';
import { Fonts } from './Fonts';
import { Clip } from './components/Clip';
import { Intro } from './components/Intro';
import { TitleCard } from './components/TitleCard';
import { EndCard } from './components/EndCard';
import { Kickers } from './components/Kickers';
import { FlashLayer } from './components/FlashLayer';
import { CinematicGrade } from './components/CinematicGrade';
import { Letterbox } from './components/Letterbox';
import { Soundtrack } from './components/Soundtrack';

const tl = buildTimeline();

/** Aplica shake de camera so durante a rajada do climax. */
const ClimaxShake: React.FC<{ from: number; children: React.ReactNode }> = ({
  from,
  children,
}) => {
  const frame = useCurrentFrame();
  const active = frame >= from && frame < tl.endcard.from;
  const transform = active ? shake(frame - from, 0.8) : 'translate(0,0)';
  return <AbsoluteFill style={{ transform }}>{children}</AbsoluteFill>;
};

export const Trailer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.color.ink }}>
      <Fonts />
      <Soundtrack />

      <ClimaxShake from={tl.climaxFrom}>
        {/* INTRO no preto */}
        <Sequence from={tl.intro.from} durationInFrames={tl.intro.dur}>
          <Intro />
        </Sequence>

        {/* MONTAGEM (todos os clipes) */}
        {tl.shots.map((s, i) => (
          <Sequence key={i} from={s.from} durationInFrames={s.dur + 1}>
            <Clip file={s.file} startFrom={s.startFrom} kb={s.kb} speed={s.speed} />
          </Sequence>
        ))}

        {/* TITLE DROP */}
        <Sequence from={tl.title.from} durationInFrames={tl.title.dur}>
          <TitleCard />
        </Sequence>

        {/* END CARD */}
        <Sequence from={tl.endcard.from} durationInFrames={tl.endcard.dur}>
          <EndCard file={tl.endcard.file} />
        </Sequence>
      </ClimaxShake>

      {/* palavras de impacto na rajada */}
      <Kickers kickers={tl.kickers} />

      {/* camadas globais */}
      <FlashLayer flashes={tl.flashes} />
      <CinematicGrade />
      <Letterbox />
    </AbsoluteFill>
  );
};

export const TRAILER_DURATION = tl.total;

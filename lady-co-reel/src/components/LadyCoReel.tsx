import { AbsoluteFill, Sequence } from 'remotion';
import { scenes } from '../scenes';
import { Scene } from './Scene';
import { Soundtrack } from './Soundtrack';
import { CinematicGrade } from './CinematicGrade';
import { theme } from '../theme';

export const LadyCoReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.color.ink }}>
      <Soundtrack />
      {scenes.map((s) => (
        <Sequence key={s.id} from={s.from} durationInFrames={s.durationInFrames} name={s.id}>
          <Scene data={s} />
        </Sequence>
      ))}
      {/* grade cinematográfico global por cima de tudo (cor, grão, vinheta, leak) */}
      <CinematicGrade />
    </AbsoluteFill>
  );
};

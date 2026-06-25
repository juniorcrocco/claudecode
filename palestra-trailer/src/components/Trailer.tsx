import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { timeline } from '../timeline';
import { Shot } from './Shot';
import { Soundtrack } from './Soundtrack';
import { CinematicGrade } from './CinematicGrade';
import { theme } from '../theme';

/**
 * O trailer inteiro. Roda igual em 16:9 e 9:16 — o layout escala pela largura
 * do quadro e os vídeos usam objectFit:cover. Só transições do tipo "fade"
 * encurtam a timeline (crossfade); "flash" é um overlay e o resto é corte seco.
 */
export const Trailer: React.FC = () => {
  const children: React.ReactNode[] = [];

  timeline.forEach((shot) => {
    if (shot.transitionIn?.type === 'fade') {
      children.push(
        <TransitionSeries.Transition
          key={`${shot.id}-t`}
          timing={linearTiming({ durationInFrames: shot.transitionIn.dur })}
          presentation={fade()}
        />,
      );
    }
    children.push(
      <TransitionSeries.Sequence key={shot.id} durationInFrames={shot.dur}>
        <Shot shot={shot} />
      </TransitionSeries.Sequence>,
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.color.ink }}>
      <Soundtrack />
      <TransitionSeries>{children}</TransitionSeries>
      {/* grade cinematográfico global por cima de tudo */}
      <CinematicGrade />
    </AbsoluteFill>
  );
};

import { Composition } from 'remotion';
import { LadyCoReel } from './components/LadyCoReel';
import { DURATION, FPS } from './scenes';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="LadyCoReel"
      component={LadyCoReel}
      durationInFrames={DURATION}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};

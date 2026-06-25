import { Composition } from 'remotion';
import { Trailer } from './components/Trailer';
import { totalDuration } from './timeline';
import { DIMENSIONS } from './theme';
import { FPS } from './config';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Trailer16x9"
        component={Trailer}
        durationInFrames={totalDuration}
        fps={FPS}
        width={DIMENSIONS.landscape.width}
        height={DIMENSIONS.landscape.height}
      />
      <Composition
        id="Trailer9x16"
        component={Trailer}
        durationInFrames={totalDuration}
        fps={FPS}
        width={DIMENSIONS.portrait.width}
        height={DIMENSIONS.portrait.height}
      />
    </>
  );
};

import { Composition } from 'remotion';
import { config } from './config';
import { Trailer, TRAILER_DURATION } from './Trailer';
import { Teaser, TEASER_DURATION } from './Teaser';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Trailer completo com a SUA filmagem (rode npm run fetch antes). */}
      <Composition
        id="PalestraTrailer"
        component={Trailer}
        durationInFrames={TRAILER_DURATION}
        fps={config.fps}
        width={config.width}
        height={config.height}
      />
      {/* Teaser 100% motion-graphics (sem footage) — preview do estilo. */}
      <Composition
        id="Teaser"
        component={Teaser}
        durationInFrames={TEASER_DURATION}
        fps={config.fps}
        width={config.width}
        height={config.height}
      />
    </>
  );
};

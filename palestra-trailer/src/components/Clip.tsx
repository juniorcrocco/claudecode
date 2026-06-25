import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { kenBurns } from '../lib/animations';

/**
 * Um clipe da montagem. Cobre a tela inteira (objectFit cover — corta os
 * clipes verticais de celular pra preencher o 16:9 com energia de trailer),
 * com Ken Burns lento e um leve gradiente pra escurecer as bordas.
 */
export const Clip: React.FC<{
  file: string;
  startFrom: number;
  kb: 'in' | 'out';
  speed?: number;
}> = ({ file, startFrom, kb, speed = 1 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scale = kenBurns(frame, durationInFrames, kb, 0.14);

  return (
    <AbsoluteFill style={{ backgroundColor: '#05080b', overflow: 'hidden' }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <OffthreadVideo
          src={staticFile(`video/${file}`)}
          muted
          playbackRate={speed}
          startFrom={startFrom}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>
      {/* contraste pro texto e foco no centro */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(120% 90% at 50% 45%, rgba(0,0,0,0) 50%, rgba(5,8,11,0.6) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

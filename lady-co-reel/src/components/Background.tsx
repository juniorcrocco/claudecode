import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { kenBurns } from '../lib/animations';
import { theme } from '../theme';
import { USE_PLACEHOLDER_BG } from '../config';
import { Block } from '../scenes';

const blockGradient: Record<Block, string> = {
  abertura: `linear-gradient(160deg, ${theme.color.coffee}, ${theme.color.ink})`,
  rajada: `linear-gradient(160deg, ${theme.color.rose}, ${theme.color.ink})`,
  respira: `linear-gradient(160deg, ${theme.color.sage}, ${theme.color.ink})`,
  fechamento: `linear-gradient(160deg, ${theme.color.coffee}, ${theme.color.ink})`,
};

export const Background: React.FC<{ bg?: string; block: Block }> = ({ bg, block }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const kb = kenBurns(frame, durationInFrames, 'in');

  const useVideo = !USE_PLACEHOLDER_BG && bg;

  return (
    <AbsoluteFill>
      {useVideo ? (
        <AbsoluteFill style={{ ...kb }}>
          <OffthreadVideo
            src={staticFile(`video/${bg}`)}
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AbsoluteFill>
      ) : (
        <AbsoluteFill style={{ ...kb, background: blockGradient[block] }} />
      )}

      {/* overlay para legibilidade do texto */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(43,35,32,0.25) 0%, rgba(43,35,32,0.65) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

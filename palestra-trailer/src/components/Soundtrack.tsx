import { staticFile } from 'remotion';
import { Audio } from '@remotion/media';
import { HAS_AUDIO } from '../config';

export const Soundtrack: React.FC = () => {
  if (!HAS_AUDIO) return null;
  return <Audio src={staticFile('audio/track.mp3')} />;
};

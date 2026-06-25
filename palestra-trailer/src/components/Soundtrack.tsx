import { Audio, staticFile } from 'remotion';
import { config } from '../config';

/** Trilha opcional. Ative em config.hasAudio e coloque public/audio/track.mp3. */
export const Soundtrack: React.FC = () => {
  if (!config.hasAudio) return null;
  return <Audio src={staticFile('audio/track.mp3')} />;
};

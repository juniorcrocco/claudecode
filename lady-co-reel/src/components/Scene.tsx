import { AbsoluteFill } from 'remotion';
import { SceneData } from '../scenes';
import { Background } from './Background';
import { Lettering } from './Lettering';

export const Scene: React.FC<{ data: SceneData }> = ({ data }) => {
  return (
    <AbsoluteFill>
      <Background bg={data.bg} block={data.block} />
      <Lettering data={data} />
    </AbsoluteFill>
  );
};

import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// H.264 com qualidade alta para projecao em telao.
Config.setCodec('h264');

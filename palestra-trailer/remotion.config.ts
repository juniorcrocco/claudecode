import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// H.264 de boa qualidade para o trailer.
Config.setCodec('h264');

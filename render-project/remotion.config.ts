import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// Community components may use loose typing; keep the bundler permissive.
Config.overrideWebpackConfig((config) => config);

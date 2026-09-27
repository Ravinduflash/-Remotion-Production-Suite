import path from 'node:path';
import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// remocn (remocn.dev) registry files import each other through shadcn-style aliases. They are saved verbatim,
// flat, into remotion/community/ (synced to src/remotion/community/), so both aliases resolve there.
const COMMUNITY = path.resolve(process.cwd(), 'src', 'remotion', 'community');
Config.overrideWebpackConfig((config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: {
      ...(config.resolve?.alias as Record<string, string> | undefined),
      '@/lib/remocn-ui': path.join(COMMUNITY, 'remocn-ui'), // multi-file core lib (useTypewriter, colour, theme)
      '@/lib/remocn': COMMUNITY,
      '@/components/remocn': COMMUNITY,
    },
  },
}));

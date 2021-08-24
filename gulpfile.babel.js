import { series } from 'gulp';

import clear from './gulp/tasks/clear';
import server from './gulp/tasks/server';
import { webpackBuild, webpackWatch } from './gulp/tasks/webpack';
import config from './gulp/config';

config.setEnv();

export const clean = clear;

export const build = series(
  clear,
  webpackBuild,
);

export const watch = series(
  build,
  server,
  webpackWatch,
);

export default build;

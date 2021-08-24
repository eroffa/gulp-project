import { series } from 'gulp';

import clear from './gulp/tasks/clear';
import config from './gulp/config';

config.setEnv();

export const clean = clear;

export const build = series(
  clear,
);

export const watch = series(
  build,
);

export default build;

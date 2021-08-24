import { series, parallel } from 'gulp';

import clear from './gulp/tasks/clear';
import server from './gulp/tasks/server';
import { webpackBuild, webpackWatch } from './gulp/tasks/webpack';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts';
import { pugBuild, pugWatch } from './gulp/tasks/pug';
import config from './gulp/config';

config.setEnv();

export const clean = clear;

export const build = series(
  clear,

  parallel(
    webpackBuild,
    scriptsBuild,

    pugBuild,
  ),
);

export const watch = series(
  build,
  server,

  parallel(
    webpackWatch,
    scriptsWatch,

    pugWatch,
  ),
);

export const pug = pugBuild;

export default build;

import { series, parallel } from 'gulp';

import clear from './gulp/tasks/clear';
import server from './gulp/tasks/server';
import { webpackBuild, webpackWatch } from './gulp/tasks/webpack';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts';
import { pugBuild, pugWatch } from './gulp/tasks/pug';
import { htmlBuild, htmlWatch } from './gulp/tasks/html';
import { stylesBuild, stylesWatch } from './gulp/tasks/styles';
import config from './gulp/config';

config.setEnv();

export const clean = clear;

export const build = series(
  clear,

  parallel(
    webpackBuild,
    scriptsBuild,

    pugBuild,
    htmlBuild,

    stylesWatch,
  ),
);

export const watch = series(
  build,
  server,

  parallel(
    webpackWatch,
    scriptsWatch,

    pugWatch,
    htmlWatch,

    stylesBuild,
  ),
);

export default build;

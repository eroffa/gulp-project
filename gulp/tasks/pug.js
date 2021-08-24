import { src, dest, watch } from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import pug from 'gulp-pug';
import gulpif from 'gulp-if';
import { setup as emittySetup } from '@zoxon/emitty';

import config from '../config';

const emittyPug = emittySetup(config.src.pug, 'pug', {
  makeVinylFile: true,
});

global.watch = false;
global.emittyChangedFile = {
  path: '',
  stats: null,
};

export const pugBuild = () => (
  src([`${config.src.pug}/*.pug`])
    .pipe(plumber({
      errorHandler: notify.onError((err) => (
        {
          title: 'Ошибка в задаче pugBuild',
          sound: false,
          message: err.message,
        }
      )),
    }))
    .pipe(
      gulpif(
        global.watch,
        emittyPug.stream(
          global.emittyChangedFile.path,
          global.emittyChangedFile.stats,
        ),
      ),
    )
    .pipe(pug({
      pretty: true,
    }))
    .pipe(dest(`${config.dist.html}`))
);

export const pugWatch = () => {
  global.watch = true;
  watch(`${config.src.pug}/**/*.pug`, pugBuild)
    .on('all', (event, filepath, stats) => {
      global.emittyChangedFile = {
        path: filepath, stats,
      };
    });
};

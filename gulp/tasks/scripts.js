import { src, dest, watch } from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import uglify from 'gulp-uglify-es';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';

import config from '../config';

export const scriptsBuild = () => (
  src([
    'node_modules/jquery/dist/jquery.js',
    `${config.src.js}/main.js`,
  ])
    .pipe(plumber({
      errorHandler: notify.onError((err) => (
        {
          title: 'Ошибка в задаче scriptsBuild',
          sound: false,
          message: err.message,
        }
      )),
    }))
    .pipe(gulpif(config.isDev, sourcemaps.init()))
    .pipe(gulpif(config.isProd, concat('main.min.js')))
    .pipe(gulpif(config.isProd, uglify()))
    .pipe(gulpif(config.isDev, sourcemaps.write()))
    .pipe(dest(`${config.dist.js}`))
);

export const scriptsWatch = () => watch(`${config.src.js}/**/*.js`, scriptsBuild);

import {
  src,
  dest,
  watch,
  series,
} from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import smartGrid from 'smart-grid';
import csso from 'gulp-csso';
import sass from 'gulp-sass';
import importFresh from 'import-fresh';
import sassGlob from 'gulp-sass-glob';

import config from '../config';

const SMART_GRID_CONFIG_NAME = 'smart-grid-config.js';

const scssBuild = () => (
  src(`${config.src.scss}/**/*.{scss,sass}`)
    .pipe(plumber({
      errorHandler: notify.onError((err) => ({
        title: 'Ошибка в задаче stylesBuild',
        sound: false,
        message: err.message,
      })),
    }))
    .pipe(gulpif(config.isDev, sourcemaps.init()))
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: ['./node_modules'],
    }))
    .pipe(gcmq())
    .pipe(autoprefixer({ grid: 'no-autoplace' }))
    .pipe(gulpif(config.isProd, csso({
      comments: false,
    })))
    .pipe(gulpif(config.isProd, concat('main.min.css')))
    .pipe(gulpif(config.isDev, sourcemaps.write()))
    .pipe(dest(config.dist.css))
);

const smartGridBuild = (done) => {
  const smartGridConfig = importFresh(`../../${SMART_GRID_CONFIG_NAME}`);
  smartGrid(`${config.src.scss}/core/helpers`, smartGridConfig);

  done();
};

export const stylesBuild = series(
  smartGridBuild,
  scssBuild,
);

export const stylesWatch = () => {
  watch(`${config.src.scss}/**/*.{scss,sass}`, scssBuild);
  watch(`./${SMART_GRID_CONFIG_NAME}`, smartGridBuild);
};

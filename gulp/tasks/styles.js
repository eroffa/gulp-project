import { src, dest, watch } from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import csso from 'gulp-csso';

import config from '../config';

const sass = require('gulp-sass')(require('sass'));

export const stylesBuild = () => (
  src(`${config.src.scss}/*.{scss,sass}`)
    .pipe(plumber({
      errorHandler: notify.onError((err) => ({
        title: 'Ошибка в задаче stylesBuild',
        sound: false,
        message: err.message,
      })),
    }))
    .pipe(gulpif(config.isDev, sourcemaps.init()))
    .pipe(sass())
    .pipe(gcmq())
    .pipe(autoprefixer({ grid: 'no-autoplace' }))
    .pipe(gulpif(config.isProd, csso()))
    .pipe(gulpif(config.isProd, concat('main.min.css')))
    .pipe(gulpif(config.isDev, sourcemaps.write()))
    .pipe(dest(`${config.dist.css}`))
);

export const stylesWatch = () => watch(`${config.src.scss}/*.{scss,sass})`, stylesBuild);

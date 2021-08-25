import { src, dest, watch } from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import pug from 'gulp-pug';
import pugIncludeGlob from 'pug-include-glob';

import config from '../config';

export const pugBuild = () => (
  src(`${config.src.pug}/*.pug`)
    .pipe(plumber({
      errorHandler: notify.onError((err) => (
        {
          title: 'Ошибка в задаче pugBuild',
          sound: false,
          message: err.message,
        }
      )),
    }))
    .pipe(pug({
      pretty: true,
      plugins: [
        pugIncludeGlob(),
      ],
    }))
    .pipe(dest(config.dist.html))
);

export const pugWatch = () => watch(`${config.src.pug}/**/*.pug`, pugBuild);

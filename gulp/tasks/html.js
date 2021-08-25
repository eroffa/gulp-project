import { src, dest, watch } from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import panini from 'panini-svg';

import config from '../config';

export const htmlBuild = () => {
  panini.refresh();
  return src([`${config.src.html}/*.html`, `${config.src.html}/pages/**/*.html`])
    .pipe(plumber({
      errorHandler: notify.onError((err) => ({
        title: 'Ошибка в задаче htmlBuild',
        sound: false,
        message: err.message,
      })),
    }))
    .pipe(panini({
      root: `${config.src.html}`,
      layouts: `${config.src.html}/layouts`,
      partials: `${config.src.html}/partials`,
      helpers: `${config.src.html}/helpers`,
      data: `${config.src.html}/data`,
    }))
    .pipe(dest(`${config.dist.html}`));
};

export const htmlWatch = () => watch(`${config.src.html}/**/*.html`, htmlBuild);

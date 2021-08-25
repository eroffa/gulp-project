import {
  src, dest, watch, series,
} from 'gulp';
import gulpif from 'gulp-if';
import newer from 'gulp-newer';
import imagemin, {
  gifsicle, mozjpeg, optipng, svgo,
} from 'gulp-imagemin';
import pngQuant from 'imagemin-pngquant';
import webp from 'gulp-webp';

import config from '../config';

export const imageOptim = () => (
  src([`${config.src.images}/**/*`])
    .pipe(newer(config.dist.images))
    .pipe(gulpif(config.isProd, imagemin([
      gifsicle({
        interlaced: true,
      }),
      optipng({
        optimizationLevel: 5,
      }),
      pngQuant({
        quality: [0.8, 0.9],
      }),
      mozjpeg({
        quality: 75,
        progressive: true,
      }),
      svgo({
        plugins: [
          { cleanupIDs: false },
          { removeUselessDefs: false },
          { removeViewBox: true },
          { removeComments: true },
          { mergePaths: false },
        ],
      }),
    ], {
      verbose: true,
    })))
    .pipe(dest(config.dist.images))
);

const toWebp = () => (
  src(`${config.src.images}/**/*.{jpg,png,jpeg}`)
    .pipe(webp({
      quality: 80,
    }))
    .pipe(dest(config.dist.images))
);

export const imagesBuild = series(
  imageOptim,
  toWebp,
);

export const imagesWatch = () => watch(`${config.src.images}/**/*`, { ignoreInitial: false }, imagesBuild);

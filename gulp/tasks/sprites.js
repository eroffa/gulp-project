import {
  src,
  dest,
  watch,
  parallel,
} from 'gulp';
import imagemin from 'gulp-imagemin';
import svgstore from 'gulp-svgstore';
import filesExist from 'files-exist';
import concat from 'gulp-concat';

import config from '../config';

const spriteMono = () => (
  src(filesExist(`${config.src.iconsMono}/**/*.svg`, { exceptionMessage: 'Нет ни одного файла svg' }))
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          { cleanupIDs: true },
          { removeUselessDefs: true },
          { removeViewBox: false },
          { removeComments: true },
          {
            removeAttrs: {
              attrs: ['class', 'data-name', 'fill.*', 'stroke.*'],
            },
          },
        ],
      }),
    ]))
    .pipe(svgstore({
      inlineSvg: true,
    }))
    .pipe(concat('sprite-mono.svg'))
    .pipe(dest(config.dist.images))
);

const spriteMulti = () => (
  src(filesExist(`${config.src.iconsMulti}/**/*.svg`, { exceptionMessage: 'Нет ни одного файла svg' }))
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          { cleanupIDs: true },
          { removeUselessDefs: true },
          { removeViewBox: false },
          { removeComments: true },
          { removeUselessStrokeAndFill: false },
          { inlineStyles: true },
          {
            removeAttrs: {
              attrs: ['class', 'data-name'],
            },
          },
        ],
      }),
    ]))
    .pipe(svgstore({
      inlineSvg: true,
    }))
    .pipe(concat('sprite-multi.svg'))
    .pipe(dest(config.dist.images))
);

export const spritesBuild = parallel(
  spriteMono,
  spriteMulti,
);

export const spritesWatch = () => {
  watch(`${config.src.iconsMono}/**/*.svg`, { ignoreInitial: false }, spriteMono);
  watch(`${config.src.iconsMulti}/**/*.svg`, { ignoreInitial: false }, spriteMulti);
};

import { src, dest, watch } from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpackStream from 'webpack-stream';
import named from 'vinyl-named-with-path';

import config from '../config';

export const webpackBuild = () => (
  src([`${config.src.js}/**/*.js`])
    .pipe(plumber({
      errorHandler: notify.onError((err) => (
        {
          title: 'Ошибка в задаче webpackBuild',
          sound: false,
          message: err.message,
        }
      )),
    }))
    .pipe(named())
    .pipe(webpackStream({
      output: {
        filename: '[name].js',
      },
      mode: config.isProd ? 'production' : 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
            },
          },
        ],
      },
      devtool: config.isProd ? false : 'inline-source-map',
    }))
    .pipe(dest(`${config.dist.js}`))
);

export const webpackWatch = () => watch(`${config.src.js}/**/*.js`, webpackBuild);

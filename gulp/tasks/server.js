import browserSync from 'browser-sync';
import config from '../config';

const server = (done) => {
  browserSync.create().init({
    // proxy: 'http://site.example',
    port: 3000,
    server: {
      baseDir: config.dist.root,
    },
    files: [
      `${config.dist.html}/*.html`,
      `${config.dist.css}/*.css`,
      `${config.dist.js}/*.js`,
      {
        match: [`${config.dist.images}/**/*`],
        fn() {
          this.reload();
        },
      },
    ],
    open: false,
    notify: false,
  });

  done();
};

export default server;

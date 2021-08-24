const appPath = './app';
const distPath = './dist';

const config = {
  src: {
    root: appPath,
    scss: `${appPath}/scss`,
    js: `${appPath}/js`,
    fonts: `${appPath}/assets/fonts`,
    icons: `${appPath}/assets/icons`,
    images: `${appPath}/assets/images`,
    html: `${appPath}/html`,
    pug: `${appPath}/pug`,
  },

  dist: {
    root: distPath,
    html: distPath,
    pug: distPath,
    css: `${distPath}/css`,
    js: `${distPath}/js`,
    fonts: `${distPath}/fonts`,
    images: `${distPath}/images`,
  },

  setEnv() {
    this.isProd = process.argv.includes('--prod');
    this.isDev = !this.isProd;
  },
};

export default config;

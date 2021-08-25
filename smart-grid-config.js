// https://grid4web.ru/options

module.exports = {
  filename: '_smartgrid',
  outputStyle: 'scss',
  columns: 12,
  offset: '20px',
  mobileFirst: true,
  container: {
    maxWidth: '1200px',
    fields: '20px',
  },
  breakPoints: {
    xl: {
      width: '1200px',
    },
    lg: {
      width: '992px',
    },
    md: {
      width: '767px',
    },
    sm: {
      width: '576px',
    },
    xs: {
      width: '560px',
    },
  },
  mixinNames: {
    container: 'container',
    shift: 'offset',
  },
  tab: '  ',
};

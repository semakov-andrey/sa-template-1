const configServer              = require('../package.json').config.devServer;

module.exports = params => {
  const { gulp, target, browserSync } = params;
  gulp.task('browser', () => browserSync({
    host: configServer.host,
    https: configServer.secure,
    open: configServer.open,
    notify: false,
    port: configServer.port,
    server: target
  }));
};
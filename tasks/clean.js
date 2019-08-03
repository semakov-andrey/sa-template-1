const del                       = require('del');

module.exports = params => {
  const { gulp, target } = params;
  gulp.task('clean', () => del(`${target}/**/*`));
};
'use strict';

module.exports = params => {
  var { gulp, target, browserSync } = params;
  gulp.task('browser', () => {
    return browserSync({
      open: false,
      server: target,
      notify: false
    });
  });
};
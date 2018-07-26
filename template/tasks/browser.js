'use strict';

module.exports = params => {
  let { gulp, target, browserSync } = params;
  gulp.task('browser', () => {
    return browserSync({
      open: false,
      server: target,
      notify: false
    });
  });
};
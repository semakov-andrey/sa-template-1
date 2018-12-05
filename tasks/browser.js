'use strict';

module.exports = params => {
  let { gulp, target, browserSync } = params;
  gulp.task('browser', () => browserSync({
    open: false,
    server: target,
    notify: false
  }));
};
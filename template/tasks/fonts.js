'use strict';

module.exports = params => {
  let { gulp, source, target, browserSync } = params;
  gulp.task('fonts', () => {
    return gulp.src(source + '/_fonts/*.{woff,woff2}')
      .pipe(gulp.dest(target + '/fonts'))
      .on('end', browserSync.reload);
  });
};
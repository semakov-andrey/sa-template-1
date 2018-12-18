'use strict';

module.exports = params => {
  let { gulp, source, target, dirs, browserSync } = params;  
  let input      = `${source}/${dirs.copy[0]}/**/*`;
  let output     = `${target}/${dirs.copy[1]}`;
  gulp.task('copy', () => gulp.src(input).pipe(gulp.dest(output)).on('end', () => browserSync.reload()));
};
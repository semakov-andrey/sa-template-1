'use strict';

module.exports = params => {
  let { gulp, source, target, dirs, browserSync } = params;  
  let input      = `${source}/${dirs.fonts[0]}/*.{eot,otf,ttf,woff,woff2}`;
  let output     = `${target}/${dirs.fonts[1]}`;
  gulp.task('fonts', () => gulp.src(input).pipe(gulp.dest(output)).on('end', () => browserSync.reload()));
};
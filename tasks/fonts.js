module.exports = params => {
  const { gulp, source, target, dirs, browserSync } = params;
  const input  = `${source}/${dirs.fonts[0]}/*.{eot,otf,ttf,woff,woff2}`;
  const output = `${target}/${dirs.fonts[1]}`;
  gulp.task('fonts', () => gulp.src(input).pipe(gulp.dest(output)).on('end', () => browserSync.reload()));
};
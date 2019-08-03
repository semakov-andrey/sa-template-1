module.exports = params => {
  const { gulp, source, target, dirs, browserSync } = params;
  const input = `${source}/${dirs.copy[0]}/**/*`;
  const output = `${target}/${dirs.copy[1]}`;
  gulp.task('copy', () => gulp.src(input).pipe(gulp.dest(output)).on('end', () => browserSync.reload()));
};
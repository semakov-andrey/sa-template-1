module.exports = params => {
  const { gulp, source, dirs } = params;
  gulp.task('watch', () => {
    gulp.watch(`${source}/**/*.pug`, gulp.series('html')).on('all', (event, filepath) => {
      global.changedFile = filepath;
    });
    gulp.watch(`${source}/**/*.{sass,scss}`, gulp.series('css'));
    gulp.watch(`${source}/**/*.js`, gulp.series('js'));
    gulp.watch(`${source}/**/*.{ttf,woff,woff2}`, gulp.series('fonts'));
    gulp.watch(`${source}/${dirs.sprite[0]}/*.svg`, gulp.series('sprite'));
    gulp.watch([
      `${source}/${dirs.images[0]}/**/*.{jpg,gif,png,webp,svg,mp4}`,
      `!${source}/${dirs.sprite[0]}/*.svg`
    ], gulp.series('images'));
  });
};
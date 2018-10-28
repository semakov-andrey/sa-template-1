'use strict';

module.exports = params => {
  let { gulp, source, dirs } = params;
  gulp.task('watch', () => {    
    gulp.watch(`${source}/**/*.pug`, gulp.series('html'));
    gulp.watch(`${source}/**/*.{sass,scss}`, gulp.series('css'));
    gulp.watch(`${source}/**/*.js`, gulp.series('js'));
    gulp.watch(`${source}/**/*.{ttf,woff,woff2}`, gulp.series('fonts'));
    gulp.watch(`${source}/${dirs.sprite[0]}/*.svg`, gulp.series('sprite'));
    gulp.watch([
      `${source}/${dirs.images[0]}/**/*.{jpg,jpeg,gif,png,svg}`,
      `!${source}/${dirs.sprite[0]}/*.svg`
    ], gulp.series('images'));
  });
};
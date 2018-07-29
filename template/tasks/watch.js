'use strict';

module.exports = params => {
  let { gulp, source, dirs } = params;
  let isTask = task => {
    return gulp.tree().nodes.indexOf(task) !== -1 ? true : false;
  };
  gulp.task('watch', () => {    
    if(isTask('html'))    gulp.watch(source + '/**/*.pug', gulp.series('html'));
    if(isTask('css'))     gulp.watch(source + '/**/*.{sass,scss}', gulp.series('css'));
    if(isTask('js'))      gulp.watch(source + '/**/*.js', gulp.series('js'));
    if(isTask('fonts'))   gulp.watch(source + '/**/*.{ttf,woff,woff2}', gulp.series('fonts'));
    if(isTask('sprite'))  gulp.watch(source + '/' + dirs.sprite[0] + '/*.svg', gulp.series('sprite'));
    if(isTask('images'))   gulp.watch([
      source + '/' + dirs.images[0] + '/**/*.{jpg,jpeg,gif,png,svg}',
      '!' + source + '/' + dirs.sprite[0] + '/*.svg'
    ], gulp.series('images'));
  });
};
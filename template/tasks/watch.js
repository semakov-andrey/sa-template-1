'use strict';

module.exports = params => {
  let { gulp, source } = params;
  let isTask = task => {
    return gulp.tree().nodes.indexOf(task) !== -1 ? true : false;
  };
  gulp.task('watch', () => {    
    if(isTask('html'))    gulp.watch(source + '/**/*.pug', gulp.series('html'));
    if(isTask('css'))     gulp.watch(source + '/**/*.{sass,scss}', gulp.series('css'));
    if(isTask('js'))      gulp.watch(source + '/**/*.js', gulp.series('js'));
    if(isTask('fonts'))   gulp.watch(source + '/_fonts/*.{ttf,woff,woff2}', gulp.series('fonts'));
    if(isTask('sprite'))  gulp.watch(source + '/_images/_svg/*.svg', gulp.series('sprite'));
    if(isTask('image'))   gulp.watch(source + '/_images/**/*.{jpg,jpeg,gif,png,svg}', gulp.series('image'));
  });
};
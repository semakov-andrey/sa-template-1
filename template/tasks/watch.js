'use strict';

module.exports = params => {
  let { gulp, source } = params;
  let runTask = task => () => {
    if(gulp.tree().nodes.indexOf(task) !== -1) gulp.series(task)();
  };
  gulp.task('watch', () => {    
    gulp.watch(source + '/**/*.pug', runTask('html'));
    gulp.watch(source + '/**/*.{sass,scss}', runTask('css'));
    gulp.watch(source + '/**/*.js', runTask('js'));
    gulp.watch(source + '/_fonts/*.{woff,woff2}', runTask('fonts'));
    gulp.watch(source + '/_images/_svg/*.svg', runTask('sprite'));
    gulp.watch(source + '/_images/**/*.{jpg,jpeg,gif,png}', runTask('compress'));
  });
};
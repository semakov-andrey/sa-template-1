'use strict';

module.exports = params => {
  var { gulp, source } = params;
  gulp.task('watch', () => {
    global.watch = true;
    gulp.watch(source + '/**/*.pug', gulp.series('html')).on('all', (event, filepath) => {
			global.emittyChangedFile = filepath;
		});
    gulp.watch(source + '/**/*.{sass,scss}', gulp.series('css'));
    gulp.watch(source + '/**/*.js', gulp.series('js'));
    gulp.watch(source + '/_fonts/*.{woff,woff2}', gulp.series('fonts'));
    gulp.watch(source + '/_images/_svg/*.svg', gulp.series('svgSprite'));
    gulp.watch(source + '/_images/_png/*.png', gulp.series('pngSprite', 'css'));
    gulp.watch(source + '/_images/**/*.{jpg,jpeg,gif,png}', gulp.series('compress'));
  });
};
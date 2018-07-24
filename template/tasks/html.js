'use strict';

var pug             = require('gulp-pug');

module.exports = params => {
  var { gulp, source, target, plumber, notify, gulpif, browserSync, emitty } = params;
  gulp.task('html', () => {
    return new Promise((resolve, reject) => {
      const sourceOptions = global.watch ? { read: false } : {};

      emitty.scan(global.emittyChangedFile).then(() => {
        gulp.src([
          source + '/**/*.pug',
          '!' + source + '/{**/\_*,**/\_*/**}'
        ], sourceOptions)
        .pipe(plumber({
          errorHandler: notify.onError({
            sound: false,
            title: 'html',
            message: error => error.message
          })
        }))
        .pipe(gulpif(global.watch, emitty.stream(global.emittyChangedFile)))
        .pipe(pug({
          pretty: true
        }))
        .pipe(gulp.dest(target))
        .on('end', () => {
          browserSync.reload();
          resolve();
        })
				.on('error', reject);
      });
    });
  });
};
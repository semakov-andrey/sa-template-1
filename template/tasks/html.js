'use strict';

const pug             = require('gulp-pug');

module.exports = params => {
  let { gulp, source, target, plumber, notify, gulpif, browserSync } = params;
  gulp.task('html', () => {    
    return gulp.src([
      source + '/**/*.pug',
      '!' + source + '/{**/\_*,**/\_*/**}'
    ])
    .pipe(plumber({
      errorHandler: notify.onError({
        sound: false,
        title: 'html',
        message: error => error.message
      })
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(target))
    .on('end', () => {
      browserSync.reload();
    });
  });
};
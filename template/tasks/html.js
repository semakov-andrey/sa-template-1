'use strict';

const pug             = require('gulp-pug');

module.exports = params => {
  let { gulp, source, target, dirs, plumber, notify, gulpif, browserSync } = params;
  let input = `${source}/${dirs.html[0]}/*.pug`;
  let output = `${target}/${dirs.html[1]}`;
  gulp.task('html', () => gulp.src(input)
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
    .pipe(gulp.dest(output))
    .on('end', () => browserSync.reload()));
};
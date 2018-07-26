'use strict';

const imagemin        = require('gulp-imagemin');
const pngquant        = require('imagemin-pngquant');
const rename          = require('gulp-rename');

module.exports = params => {
  let { gulp, production, source, target, gulpif, browserSync } = params;
  gulp.task('compress', () => {
    return gulp.src(source + '/_images/**/*.{jpg,jpeg,gif,png}')
      .pipe(gulpif(production, imagemin({
        progressive: true,
        use: [pngquant()]
      })))
      .pipe(rename(path => path.dirname = '/'))
      .pipe(gulp.dest(target + '/images'))
      .on('end', browserSync.reload);
  });
}
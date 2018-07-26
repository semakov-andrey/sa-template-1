'use strict';

const sass            = require('gulp-sass');
const postcss         = require('gulp-postcss');
const autoprefixer    = require('autoprefixer');
const cssnano         = require('gulp-cssnano');
const rename          = require('gulp-rename');

module.exports = params => {
  let { gulp, production, source, target, plumber, notify, gulpif, browserSync, browserList, sourcemaps } = params;
  gulp.task('css', () => {
    return gulp.src([
      source + '/_styles/*.{sass,scss}',
      '!' + source + '/_styles/_*.{sass,scss}'
    ])
    .pipe(plumber({
      errorHandler: notify.onError({
        sound: false,
        title: 'css',
        message: error => error.message
      })
    }))
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss([
       autoprefixer({ browsers: browserList })
    ]))
    .pipe(gulpif(production, cssnano()))
    .pipe(gulpif(!production, sourcemaps.write('.')))
    .pipe(gulp.dest(target + '/styles'))
    .pipe(browserSync.stream({ match: '**/*.css' }));
  });
};
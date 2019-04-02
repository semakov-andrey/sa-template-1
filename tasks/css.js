'use strict';

const sass                      = require('gulp-sass');
const postcss                   = require('gulp-postcss');
const autoprefixer              = require('autoprefixer');
const cssnano                   = require('gulp-cssnano');

module.exports = params => {
  const { gulp, production, source, target, dirs, entries, plumber, notify, gulpif, browserSync, browserList, sourcemaps } = params;
  const input = entries.css.map(value => `${source}/${dirs.css[0]}/${value}.scss`);
  const output = `${target}/${dirs.css[1]}`;
  gulp.task('css', () => gulp.src(input)
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
    .pipe(postcss([autoprefixer({
      browsers: browserList
    })]))
    .pipe(gulpif(production, cssnano({
      discardComments: {
        removeAll: true
      },
      minifyFontValues: {
        removeQuotes: false
      },
      reduceIdents: false,
      zindex: false
    })))
    .pipe(gulpif(!production, sourcemaps.write('.')))
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream({
      match: '**/*.css'
    })));
};
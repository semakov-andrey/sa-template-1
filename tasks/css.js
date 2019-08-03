const sass                      = require('gulp-sass');
const postcss                   = require('gulp-postcss');
const autoprefixer              = require('autoprefixer');
const cssnano                   = require('gulp-cssnano');

module.exports = params => {
  const { gulp, isProd, source, target, dirs, entries, plumber, notify, gulpif, browserSync, sourcemaps } = params;
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
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulpif(isProd, cssnano({
      discardComments: {
        removeAll: true
      },
      minifyFontValues: {
        removeQuotes: false
      },
      reduceIdents: false,
      zindex: false
    })))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream({
      match: '**/*.css'
    })));
};
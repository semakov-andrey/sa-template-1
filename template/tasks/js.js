'use strict';

const browserify              = require('browserify');
const babelify                = require('babelify');
const uglify                  = require('gulp-uglify');
const vsource                 = require('vinyl-source-stream');
const buffer                  = require('vinyl-buffer');

module.exports = params => {
  let { gulp, production, source, target, dirs, notify, gulpif, browserSync, sourcemaps } = params;
  let input = source + '/' + dirs.js[0] + '/' + dirs.js[2] + '.js';
  let output = target + '/' + dirs.js[1];
  let rebundle = bundler => {
    return bundler.bundle()
    .on('error', notify.onError({
      sound: false,
      title: 'js',
      message: error => error.message
    }))
    .pipe(vsource('main.js'))
    .pipe(buffer())
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(gulpif(production, uglify()))
    .pipe(gulpif(!production, sourcemaps.write('.')))
    .pipe(gulp.dest(output))
    .on('end', () => browserSync.reload());
  };

  gulp.task('js', () => {
    let bundler = browserify(input, {
      debug: true
    }).transform(babelify, {
      presets: ['env'],
      sourceMaps: true
    });
    return rebundle(bundler);
  });
};
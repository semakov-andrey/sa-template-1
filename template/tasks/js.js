var browserify              = require('browserify'),
  babelify                  = require('babelify'),
  uglify                    = require('gulp-uglify'),
  vsource                   = require('vinyl-source-stream'),
  buffer                    = require('vinyl-buffer'),
  util                      = require('gulp-util');

  'use strict';

  module.exports = params => {
  var { gulp, production, source, target, notify, gulpif, browserSync, sourcemaps } = params,
    rebundle = bundler => {
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
    .pipe(gulp.dest(target + '/scripts'))
    .on('end', () => browserSync.reload());
  };

  gulp.task('js', () => {
    var bundler = browserify(source + '/_scripts/main.js', {
      debug: true
    }).transform(babelify, {
      presets: ['es2015'],
      sourceMaps: true
    });
    return rebundle(bundler);
  });
};
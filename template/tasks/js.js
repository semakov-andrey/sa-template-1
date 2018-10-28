'use strict';

const browserify              = require('browserify');
const babelify                = require('babelify');
const uglify                  = require('gulp-uglify');
const vsource                 = require('vinyl-source-stream');
const buffer                  = require('vinyl-buffer');

module.exports = params => {
  let { gulp, production, source, target, dirs, entries, notify, gulpif, browserSync, sourcemaps } = params;
  let input = entries.css.map(value => `${source}/${dirs.js[0]}/${value}.js`);
  let output = `${target}/${dirs.js[1]}`;
  let rebundle = bundler => bundler.bundle()
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
  gulp.task('js', () => rebundle(browserify(input, {
    debug: true
  }).transform(babelify, {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-transform-object-assign'],
    sourceMaps: true
  })));
};
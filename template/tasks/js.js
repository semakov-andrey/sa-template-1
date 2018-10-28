'use strict';

const browserify              = require('browserify');
const babelify                = require('babelify');
const uglify                  = require('gulp-uglify');
const vsource                 = require('vinyl-source-stream');
const buffer                  = require('vinyl-buffer');
const path                    = require('path');

module.exports = params => {
  let { gulp, production, source, target, dirs, entries, notify, gulpif, browserSync, sourcemaps } = params;
  let tasks = [];
  let output = `${target}/${dirs.js[1]}`; 
  let JS = function(input) {
    return function jsBundle() {
      return browserify(input, {
        debug: true
      })
      .transform(babelify, {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-object-assign'],
        sourceMaps: true
      })
      .bundle()
      .on('error', notify.onError({
        sound: false,
        title: 'js',
        message: error => error.message
      }))
      .pipe(vsource(path.basename(input)))
      .pipe(buffer())
      .pipe(gulpif(!production, sourcemaps.init()))
      .pipe(gulpif(production, uglify()))
      .pipe(gulpif(!production, sourcemaps.write('.')))
      .pipe(gulp.dest(output));
    };
  };
  entries.js.forEach(value => tasks.push(new JS(`${source}/${dirs.js[0]}/${value}.js`)));
  let jsDone = done => {
    browserSync.reload();
    done();
  };
  gulp.task('js', gulp.series(gulp.parallel(...tasks), jsDone));
};
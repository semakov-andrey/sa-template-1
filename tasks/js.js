const browserify                = require('browserify');
const babelify                  = require('babelify');
const uglify                    = require('gulp-uglify');
const vsource                   = require('vinyl-source-stream');
const buffer                    = require('vinyl-buffer');
const path                      = require('path');

module.exports = params => {
  const { gulp, isProd, source, target, dirs, entries, notify, gulpif, browserSync, sourcemaps } = params;
  const tasks = [];
  const output = `${target}/${dirs.js[1]}`;
  const JS = function (input) {
    return function jsBundle() {
      return browserify(input, {
        debug: true
      })
        .transform(babelify, {
          presets: [ '@babel/preset-env' ],
          plugins: [ '@babel/plugin-transform-object-assign' ],
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
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(gulpif(isProd, uglify()))
        .pipe(gulpif(!isProd, sourcemaps.write('.')))
        .pipe(gulp.dest(output));
    };
  };
  entries.js.forEach(value => tasks.push(new JS(`${source}/${dirs.js[0]}/${value}.js`)));
  const jsDone = done => {
    browserSync.reload();
    done();
  };
  gulp.task('js', gulp.series(gulp.parallel(...tasks), jsDone));
};
const packageJSON               = require('./package.json');
const gulp                      = require('gulp');
const minimist                  = require('minimist');
const glob                      = require('glob');
const plumber                   = require('gulp-plumber');
const notify                    = require('gulp-notify');
const gulpif                    = require('gulp-if');
const sourcemaps                = require('gulp-sourcemaps');
const browserSync	              = require('browser-sync');
const args                      = minimist(process.argv.slice(2));
const isProd                    = typeof args.production !== 'undefined';

const {
  config: {
    directories: { source, development, production, tasks: dirs },
    entries,
    tasks
  }
} = packageJSON;
const target = isProd ? production : development;

glob.sync('./tasks/**/*.js').map(file => require(file)({
  packageJSON,
  gulp,
  isProd,
  source,
  target,
  dirs,
  entries,
  plumber,
  notify,
  gulpif,
  browserSync,
  sourcemaps
}));

gulp.task('serve', gulp.series('clean', gulp.parallel(...tasks), gulp.parallel('watch', 'browser')));

gulp.task('build', gulp.series('clean', gulp.parallel(...tasks)));

gulp.task('default', gulp.series('serve'));
'use strict';

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
const production                = typeof args.production !== 'undefined';
const source                    = packageJSON.config.directories.source;
const target                    = packageJSON.config.directories[production ? 'production' : 'development'];
const dirs                      = packageJSON.config.directories.tasks;
const entries                   = packageJSON.config.entries;
const browserList               = packageJSON.config.browsers;
const work                      = packageJSON.config.tasks;

glob.sync('./tasks/**/*.js').map(file => require(file)({
  packageJSON,
  gulp,
  production,
  source,
  target,
  dirs,
  entries,
  plumber,
  notify,
  gulpif,
  browserSync,
  browserList,
  sourcemaps
}));

gulp.task('serve', gulp.series('clean', gulp.parallel(...work), gulp.parallel('watch', 'browser')));

gulp.task('build', gulp.series('clean', gulp.parallel(...work)));

gulp.task('default', gulp.series('serve'));
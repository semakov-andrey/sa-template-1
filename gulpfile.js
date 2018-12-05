'use strict';

const packageJSON     = require('./package.json');
const gulp            = require('gulp');
const minimist        = require('minimist');
const glob            = require('glob');
const plumber         = require('gulp-plumber');
const notify          = require('gulp-notify');
const gulpif          = require('gulp-if');
const sourcemaps      = require('gulp-sourcemaps');
const browserSync	    = require('browser-sync');

let args              = minimist(process.argv.slice(2));
let production        = typeof(args.production) !== 'undefined';
let source            = packageJSON.config.directories.source;
let target            = packageJSON.config.directories[production ? 'production' : 'development'];
let dirs              = packageJSON.config.directories.tasks;
let entries           = packageJSON.config.entries;
let browserList       = packageJSON.config.browsers;
let work              = packageJSON.config.tasks;
  
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
'use strict';

var packageJSON     = require('./package.json'),
  gulp              = require('gulp'),
  minimist          = require('minimist'),
  glob              = require('glob'),
  plumber           = require('gulp-plumber'),
  notify            = require('gulp-notify'),
  gulpif            = require('gulp-if'),
  sourcemaps        = require('gulp-sourcemaps'),
  args              = minimist(process.argv.slice(2)),
  production        = typeof(args.production) !== 'undefined',
  source            = packageJSON.config.directories.source,
  target            = packageJSON.config.directories[production ? 'production' : 'development'],
  browserSync	      = require('browser-sync'),
  browserList       = packageJSON.config.browsers,
  emitty            = require('emitty').setup(source, 'pug', { makeVinylFile: true });  
  
glob.sync('./tasks/**/*.js').map(file => require(file)({
  packageJSON,
  gulp,
  production,
  source,
  target,
  plumber,
  notify,
  gulpif,
  browserSync,
  browserList,
  sourcemaps,
  emitty
}));

gulp.task('serve', gulp.series('clean', 'pngSprite', gulp.parallel('html', 'css', 'js', 'fonts', 'svgSprite', 'compress'), gulp.parallel('watch', 'browser')));

gulp.task('build', gulp.series('clean', 'pngSprite', gulp.parallel('html', 'css', 'js', 'fonts', 'svgSprite', 'compress')));

gulp.task('default', gulp.series('serve'));

// gm mogrify -thumbnail 450x450 -background transparent -gravity center -extent 512x512-0-0 *.png
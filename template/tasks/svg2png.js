'use strict';

var svg2png         = require('gulp-svg2png');

module.exports = params => {
  var { packageJSON, gulp, source, target, plumber, notify } = params;
  gulp.task('svg2png', () => {
    return gulp.src(source + '/_vector/*.svg')
    .pipe(svg2png({
      width: packageJSON.config.svg2png.width,
      height: packageJSON.config.svg2png.height
    }))
    .pipe(gulp.dest(target + '/raster'));
  });
}
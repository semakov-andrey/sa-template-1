'use strict';

const svg2png         = require('gulp-svg2png');

module.exports = params => {
  let { packageJSON, gulp, source, target, dirs, plumber, notify } = params;
  gulp.task('svg2png', () => {
    let input = source + '/' + dirs.svg2png[0] + '/*.svg';
    let output = target + '/' + dirs.svg2png[1];
    return gulp.src(input)
    .pipe(svg2png({
      width: packageJSON.config.svg2png.width,
      height: packageJSON.config.svg2png.height
    }))
    .pipe(gulp.dest(output));
  });
}
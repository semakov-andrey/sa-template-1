'use strict';

const svg2png         = require('gulp-svg2png');

module.exports = params => {
  let { packageJSON, gulp, source, target, dirs, plumber, notify } = params;
  let input = `${source}/${dirs.svg2png[0]}/*.svg`;
  let output = `${target}/${dirs.svg2png[1]}`;
  gulp.task('svg2png', () => gulp.src(input)
    .pipe(svg2png({
      width: packageJSON.config.svg2png.width,
      height: packageJSON.config.svg2png.height
    }))
    .pipe(gulp.dest(output)));
};
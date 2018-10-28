'use strict';

const ttf2woff      = require('gulp-ttf2woff');
const ttf2woff2     = require('gulp-ttf2woff2');

module.exports = params => {
  let { gulp, source, target, dirs, browserSync } = params;  
  let input1     = `${source}/${dirs.fonts[0]}/*.{woff,woff2}`; 
  let input2     = `${source}/${dirs.fonts[0]}/*.ttf`;
  let output     = `${target}/${dirs.fonts[1]}`;
  let fontsCopy  = () => gulp.src(input1).pipe(gulp.dest(output));
  let fontsWoff  = () => gulp.src(input2).pipe(ttf2woff()).pipe(gulp.dest(output));
  let fontsWoff2 = () => gulp.src(input2).pipe(ttf2woff2()).pipe(gulp.dest(output));
  let fontsDone  = done => {
    browserSync.reload();
    done();
  };
  gulp.task('fonts', gulp.series(gulp.parallel(fontsCopy, fontsWoff, fontsWoff2), fontsDone));
};
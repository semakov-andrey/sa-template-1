'use strict';

const ttf2woff      = require('gulp-ttf2woff');
const ttf2woff2     = require('gulp-ttf2woff2');

module.exports = params => {
  let { gulp, source, target, browserSync } = params;  
  gulp.task('fonts', () => {
    return new Promise((resolve, reject) => {
      let fontsCopy = () => {
        return gulp.src(source + '/_fonts/*.{woff,woff2}')
          .pipe(gulp.dest(target + '/fonts'));
      };
      let fontsWoff = () => {
        return gulp.src(source + '/_fonts/*.ttf')
          .pipe(ttf2woff())
          .pipe(gulp.dest(target + '/fonts'));
      };
      let fontsWoff2 = () => {
        return gulp.src(source + '/_fonts/*.ttf')
          .pipe(ttf2woff2())
          .pipe(gulp.dest(target + '/fonts'));
      };
      let fontsDone = done => {
        browserSync.reload();
        resolve();
        done();
      };
      gulp.series(gulp.parallel(fontsCopy, fontsWoff, fontsWoff2), fontsDone)();            
    });
  });
};
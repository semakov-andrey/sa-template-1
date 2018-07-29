'use strict';

const imagemin        = require('gulp-imagemin');
const pngquant        = require('imagemin-pngquant');
const rename          = require('gulp-rename');

module.exports = params => {
  let { gulp, production, source, target, dirs, gulpif, browserSync } = params;
  let input1 = [
    source + '/' + dirs.images[0] + '/**/*.svg',
    '!' + source + '/' + dirs.sprite[0] + '/*.svg'
  ];
  let input2 = source + '/' + dirs.images[0] + '/**/*.{jpg,jpeg,gif,png}';
  let output = target + '/' + dirs.images[1];
  gulp.task('images', () => {
    return new Promise((resolve, reject) => {
      let imagesCopy = () => {
        return gulp.src(input1).pipe(rename(path => path.dirname = '/'))
          .pipe(gulp.dest(output));
      }; 
      let imagesMin = () => {
        return gulp.src(input2)
          .pipe(gulpif(production, imagemin({
            progressive: true,
            use: [pngquant()]
          })))
          .pipe(rename(path => path.dirname = '/'))
          .pipe(gulp.dest(output));
      };
      let imagesDone = done => {
        browserSync.reload();
        resolve();
        done();
      };
      gulp.series(gulp.parallel(imagesCopy, imagesMin), imagesDone)();
    });
    
  });
}
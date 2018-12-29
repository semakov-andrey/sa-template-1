'use strict';

const imagemin                  = require('gulp-imagemin');
const pngquant                  = require('imagemin-pngquant');
const rename                    = require('gulp-rename');

module.exports = params => {
  const { gulp, production, source, target, dirs, gulpif, browserSync } = params;
  const input1 = [
    `${source}/${dirs.images[0]}/**/*.svg`,
    `!${source}/${dirs.sprite[0]}/*.svg`
  ];
  const input2 = `${source}/${dirs.images[0]}/**/*.{jpg,gif,png,webp,mp4}`;
  const output = `${target}/${dirs.images[1]}`;
  gulp.task('images', () => new Promise((resolve, reject) => {
    const imagesCopy = () => gulp.src(input1).pipe(rename(path => path.dirname = '/'))
      .pipe(gulp.dest(output));
    const imagesMin = () => gulp.src(input2)
      .pipe(gulpif(production, imagemin({
        progressive: true,
        use: [pngquant()]
      })))
      .pipe(rename(path => path.dirname = '/'))
      .pipe(gulp.dest(output));
    const imagesDone = done => {
      browserSync.reload();
      resolve();
      done();
    };
    gulp.series(gulp.parallel(imagesCopy, imagesMin), imagesDone)();
  }));
};
'use strict';

const pug             = require('gulp-pug');
const emitty          = require('emitty').setup('src', 'pug', { makeVinylFile: true });

module.exports = params => {
  let { gulp, source, target, dirs, plumber, notify, gulpif, browserSync } = params;
  let input = `${source}/${dirs.html[0]}/*.pug`;
  let output = `${target}/${dirs.html[1]}`;
  gulp.task('html', () => new Promise((resolve, reject) => {
    let change = global.changedFile ? true : false;
    emitty.scan(global.changedFile).then(() => {
      gulp.src(input, { read: !change })
      .pipe(gulpif(change, emitty.filter(global.changedFile)))
      .pipe(plumber({
        errorHandler: notify.onError({
          sound: false,
          title: 'html',
          message: error => error.message
        })
      }))
      .pipe(pug({
        pretty: true
      }))
      .pipe(gulp.dest(output))
      .on('end', () => {
        browserSync.reload();
        resolve();
      })
      .on('error', reject);
    });
  }));
};
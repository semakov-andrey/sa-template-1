const pug                       = require('gulp-pug');
const emitty                    = require('emitty').setup('src', 'pug', { makeVinylFile: true });
const htmlmin                   = require('gulp-htmlmin');

module.exports = params => {
  const { gulp, isProd, source, target, dirs, plumber, notify, gulpif, browserSync } = params;
  const input = `${source}/${dirs.html[0]}/*.pug`;
  const output = `${target}/${dirs.html[1]}`;
  gulp.task('html', () => new Promise((resolve, reject) => {
    const change = !!global.changedFile;
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
        .pipe(gulpif(isProd, htmlmin({
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: false,
          quoteCharacter: '"',
          minifyCSS: true,
          minifyJS: true,
          removeAttributeQuotes: true,
          removeOptionalTags: true
        })))
        .pipe(gulp.dest(output))
        .on('end', () => {
          browserSync.reload();
          resolve();
        })
        .on('error', reject);
    });
  }));
};
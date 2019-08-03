const imagemin                  = require('gulp-imagemin');
const rename                    = require('gulp-rename');

module.exports = params => {
  const { gulp, isProd, source, target, dirs, gulpif, browserSync } = params;
  const input = [
    `${source}/${dirs.images[0]}/**/*.{jpg,gif,png,webp,svg,mp4}`,
    `!${source}/${dirs.sprite[0]}/*.svg`
  ];
  const output = `${target}/${dirs.images[1]}`;
  gulp.task('images', () => gulp.src(input)
    .pipe(rename(path => {
      path.dirname = '/';
    }))
    .pipe(gulpif(isProd, imagemin([
      imagemin.jpegtran({
        progressive: true,
        quality: 80
      }),
      imagemin.gifsicle({
        interlaced: false
      }),
      imagemin.optipng({
        optimizationLevel: 4
      }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { convertColors: { shorthex: true } },
          { removeEmptyAttrs: false }
        ]
      })
    ])))
    .pipe(gulp.dest(output))
    .on('end', () => browserSync.reload()));
};
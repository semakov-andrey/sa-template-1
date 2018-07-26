'use strict';

const svgSprite       = require('gulp-svg-sprites');

module.exports = params => {
  let { gulp, source, target, browserSync } = params;
  gulp.task('sprite', () => {
    return gulp.src(source + '/_images/_svg/*.svg')
      .pipe(svgSprite({
        mode: 'symbols',
        svg: { symbols: 'sprite.svg' },
        preview: false,
        asyncTransforms: true,
        transformData: (data, config, done) => {
          data.svg = data.svg.map(function(item) {
            let preserveAspectRatio = /preserveAspectRatio=\"(.*?)\"/.exec(item.data);
            item.preserveAspectRatio = preserveAspectRatio ? preserveAspectRatio[1] : 'xMidYMid'; 
            return item;          
          });
          done(data);
        },
        templates: { symbols: require('fs').readFileSync('./tasks/templates/symbols.svg', 'utf-8') }
      }))
      .pipe(gulp.dest(target + '/images/'))
      .on('end', browserSync.reload);
  });
};
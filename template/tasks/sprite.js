'use strict';

var svgSprite       = require('gulp-svg-sprites');

module.exports = params => {
  var { gulp, source, target, browserSync } = params;
  gulp.task('svgSprite', () => {
    return gulp.src(source + '/_images/_svg/*.svg')
      .pipe(svgSprite({
        mode: 'symbols',
        svg: { symbols: 'sprite.svg' },
        preview: false,
        asyncTransforms: true,
        transformData: function (data, config, done) {
          data.svg = data.svg.map(function(item) {
            var preserveAspectRatio = /preserveAspectRatio=\"(.*?)\"/.exec(item.data);
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
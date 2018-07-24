'use strict';

var svgSprite       = require('gulp-svg-sprites'),
  pngSprite         = require('gulp.spritesmith');

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

  gulp.task('pngSprite', () => {
    let spriteData = gulp.src(source + '/_images/_png/*.png')
      .pipe(pngSprite({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
      }));
    spriteData.img.pipe(gulp.dest(target + '/images/'));
    return spriteData.css.pipe(gulp.dest(source + '/_styles/'));      
  });
};
'use strict';

const svgSprite       = require('gulp-svg-sprites');
const svgo            = require('gulp-svgo');

module.exports = params => {
  let { gulp, production, source, target, browserSync } = params;
  let template = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0" style="position: absolute;">
<% _.forEach(svg, function(svgItem) { %>
  <symbol id="<%= svgItem.name %>" viewBox="<%= svgItem.viewBox %>"<%= (svgItem.preserveAspectRatio ? ' preserveAspectRatio="' + svgItem.preserveAspectRatio + '"' : '') %>>
    <%= svgItem.data.replace(/<svg.*?>(.*?)<\\/svg>/, "$1") %>
  </symbol>
<% }); %>
</svg>`;
  gulp.task('sprite', () => {
    return gulp.src(source + '/_images/_svg/*.svg')
    .pipe(svgo())
    .pipe(svgSprite({
      mode: 'symbols',
      svg: { symbols: 'sprite.svg' },
      preview: false,
      asyncTransforms: true,
      transformData: (data, config, done) => {
        data.svg = data.svg.map(item => {
          let preserveAspectRatio = /preserveAspectRatio=\"(.*?)\"/.exec(item.data);
          if(preserveAspectRatio) item.preserveAspectRatio = preserveAspectRatio[1]; 
          return item;          
        });
        done(data);
      },
      templates: {
        symbols: production ? template.replace(/[\r\n]/g, '').replace(/[\s]+\s\</g, '<') : template
      }
    }))
    .pipe(gulp.dest(target + '/images/'))
    .on('end', browserSync.reload);
  });
};
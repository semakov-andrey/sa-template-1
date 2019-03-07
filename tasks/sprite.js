'use strict';

const svgSprite                 = require('gulp-svg-sprites');
const svgo                      = require('gulp-svgo');

module.exports = params => {
  const { gulp, production, source, target, dirs, browserSync } = params;
  const template = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0" style="position: absolute;">
<% _.forEach(svg, function(svgItem) { %>
  <symbol id="<%= svgItem.name %>" viewBox="<%= svgItem.viewBox %>"<%= (svgItem.preserveAspectRatio ? ' preserveAspectRatio="' + svgItem.preserveAspectRatio + '"' : '') %>>
    <%= svgItem.data.replace(/<svg.*?>(.*?)<\\/svg>/, "$1") %>
  </symbol>
<% }); %>
</svg>`;
  const input = `${source}/${dirs.sprite[0]}/*.svg`;
  const output = `${target}/${dirs.sprite[1]}`;
  gulp.task('sprite', () => gulp.src(input)
    .pipe(svgo({
      plugins: [
        { removeViewBox: false },
        { convertColors: { shorthex: true } },
        { removeEmptyAttrs: false }
      ]
    }))
    .pipe(svgSprite({
      mode: 'symbols',
      svg: {
        symbols: 'sprite.svg'
      },
      preview: false,
      asyncTransforms: true,
      transformData: (data, config, done) => {
        data.svg = data.svg.map(item => {
          const preserveAspectRatio = /preserveAspectRatio="(.*?)"/.exec(item.data);
          if (preserveAspectRatio) item.preserveAspectRatio = preserveAspectRatio[1];
          return item;
        });
        done(data);
      },
      templates: {
        symbols: production ? template.replace(/[\r\n]/g, '').replace(/[\s]+\s</g, '<') : template
      }
    }))
    .pipe(gulp.dest(output))
    .on('end', () => browserSync.reload()));
};
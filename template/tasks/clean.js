'use strict';

var del             = require('del');

module.exports = params => {
  var { gulp, target } = params;
  gulp.task('clean', () => {
    return del(target + '/**/*');
  });
};
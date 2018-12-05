'use strict';

const del             = require('del');

module.exports = params => {
  let { gulp, target } = params;
  gulp.task('clean', () => del(`${target}/**/*`));
};
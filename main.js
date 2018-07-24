'use strict';

//const fs      = require('fs');
//const path    = require('path');
const ncp     = require('ncp').ncp;

//fs.createReadStream(path.resolve(__dirname, 'template/gulpfile.js')).pipe(fs.createWriteStream(path.resolve(__dirname, '../../gulpfile.js')));

ncp(path.resolve(__dirname, 'template/tasks'), path.resolve(__dirname, '../../template/tasks'));
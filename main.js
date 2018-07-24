'use strict';

const project         = '../../';
const fs              = require('fs');
const path            = require('path');
const ncp             = require('ncp').ncp;
let template          = require(path.resolve(__dirname, 'template.json'));
let packageJSON       = require(path.resolve(__dirname, project, 'package.json'));

packageJSON.devDependencies   = Object.assign(template.devDependencies, packageJSON.devDependencies);
packageJSON.scripts = template.scripts;
fs.writeFile('package.json', JSON.stringify(packageJSON, null, 2), 'utf8', error => {
  if(error) return console.error('Error: ' + error);
  console.log('Success: configuration updated');
});

ncp(path.resolve(__dirname, 'template'), path.resolve(__dirname, project), error => {
  if(error) return console.error('Error: ' + error);
  console.log('Success: template updated');
});
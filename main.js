'use strict';

const project         = '../../';
const fs              = require('fs');
const path            = require('path');
const ncp             = require('ncp').ncp;
let template          = require(path.resolve(__dirname, 'template.json'));
let packageJSON       = require(path.resolve(__dirname, project, 'package.json'));

//if(!packageJSON.config) packageJSON.config = {};
//if(!packageJSON.scripts) packageJSON.scripts = {};

//packageJSON.config            = Object.assign(template.config, packageJSON.config);
//packageJSON.scripts           = Object.assign(template.scripts, packageJSON.scripts);
//packageJSON.devDependencies   = Object.assign(template.devDependencies, packageJSON.devDependencies);

let json = {
  ...packageJSON,
  devDependencies: {
    ...packageJSON.devDependencies,
    ...template.devDependencies
  },
  config: {
    ...packageJSON.config,
    ...template.config,
    directories: {
      ...packageJSON.config.directories,
      ...template.config.directories,
    },    
  }
}

fs.writeFile('package.json', JSON.stringify(json, null, 2), 'utf8', error => {
  if(error) return console.error('Error: ' + error);
  console.log('Success: configuration updated');
});

ncp(path.resolve(__dirname, 'template'), path.resolve(__dirname, project), error => {
  if(error) return console.error('Error: ' + error);
  console.log('Success: template updated');
});
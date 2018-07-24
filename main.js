'use strict';

const project         = '../../';
const fs              = require('fs');
const path            = require('path');
const minimist        = require('minimist');
const ncp             = require('ncp');
let templateJSON      = require(path.resolve(__dirname, 'template', 'package.json'));
let packageJSON       = require(path.resolve(__dirname, project, 'package.json'));

let json = {
  ...packageJSON,
  scripts: templateJSON.scripts,
  config: {
    ...packageJSON.config,
    ...templateJSON.config,
    directories: {
      ...(packageJSON.config && packageJSON.config.directories ? packageJSON.config.directories : {}),
      ...templateJSON.config.directories
    }   
  }
};

fs.writeFile(path.resolve(__dirname, project, 'package.json'), JSON.stringify(json, null, 2), 'utf8', error => {
  if(error) return console.error('Error: ' + error);
  console.log('Success: configuration updated');
});

ncp.ncp(path.resolve(__dirname, 'template', 'gulpfile.js'), path.resolve(__dirname, project, 'gulpfile.js'), error => {
  if(error) return console.error('Error: ' + error);
  console.log('Success: task-runner updated');
});

ncp.ncp(path.resolve(__dirname, 'template', 'tasks'), path.resolve(__dirname, project, 'tasks'), error => {
  if(error) return console.error('Error: ' + error);
  console.log('Success: tasks updated');  
});

let getGitIgnore = (data = []) => {
  if(!data.length) data = [];
  if(fs.existsSync(path.resolve(__dirname, 'template', 'gitignore'))) {
    fs.readFile(path.resolve(__dirname, 'template', 'gitignore'), 'utf8', (error, newData) => {
      if(error) return console.error('Error: ' + error);
      writeGitIgnore(data, newData.split('\r\n'));
    });
  } else writeGitIgnore(data);
};

let writeGitIgnore = (data, newData = []) => {
  if(!newData.length) newData = [];
  let gitignore = [...new Set([...data, ...newData])].join('\r\n');
  fs.writeFile(path.resolve(__dirname, project, '.gitignore'), gitignore, 'utf8', error => {
    if(error) return console.error('Error: ' + error);
    console.log('Success: gitignore updated');
  });
};

if(fs.existsSync(path.resolve(__dirname, project, '.gitignore'))) {
  fs.readFile(path.resolve(__dirname, project, '.gitignore'), 'utf8', (error, data) => {
    if(error) return console.error('Error: ' + error);
    getGitIgnore(data.split('\r\n'));
  });
} else getGitIgnore();

if(!fs.existsSync(path.resolve(__dirname, project, 'readme.md'))) {
  ncp.ncp(path.resolve(__dirname, 'template', 'readme.md'), path.resolve(__dirname, project, 'readme.md'), error => {
    if(error) return console.error('Error: ' + error);
    console.log('Success: readme updated');  
  });
}
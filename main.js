'use strict';

const project         = '../../';
const fs              = require('fs');
const path            = require('path');
const ncp             = require('ncp').ncp;
let template          = require(path.resolve(__dirname, 'template', 'template.json'));
let packageJSON       = require(path.resolve(__dirname, project, 'package.json'));

let json = {
  ...packageJSON,
  scripts: {
    ...packageJSON.scripts,
    ...template.scripts
  },
  devDependencies: {
    ...packageJSON.devDependencies,
    ...template.devDependencies
  },
  config: {
    ...packageJSON.config,
    ...template.config,
    directories: {
      ...packageJSON.config.directories,
      ...template.config.directories
    }   
  }
};

fs.writeFile(path.resolve(__dirname, project, 'package.json'), JSON.stringify(json, null, 2), 'utf8', error => {
  if(error) return console.error('Error: ' + error);
  console.log('Success: configuration updated');
});

ncp(path.resolve(__dirname, 'template', 'gulpfile.js'), path.resolve(__dirname, project), error => {
  if(error) return console.error('Error: ' + error);
  console.log('Success: task-runner updated');
});

ncp(path.resolve(__dirname, 'template', 'tasks'), path.resolve(__dirname, project, 'tasks'), error => {
  if(error) return console.error('Error: ' + error);
  console.log('Success: tasks updated');  
});

let writeGitIgnore = (data = []) => {
  let gitignore = [...new Set([...data, ...template.ignore])].join('\r\n');
  fs.writeFile(path.resolve(__dirname, project, '.gitignore'), gitignore, 'utf8', error => {
    if(error) return console.error('Error: ' + error);
    console.log('Success: gitignore updated');
  });
}

if(fs.existsSync(path.resolve(__dirname, project, '.gitignore'))) {
  fs.readFile(path.resolve(__dirname, project, '.gitignore'), 'utf8', (error, data) => {
    if(error) return console.error('Error: ' + error);
    writeGitIgnore(data.split('\r\n'));
  });
} else writeGitIgnore();
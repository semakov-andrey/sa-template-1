'use strict';

const project         = '../../';
const fs              = require('fs');
const path            = require('path');
const minimist        = require('minimist');
const ncp             = require('ncp');
const del             = require('del');
let args              = minimist(process.argv.slice(2));
let update            = typeof(args.update) !== 'undefined';
let templateJSON      = require(path.resolve(__dirname, 'template', 'package.json'));
let packageJSON       = require(path.resolve(__dirname, project, 'package.json'));
let tasks             = typeof(args.tasks) !== 'undefined' ? args.tasks.split('|') : false;
let rTasks            = ['browser', 'clean', 'watch'];

let json = {
  ...packageJSON,
  scripts: templateJSON.scripts,
  devDependencies: {
    ...packageJSON.devDependencies,
    ...templateJSON.devDependencies,
  },
  config: {
    ...packageJSON.config,
    ...templateJSON.config,
    directories: {
      ...(packageJSON.config && packageJSON.config.directories ? packageJSON.config.directories : {}),
      ...templateJSON.config.directories
    },
    tasks: tasks ? tasks : templateJSON.config.tasks
  }
};

fs.writeFile(path.resolve(__dirname, project, 'package.json'), JSON.stringify(json, null, 2), 'utf8', error => {
  if(error) return console.error('Error: ' + error);
  console.log('Success: configuration updated');
});

if(!fs.existsSync(path.resolve(__dirname, project, 'gulpfile.js'))) {
  ncp.ncp(path.resolve(__dirname, 'template', 'gulpfile.js'), path.resolve(__dirname, project, 'gulpfile.js'), error => {
    if(error) return console.error('Error: ' + error);
    console.log('Success: task-runner updated');
  });
}

del(path.resolve(__dirname, project, 'tasks'));

if(!tasks) {
  ncp.ncp(path.resolve(__dirname, 'template', 'tasks'), path.resolve(__dirname, project, 'tasks'), error => {
    if(error) return console.error('Error: ' + error);
    console.log('Success: tasks updated');  
  });
} else {
  [...new Set([...rTasks, ...tasks])].forEach(task => {
    if(fs.existsSync(path.resolve(__dirname, 'template', 'tasks', task + '.js'))) {
      ncp.ncp(path.resolve(__dirname, 'template', 'tasks', task + '.js'), path.resolve(__dirname, project, 'tasks', task + '.js'), error => {
        if(error) return console.error('Error: ' + error);
        console.log('Success: task ' + task + ' added');  
      });
    });
  });
}

if(!update) {
  ncp.ncp(path.resolve(__dirname, 'template', 'src'), path.resolve(__dirname, project, 'src'), error => {
    if(error) return console.error('Error: ' + error);
    console.log('Success: source updated');  
  });
}

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
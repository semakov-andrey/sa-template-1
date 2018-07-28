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
let generatorJSON     = require(path.resolve(__dirname, 'package.json'));
let tasksIndex        = update ? 3 : 2;
let tasks             = process.argv[tasksIndex] && typeof(process.argv[tasksIndex]) === 'string' ? process.argv[tasksIndex].split('-') : '';
let tasksDefault      = ['browser', 'clean', 'watch'];

/* update readme */
if(!fs.existsSync(path.resolve(__dirname, project, 'readme.md'))) {
  ncp.ncp(path.resolve(__dirname, 'template', 'readme.md'), path.resolve(__dirname, project, 'readme.md'), error => {
    if(error) return console.error('Error: ' + error);
    console.log('Success: readme updated');  
  });
}

/* update task-runner */
if(!fs.existsSync(path.resolve(__dirname, project, 'gulpfile.js'))) {
  ncp.ncp(path.resolve(__dirname, 'template', 'gulpfile.js'), path.resolve(__dirname, project, 'gulpfile.js'), error => {
    if(error) return console.error('Error: ' + error);
    console.log('Success: task-runner updated');
  });
}

/* update tasks */
del(path.resolve(__dirname, project, 'tasks')).then(paths => {
  if(!tasks) {
    ncp.ncp(path.resolve(__dirname, 'template', 'tasks'), path.resolve(__dirname, project, 'tasks'), error => {
      if(error) return console.error('Error: ' + error);
      console.log('Success: tasks updated'); 
      writeConfiguraion(templateJSON.config.tasks); 
    });
  } else {
    let all = [...new Set([...tasksDefault, ...tasks])],
      updated = [];
    all.forEach((task, index) => {
      if(fs.existsSync(path.resolve(__dirname, 'template', 'tasks', task + '.js'))) { 
        if(tasks.indexOf(task) !== -1) updated.push(task);
      } else all.splice(index, 1);
    });
    writeConfiguraion(updated);
    fs.mkdirSync(path.resolve(__dirname, project, 'tasks'));
    all.forEach((task, index) => {
      ncp.ncp(path.resolve(__dirname, 'template', 'tasks', task + '.js'), path.resolve(__dirname, project, 'tasks', task + '.js'), error => {
        if(error) return console.error('Error: ' + error);
        if(tasks.indexOf(task) !== -1) console.log('Success: task ' + task + ' added');
      });
    });
  }
});

/* update configuration */
let writeConfiguraion = (tasks) => {
  let specify = {};
  if(tasks.indexOf('css') != -1) specify.browsers = templateJSON.config.browsers;
  if(tasks.indexOf('svg2png') != -1) specify.svg2png = templateJSON.config.svg2png;
  ['ncp'].forEach(value => delete generatorJSON.dependencies[value]);
  let json = {
    ...packageJSON,
    scripts: templateJSON.scripts,
    devDependencies: {
      ...packageJSON.devDependencies,
      ...generatorJSON.dependencies,
    },
    config: {
      ...packageJSON.config,
      ...specify,
      directories: {
        ...(packageJSON.config && packageJSON.config.directories ? packageJSON.config.directories : {}),
        ...templateJSON.config.directories
      },
      tasks: tasks
    }
  };
  
  fs.writeFile(path.resolve(__dirname, project, 'package.json'), JSON.stringify(json, null, 2), 'utf8', error => {
    if(error) return console.error('Error: ' + error);
    console.log('Success: configuration updated');
  });
}

/* update source */
if(!update) {
  ncp.ncp(path.resolve(__dirname, 'template', 'src'), path.resolve(__dirname, project, 'src'), error => {
    if(error) return console.error('Error: ' + error);
    console.log('Success: source updated');  
  });
}

/* update gitignore */
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
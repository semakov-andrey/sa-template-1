'use strict';

const project         = '../../';
const fs              = require('fs');
const path            = require('path');
const ncp             = require('ncp');

if(path.basename(path.resolve(__dirname, '../')) !== 'node_modules') return;

let templateJSON      = require('./package.json');
let packageJSON       = require(`${project}package.json`);

/* update readme */
if(!fs.existsSync(path.resolve(__dirname, project, 'readme.md'))) {
  ncp.ncp(path.resolve(__dirname, 'readme.md'), path.resolve(__dirname, project, 'readme.md'), error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: readme updated'));
}

/* update task-runner */
ncp.ncp(path.resolve(__dirname, 'gulpfile.js'), path.resolve(__dirname, project, 'gulpfile.js'), error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: task-runner updated'));

/* update tasks */
ncp.ncp(path.resolve(__dirname, 'tasks'), path.resolve(__dirname, project, 'tasks'), error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: tasks updated'));

/* update configuration */
delete templateJSON.dependencies['ncp'];
let json = {
  ...packageJSON,
  scripts: {
    start: 'gulp serve',
    build: 'gulp build --production',
    template: 'node node_modules/sa-template-1/install.js',
    module: 'node node_modules/sa-template-1/module.js'
  },
  devDependencies: {
    ...packageJSON.devDependencies,
    ...templateJSON.dependencies,
  },
  config: {
    entries: templateJSON.config.entries,
    browsers: templateJSON.config.browsers,
    ...packageJSON.config,
    directories: {
      ...templateJSON.config.directories,
      ...(packageJSON.config && packageJSON.config.directories ? packageJSON.config.directories : {}),
      tasks: {
        ...templateJSON.config.directories.tasks,
        ...(packageJSON.config && packageJSON.config.directories && packageJSON.config.directories.tasks ? packageJSON.config.directories.tasks : {}),
      }
    },
    tasks: [...new Set([...(packageJSON.config && packageJSON.config.tasks ? packageJSON.config.tasks : []), ...templateJSON.config.tasks])]
  }
};
fs.writeFile(path.resolve(__dirname, project, 'package.json'), JSON.stringify(json, null, 2), 'utf8', error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: configuration updated'));

/* update source */
if(!fs.existsSync(path.resolve(__dirname, project, 'src'))) {
  ncp.ncp(path.resolve(__dirname, 'src'), path.resolve(__dirname, project, 'src'), error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: source updated'));
}

/* update gitignore */
let gitignore = ['node_modules', '.vscode', '*.log', 'build', 'tmp', 'Thumbs.db', '.idea', '.grunt', '.DS_Store', 'bash.exe.stackdump', '.editorconfig', '.yo-rc.json'];
let writeGitIgnore = (data, newData = []) => {
  fs.writeFile(path.resolve(__dirname, project, '.gitignore'), [...new Set([...data, ...newData])].join('\r\n'), 'utf8', error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: gitignore updated'));
};
if(fs.existsSync(path.resolve(__dirname, project, '.gitignore'))) {
  fs.readFile(path.resolve(__dirname, project, '.gitignore'), 'utf8', (error, data) => {
    if(error) return console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error);
    writeGitIgnore(data.split('\r\n'), gitignore);
  });
} else writeGitIgnore(gitignore);
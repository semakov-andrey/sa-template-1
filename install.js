'use strict';

const project                   = '../../';
const fs                        = require('fs');
const path                      = require('path');
const ncp                       = require('ncp');

if (path.basename(path.resolve(__dirname, '../')) !== 'node_modules') return;

const templateJSON              = require('./package.json');
const packageJSON               = require(`${project}package.json`);
const DEV                       = packageJSON && packageJSON.name === 'sa-source';

/* update readme */
if (!fs.existsSync(path.resolve(__dirname, project, 'readme.md'))) {
  ncp.ncp(path.resolve(__dirname, 'readme.md'), path.resolve(__dirname, project, 'readme.md'), error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: readme updated'));
}

/* update task-runner */
ncp.ncp(path.resolve(__dirname, 'gulpfile.js'), path.resolve(__dirname, project, 'gulpfile.js'), error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: task-runner updated'));

/* update stylelint */
ncp.ncp(path.resolve(__dirname, '.stylelintrc'), path.resolve(__dirname, project, '.stylelintrc'), error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: stylelint updated'));

/* update tasks */
ncp.ncp(path.resolve(__dirname, 'tasks'), path.resolve(__dirname, project, 'tasks'), error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: tasks updated'));

/* update package.json */
delete templateJSON.dependencies['ncp'];
const scripts = { 
  start: 'gulp serve',
  build: 'gulp build --production',
  module: 'node node_modules/sa-template-1/module.js',
  'lint-css': 'stylelint src/**/*.scss -f verbose --fix'
};
const json = {
  ...packageJSON,
  scripts: {
    ...packageJSON.scripts,
    ...scripts
  },
  devDependencies: {
    ...packageJSON.devDependencies,
    ...(!DEV ? templateJSON.dependencies : {})
  },
  config: {
    devServer: templateJSON.config.devServer,
    entries: templateJSON.config.entries,
    browsers: templateJSON.config.browsers,
    ...packageJSON.config,
    directories: {
      ...templateJSON.config.directories,
      ...(packageJSON.config && packageJSON.config.directories ? packageJSON.config.directories : {}),
      tasks: {
        ...templateJSON.config.directories.tasks,
        ...(packageJSON.config && packageJSON.config.directories && packageJSON.config.directories.tasks ? packageJSON.config.directories.tasks : {})
      }
    },
    tasks: [...new Set([...(packageJSON.config && packageJSON.config.tasks ? packageJSON.config.tasks : []), ...templateJSON.config.tasks])]
  }
};
fs.writeFile(path.resolve(__dirname, project, 'package.json'), JSON.stringify(json, null, 2), 'utf8', error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: package.json updated'));

/* update gitignore */
const gitignore = ['node_modules', 'build', 'tmp', '.vscode', '*.log', 'Thumbs.db', '.idea', '.grunt', '.DS_Store', 'bash.exe.stackdump', '.editorconfig', '.yo-rc.json'];
const writeGitIgnore = (data, newData = []) => {
  fs.writeFile(path.resolve(__dirname, project, '.gitignore'), [...new Set([...data, ...newData])].join('\r\n'), 'utf8', error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: gitignore updated'));
};
if (fs.existsSync(path.resolve(__dirname, project, '.gitignore'))) {
  fs.readFile(path.resolve(__dirname, project, '.gitignore'), 'utf8', (error, data) => {
    if(error) return console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error);
    writeGitIgnore(data.split('\r\n'), gitignore);
  });
} else writeGitIgnore(gitignore);
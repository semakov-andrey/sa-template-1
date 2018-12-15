# Front-End template. #
###### Шаблон для вёрстки сайта на nodeJS 11 и gulp 4. ######

### Установка ###
- `npm init --yes`  
- `npm install -g gulp-cli`
- `npm install sa-template-1 --save-dev`

### Особенности установки/обновления ###
- Копируются, если не существуют: readme.md, папка src
- Все таски и gulpfile.js заменяются
- .gitignore дополняется необходимыми записями
- package.json:
  - Дополняется зависимостями
  - Дополняется директориями
  - Обновляются подключенные таски 
  - Дополняется настройками тасков

### Основные команды ###
`npm run start` - development - разработка  
`npm run build` - production - сборка   
`npm run module название` - создание модуля с .pug, .scss и .js файлами    
`npm update sa-template-1` - обновление шаблона   
`npm install sa-template-1@version` - обновление шаблона 

### Список тасков ###
- `html` - компиляция pug в html
- `css` - компиляция sass в css
- `js` - сборка bundle js
- `fonts` - копирование шрифтов
- `compress` - сжатие изображений jpg, png
- `sprite` - генерация svg спрайта

### Используемые технологии ###
- [nodejs](https://nodejs.org/)
- [gulp](https://gulpjs.com/)
- [pug](https://pugjs.org/) + [gulp-pug](https://github.com/gulp-community/gulp-pug)
- [sass](https://sass-lang.com/) + [node-sass](https://github.com/sass/node-sass) + [gulp-sass](https://github.com/dlmanning/gulp-sass)
- [postcss](https://github.com/postcss/postcss) + [gulp-postcss](https://github.com/postcss/gulp-postcss) + [autoprefixer](https://autoprefixer.github.io/ru/)
- [browserify](http://browserify.org/) + [babel](https://babeljs.io/) + [babelify](https://github.com/babel/babelify)
- [gulp-svg-sprites](https://github.com/shakyshane/gulp-svg-sprites)
- [imagemin](https://github.com/imagemin/imagemin) + [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) + [imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant)
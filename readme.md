# Front-End template generator. #
###### Генератор шаблона для вёрстки сайта. ######

### Установка ###
`npm init --yes`  
`npm install sa-template-1 --save-dev`  
`node node_modules/sa-template-1/main.js`  

### Обновление ###
`npm run template`  

### Подключение конкретных тасков ###
`node node_modules/sa-template-1/main.js html-css-js`  
`npm run template html-css-js`  

### Список тасков ###
* `html` - компиляция pug в html
* `css` - компиляция sass в css
* `js` - сборка bundle js
* `fonts` - преобразование ttf в woff, woff2
* `compress` - сжатие изображений jpg, png
* `sprite` - генерация svg спрайта
* `svg2png` - конвертация svg в png

### Используемые технологии ###
* [nodejs](https://nodejs.org/)
* [gulp](https://gulpjs.com/)
* [pug](https://pugjs.org/) + [gulp-pug](https://github.com/gulp-community/gulp-pug)
* [sass](https://sass-lang.com/) + [node-sass](https://github.com/sass/node-sass) + [gulp-sass](https://github.com/dlmanning/gulp-sass)
* [postcss](https://github.com/postcss/postcss) + [gulp-postcss](https://github.com/postcss/gulp-postcss) + [autoprefixer](https://autoprefixer.github.io/ru/)
* [browserify](http://browserify.org/) + [babel](https://babeljs.io/) + [babelify](https://github.com/babel/babelify)
* [gulp-svg-sprites](https://github.com/shakyshane/gulp-svg-sprites)
* [ttf2woff](https://github.com/fontello/ttf2woff) + [gulp-ttf2woff](https://github.com/nfroidure/gulp-ttf2woff)
* [ttf2woff2](https://github.com/nfroidure/ttf2woff2) + [gulp-ttf2woff2](https://github.com/nfroidure/gulp-ttf2woff2)
* [imagemin](https://github.com/imagemin/imagemin) + [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) + [imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant)
* [svg2ng](https://github.com/domenic/svg2png) + [gulp-svg2png](https://github.com/akoenig/gulp-svg2png)

### Будущие доработки генератора ###
* вынести все директории в конфиг
* source - сделать тестовый сайт
* создать генератор модулей
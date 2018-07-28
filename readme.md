# Front-End template updater. #
###### Шаблон сборки для верстки сайта на nodeJS 10 и gulp 4. ######

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
* `fonts` - копирование шрифтов woff, woff2
* `compress` - сжатие изображений jpg, png
* `sprite` - генерация svg спрайта
* `svg2png` - конвертация svg в png

# Нужно сделать:
4. вынести все директории в конфиг
5. брать зависимости из общего package.json, убрать оттуда пакеты генератора
6. написать используемые технологии в этом readme и в шаблоне
7. source - сделать тестовый сайт
8. создать генератор модулей
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
1. svg2png - конфиг только при подключении таска
2. sprite - шаблон нужно запихать в js и переработать таск
3. пересмотреть все остальные таски на актуальность
4. брать зависимости из общего package.json, убрать оттуда пакеты генератора
5. написать используемые технологии в этом readme и в шаблоне
6. source - сделать тестовый сайт
7. создать генератор модулей
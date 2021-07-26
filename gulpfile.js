//Whatch - слежение за файлами
//Dest - функция при которой файлы с одной папки перебрасываються в другую папку
//Parallel - одновременный запуск большого количества функций
//Series - функция которая запускает последовательную операцию(похожа на Parallel)

const {src, dest, watch, parallel, series} = require('gulp');

//Плагин для конвертации файлов scss в css
const scss = require('gulp-sass');

//Плагин для обьединения большого количества файлов в один файл
const concat = require('gulp-concat');

//Плагин для атоматического обновления страницы
const browserSync = require('browser-sync').create();

//Плагин для минификации файлов js
const uglify = require('gulp-uglify-es').default;

//Плагин для лучшей совместимости с другими браузерами
const autoprefixer = require('gulp-autoprefixer');

//Плагин для сжатия и минифицирования картинок
const imagemin = require('gulp-imagemin');

//Плагин для удаления ненужной папки или папки в которой много мусора
const del = require('del');

// const postcss = require('postcss-sort-media-queries');
const { css } = require('jquery');

//  function postcss([
//     sortMediaQueries({
//       sort: 'desktop-first'
//     })
//   ]) {
//     process(css);
//   }

//Функция для удаления папки Dist
function cleanDist() {
  return del('dist')
}

//Функция для автообновления страницы
function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
}

//Функция для сжатия картинок
function images() {
  return src('app/images/**/*')
  .pipe(imagemin([
    //Сжатие изображений Gif
    imagemin.gifsicle({interlaced: true}),
    //Сжатие изображений Jpeg
    imagemin.mozjpeg({quality: 75, progressive: true}),
    //Сжатие изображений Png
    imagemin.optipng({optimizationLevel: 5}),
    //Сжатие изображений Svg
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
]))
//Перенос изображений сразу в папку dist в папку images
  .pipe(dest('dist/images'))
}

//Функция для стилей css и scss
function styles() {
  return src('app/scss/style.scss')
  //Минифицирует файлы css
  .pipe(scss({outputStyle: 'compressed'}))
  //Создаёт файл css и переносит все данные из файла scss
  .pipe(concat('style.min.css'))
  //Поддержка для всех браузеров
  .pipe(autoprefixer({
    overrideBrowserlist: ['last 10 version']
  }))
  // .pipe(postcss('app/css/style.min.css'), css)
  //Перенос сразу в папку app в папку css
  .pipe(dest('app/css'))
  //Автообновление страницы
  .pipe(browserSync.stream())
}

//Функция для сбора всех файлов в папке app и перенос в папку Dist
function build() {
  return src([
    'app/css/style.min.css',
    'app/fonts/**/*',
    'app/js/main.min.js',
    'app/*.html'
  ], {base: 'app'})
  //Перенос в папку Dist
  .pipe(dest('dist'))
}

//Функция для слежения за файлами
function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload)
}

//Функция для минифицирования файлов js
function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'app/js/main.js'
  ])
  //Создаёт единый файл js который забирает все данные с других файлов js
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  //Перенос в папку js
  .pipe(dest('app/js'))
  //Автообновление страницы
  .pipe(browserSync.stream())
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);
exports.default = parallel(scripts, browsersync, watching);
const { src, dest, watch, parallel, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create()




function browsersync() {
    browserSync.init({
      server : {
        baseDir: 'src/'
      }
    });
  }
  

function styles () {
    return src('src/scss/style.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream())
}

function build() {
    return src([
      'src/css/style.min.css',
      'src/js/script.js',
      'src/*.html'
    ], {base: 'src'})
      .pipe(dest('dist'))
  }

function watching () {
    watch(['src/scss/**/*.scss'], styles)
    watch(['src/*.html']).on('change', browserSync.reload)
}

exports.styles = styles
exports.watching = watching
exports.browsersync = browsersync

exports.build = build
exports.default = parallel(browsersync, watching)
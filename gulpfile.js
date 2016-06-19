/*jslint node: true */
'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

var jsFiles = 'src/js/**/*.js',
    jsDest = 'dist/js/',
    scssFiles = 'src/scss/*.scss',
    cssDest = 'dist/css/';

gulp.task('default', function () {
    return console.log('\n\nUse "gulp scripts" or "gulp css" to minify scripts or css\n\n');
});

gulp.task('css', function () {
    return gulp.src(scssFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(cssDest))
        .pipe(rename(function (path) {
            path.extname = '.min' + path.extname;
            return path;
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(cssDest));
});

gulp.task('css:watch', function () {
    gulp.watch('./src/scss/**/*.scss', ['css']);
});

gulp.task('scripts', function () {
    return gulp.src(jsFiles)
        .pipe(gulp.dest(jsDest))
        .pipe(concat('script.main.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('script.main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('scripts:watch', function () {
    gulp.watch('./src/js/**/*.js', ['scripts']);
});

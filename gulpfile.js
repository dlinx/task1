var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
// var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
    images: './img/*',
    scripts: [

        // Libraries
        "./node_modules/jquery/dist/jquery.min.js",
        "./node_modules/angular/angular.min.js",
        "./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
        "./node_modules/angular-ui-router/release/angular-ui-router.min.js",

        // Application files
        "./app/app.js",

        
        //Services
        "./app/services/weatherReport.service.js",
        "./app/services/location.factory.js",

        // Controllers
        "./app/errorMessage/errorMessage.controller.js",
        "./app/weatherReport/weatherReport.controller.js",
        "./app/getLocation/getLocation.controller.js",
        "./app/home/home.controller.js",

        "./app/config.js",
    ],
    style: [
        "./node_modules/bootstrap/dist/css/bootstrap.min.css",

        //Custom stylesheets
        "./style/style.css"
    ],

    fonts: [
        "./node_modules/bootstrap/dist/fonts/*",
        "./node_modules/font-awesome-4.5.0/fonts/*"
    ],
    views: [
        "./app/**/*.html"
    ],
    index: "./index.html"

};
var dest = {
    images: "build/img/",
    scripts: "build/script/",
    style: "build/style/",
    fonts: "build/fonts/",
    views: "build/views/",
    index: "build/"
}


gulp.task('clean', function () {
    return del(['build']);
});

gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
        // .pipe(sourcemaps.init())
        // .pipe(uglify())
        .pipe(concat('all.min.js'))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest.scripts));
});

gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest(dest.images));
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(dest.fonts));
});

gulp.task('views', function () {
    return gulp.src(paths.views)
        .pipe(gulp.dest(dest.views));
});

gulp.task('index', function () {
    return gulp.src(paths.index)
        .pipe(gulp.dest(dest.index));
});

gulp.task('css', function () {
    return gulp.src(paths.style)
        .pipe(minify())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest(dest.style));
})
// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.fonts, ['fonts']);
    gulp.watch(paths.views, ['views']);
    gulp.watch(paths.index, ['index']);
    gulp.watch(paths.style, ['css']);
});

gulp.task('default', ['watch', 'scripts', 'images', 'fonts', 'views', 'index', 'css']);
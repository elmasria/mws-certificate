var gulp = require('gulp'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    swPrecache = require('sw-precache');


gulp.task('default', ['scripts', 'css', 'copy-templates', 'copy-manifest', 'watch', 'server']);

gulp.task('scripts', function() {
    gulp.src([
            './src/js/app.js'
        ])
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./dist/js'));


    gulp.src([
            './src/js/service-worker.js'
        ])
        .pipe(gulp.dest('./dist/'));

});

gulp.task('css', function() {
    gulp.src([
            './src/css/app.css'
        ])
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('./dist/css'));

});

gulp.task('copy-templates', function() {
    gulp.src([
            './src/index.html'
        ])
        .pipe(gulp.dest('./dist/'));
});


gulp.task('copy-manifest', function() {
    gulp.src([
            './src/manifest.json'
        ])
        .pipe(gulp.dest('./dist/'));
});


gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        },
        port: 8080,
    });

});

gulp.task('watch', function() {

    gulp.watch(['./src/js/service-worker.js'], ['scripts']);

    gulp.watch(['./src/index.html'], ['copy-templates']);

    gulp.watch(['./src/css/app.css'], ['css']);
});


gulp.task('generate-sw', function() {
    var swOptions = {
        staticFileGlobs: [
            './dist/index.html',
            './dist/images/*.{png,svg,gif,jpg}',
            './dist/js/*.js',
            './dist/css/*.css'
        ],
        stripPrefix: './dist',
        runtimeCaching: [{
            urlPattern: /^https:\/\/publicdata-weather\.firebaseio\.com/,
            handler: 'networkFirst',
            options: {
                cache: {
                    name: 'weatherData-v3'
                }
            }
        }]
    };
    return swPrecache.write('./dist/service-worker-auto.js', swOptions);
});

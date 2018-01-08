var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var notify = require('gulp-notify');

var image = require('gulp-image');
var sourcemaps = require('gulp-sourcemaps');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

var fs = require('fs');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');  
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var fileinclude = require('gulp-file-include');
var gutil = require('gulp-util');

var glob = require("glob");

var _port = 8080;

// remove all contents under the dist directory.
gulp.task('clean', function() {
    return gulp.src(`./dist/*`, { read: false })
        .pipe(clean());
});

// optimize the image and deploy the dist/img directory.
gulp.task('build-image', function () {
    return gulp.src('./dev/images/*')
                .pipe(image())
                .pipe(gulp.dest('./dist/img'))
                .pipe(notify('image has optimized.'));
});

// minify css code and deploy the output to dist/css directory.
gulp.task('build-style', function () {
    return gulp.src('./dev/**/*.css')
        .pipe(plumber())
        .pipe(cleanCss({
            debug: true
        }, function(detail) {
            let ds = detail.stats;
            let _msg = `minifing [${detail.name}]: before -> ${ds.originalSize} KB, after -> ${ds.minifiedSize} KB, reduced ${parseInt(ds.efficiency * 100)}%`;
            console.log(_msg);
        }))
        .pipe(rename({ dirname: './dist/css' }))
        .pipe(gulp.dest('./'))
        .pipe(notify('built-style is complete.'));
});

// trigger a build task which performs following:
// 1. build in es2015 spec
// 2. use browserify to unify javascript code into a single js file.
// 3. minify the javascript code.
gulp.task('build-script', function(callback) {

    glob('./dev/script/*.js', function(err, files) {
        if (err) callback(err);

        files.map(function (_entry) {
            return browserify({entries: [_entry]})
                .transform(babelify, { presets: ['es2015'] })
                .bundle()
                .pipe(plumber())
                .pipe(source(_entry))
                .pipe(buffer())
                .pipe(sourcemaps.init({ loadMaps: true }))
                .pipe(uglify())
                // .on('error', gutil.log)
                .pipe(rename({ dirname: './' }))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('./dist/js'));
        });
    });

    callback.apply(null);

});

// run a html-build task and deploy the built output to dist directory.
gulp.task('build-html', function (callback) {
    
    return gulp.src('./dev/view/*.html')
                .pipe(fileinclude({
                    prefix: '@@',
                    basepath: '@file'
                }))
                .pipe(gulp.dest('./dist'))
                .on('finish', function () {
                    console.log('build-html is complete.');
                });
});

// Build and deploy the assets in sequence.
gulp.task('build', gulp.series('build-image', 
                               'build-style',
                               'build-script',
                               'build-html',
                                function(callback) {
                                    callback();
                                }));

// trigger a build-and-deploy monitoring task in case of changes from dev directory.
gulp.task('watch', function() {
    gulp.watch(['./dev/*', './dev/**/*', './dev/**/**/*'], ['build']);
});

// initialize a server within monitoring the dist folder
// also build and deploy the assets in case of any changes of dev directory.
gulp.task('start:dev', gulp.series('watch', function () {
    gulp.watch([
        'dist/**/*',
        'dist/*'
    ], browserSync.reload);

    browserSync.init({
        server: {
            baseDir: 'dist',
            index: "index.html"
        },
        port: _port,
        cors: true
    });
}));

gulp.task('default', gulp.series('clean', 'build', 'start:dev', function(done) {
    done();
}));


// only start a server without any additional operation.
gulp.task('start', function () {
    browserSync.init({
        server: {
            baseDir: 'dist',
            index: "index.html"
        },
        port: _port,
        cors: true
    });
});



// remove the .map files generated during running build-script.
gulp.task('clean-script-map', function() {
    return gulp.src(`./dist/js/*.map`, { read: false })
        .pipe(clean());
});

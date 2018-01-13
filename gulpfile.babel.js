import gulp from 'gulp';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import clean from 'gulp-clean';
import notify from 'gulp-notify';

import image from 'gulp-image';
import sourcemaps from 'gulp-sourcemaps';
import cleanCss from 'gulp-clean-css';
import rename from 'gulp-rename';

import fs from 'fs';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';  
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import fileinclude from 'gulp-file-include';
import gutil from 'gulp-util';

import glob from "glob";

var _port = 8080;
var _browserSync = browserSync.create();

// remove all contents under the dist directory.
gulp.task('clean', () => {
    return gulp.src(`./dist/*`, { read: false })
        .pipe(clean());
});

// optimize the image and deploy the dist/img directory.
gulp.task('build-image',  () => {
    return gulp.src('./dev/images/*')
                .pipe(image())
                .pipe(gulp.dest('./dist/img'))
                .pipe(notify('image has optimized.'));
});

// minify css code and deploy the output to dist/css directory.
gulp.task('build-style',  () => {
    return gulp.src('./dev/**/*.css')
        .pipe(plumber())
        .pipe(cleanCss({
            debug: true
        }, (detail) => {
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
gulp.task('build-script', (callback) => {

    glob('./dev/script/*.js', (err, files) => {
        if (err) callback(err);

        files.map( (_entry) => {
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
gulp.task('build-html',  (callback) => {
    
    return gulp.src('./dev/view/*.html')
                .pipe(fileinclude({
                    prefix: '@@',
                    basepath: '@file'
                }))
                .pipe(gulp.dest('./dist'))
                .on('finish',  () => console.log('build-html is complete.'));
});

// Build and deploy the assets in sequence.
gulp.task('build', gulp.series('build-image', 
                               'build-style',
                               'build-script',
                               'build-html',
                                callback => callback()));

// trigger a build-and-deploy monitoring task in case of changes from dev directory.
gulp.task('watch', () => {
    gulp.watch(['./dev/**/*', './dev/**/**/*'], gulp.series('build', callback => callback()));
});

// initialize a server within monitoring the dist folder
// also build and deploy the assets in case of any changes of dev directory.
gulp.task('start:dev',  () => {

    gulp.watch(['./dev/**/*', './dev/**/**/*'], gulp.series('build', callback => callback()));
    gulp.watch(['dist/**/*', 'dist/*'], _browserSync.reload);

    _browserSync.init({
        server: {
            baseDir: 'dist',
            index: "index.html"
        },
        port: _port,
        cors: true
    });
});

gulp.task('default', gulp.series('clean', 'build', 'start:dev', done => done()));


// only start a server without any additional operation.
gulp.task('start',  () => {
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
gulp.task('clean-script-map', () => {
    return gulp.src(`./dist/js/*.map`, { read: false }).pipe(clean());
});

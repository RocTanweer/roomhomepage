const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-dart-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');


// Compiling SCSS 
const scssTask = () => {
    return src('./app/scss/style.scss', { sourcemaps : true })
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest('./dest/css', {sourcemaps:"."}))
}

// watch task
const watchTask = () => {
    watch('*.html', browserSyncReload);
    watch('app/scss/**/*.scss', series(scssTask, browserSyncReload));
    watch('app/js/**/*.js', browserSyncReload);
}



// browserSync task
const browserSyncServe = (callback) => {
    browserSync.init({
        server: {
            baseDir: "."
        }
    });
    callback();
}

// reload browserSync
const browserSyncReload = (callback) => {
    browserSync.reload();
    callback();
};





// defaultTask
exports.default = series(
    scssTask,
    browserSyncServe,
    watchTask,
)

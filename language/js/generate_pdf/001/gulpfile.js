const gulp = require('gulp')
const browserSync = require('browser-sync')
const reload = browserSync.reload

gulp.task('default', function () {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
    gulp.watch(['*.html', '**/*.*'], {
        cwd: 'app'
    }, reload)
})
const
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    gzip = require('gulp-gzip');

gulp.task('default', function() {
    return gulp.src('swipeable-menu.js')
        .pipe(uglify())
        .pipe(gzip())
        .pipe(gulp.dest('dist'));
});
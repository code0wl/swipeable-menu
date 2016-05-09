const
    gulp = require('gulp'),
    uglify = require('gulp-uglify');


gulp.task('default', function() {
    return gulp.src('swipeable-menu.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
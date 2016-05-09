const
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-uglify');


gulp.task('default', function() {
    return gulp.src('swipeable-menu.js')
        .pipe(uglify())
        .pipe(concat('swipeable-menu.js'))
        .pipe(gulp.dest('dist/swipeable-menu.min.js'));
});
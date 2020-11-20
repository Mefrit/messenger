var gulp = require('gulp');
var ts = require('gulp-typescript');

const tsProject = ts.createProject('./tsconfig.json');
gulp.task('script', function() {

    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest("dist"));
});
gulp.task('watch', function() {
    gulp.watch('src/ts/*.ts', gulp.series('script'));
    gulp.watch('src/ts/*.tsx', gulp.series('script'));
});
var gulp = require('gulp');
var ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');
gulp.task('script', function () {

    return gulp.src(["src/ts/**/*.ts",
        "src/ts/**/*.tsx", '!**/node_modules/**'])
        .pipe(tsProject())
        .js.pipe(gulp.dest("public/js"));
});
gulp.task('watch', function () {
    gulp.watch('src/ts/*.ts', gulp.series('script'));
    gulp.watch('src/ts/*.tsx', gulp.series('script'));
});
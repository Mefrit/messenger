var gulp = require("gulp");
var ts = require("gulp-typescript");
var less = require("gulp-less");
var path = require("path");

const tsProject = ts.createProject("./tsconfig.json");
gulp.task("script", function () {
    return gulp
        .src(["src/ts/**/*.ts", "src/ts/**/*.tsx", "!**/node_modules/**"])
        .pipe(tsProject())
        .js.pipe(gulp.dest("public/js"));
});

gulp.task("less", function () {
    return gulp
        .src("src/less/**/*.less")
        .pipe(
            less({
                paths: [path.join(__dirname, "less", "includes")],
            })
        )
        .pipe(gulp.dest("./public/css"));
});

gulp.task("watch", function () {
    gulp.watch("src/ts/**/*.ts", gulp.series("script"));
    gulp.watch("src/ts/**/*.tsx", gulp.series("script"));
    gulp.watch("src/less/**/*.less", gulp.series("less"));
});

gulp.task("default", gulp.series("watch"));

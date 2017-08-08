const themePath = require("./tasks/variables/var")["themePath"];

const $ = require("gulp-load-plugins")();
const gulp = require("gulp");


function requireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function (callback) {
        let task = require(path).call(this, options);
        return task(callback);
    });
}

requireTask("prepareSass", "./tasks/buildPrepare", {
    src: [themePath + "inc/sass/_*.sass", themePath + "inc/sass/*.sass", "!" + themePath + "inc/sass/header.sass"],
    ext: "sass"
});

requireTask("prepareScss", "./tasks/buildPrepare", {
    src: [themePath + "inc/sass/_*.scss", themePath + "inc/sass/*.scss", "!" + themePath + "inc/sass/header.scss"],
    ext: "scss"
});

requireTask("styles", "./tasks/styles", {
    src: [themePath + "inc/sass/build/*.scss", themePath + "inc/sass/build/*.sass"],
    target: "main.css"
});

requireTask("prepareHeader", "./tasks/styles", {
    src: [themePath + "inc/sass/header.sass"],
    target: "header.css"
});

requireTask("fonts", "./tasks/fonts", {
    src: themePath + "inc/icons/*.svg"
});

requireTask("sprites", "./tasks/sprites", {
    src: themePath + 'inc/img/sprites/*.*'
});

gulp.task("buildPreparing", gulp.parallel("prepareHeader", "prepareSass", "prepareScss"));

gulp.task("build", gulp.parallel(gulp.series("fonts", "buildPreparing", "styles"), "sprites"));

gulp.task("watch", function() {
    gulp.watch(themePath + "inc/sass/*.*", gulp.series("buildPreparing", "styles"))
        .on("unlink", function () {
            $.remember.forget("styles");
        });

    gulp.watch(themePath + "inc/icons/**", gulp.series("fonts", "buildPreparing", "styles"))
        .on("unlink", function () {
            $.remember.forget("fonts");
        });

    gulp.watch(themePath + "inc/img/sprites/**", gulp.series("sprites"))
        .on("unlink", function () {
            $.remember.forget("sprites");
        });
});

requireTask("server", "./tasks/server", {
    watch: themePath + "**"
});

//режим разработки
gulp.task("development",
    gulp.series("build",
        gulp.parallel("watch","server")));

gulp.task("default",
    gulp.series("development"));
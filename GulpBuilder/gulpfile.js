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
    src: [themePath + "inc/sass/_build.sass"],
    ext: "sass"
});

requireTask("prepareScss", "./tasks/buildPrepare", {
    src: [themePath + "inc/sass/_build.scss"],
    ext: "scss"
});

requireTask("styles", "./tasks/styles", {
    src: [themePath + "inc/sass/build/*.scss", themePath + "inc/sass/build/*.sass"],
    target: "main.css"
});

requireTask("scripts", "./tasks/scripts", {
    src: [themePath + "inc/js/*.js"]
});

requireTask("cleanScripts", "./tasks/clean", {
    src: [themePath + "inc/js/min/*.js", "!" + themePath + "inc/js/min/*-min.js"],
    name: "cleanScripts"
});

requireTask("prepareHeader", "./tasks/styles", {
    src: [themePath + "inc/sass/header.sass", themePath + "inc/sass/header.scss"],
    target: "header.css"
});

requireTask("fonts", "./tasks/fonts", {
    src: themePath + "inc/icons/*.svg"
});

requireTask("sprites", "./tasks/sprites", {
    src: themePath + 'inc/img/sprites/*.*'
});

gulp.task("buildPreparing", gulp.series("prepareHeader", gulp.parallel("prepareSass", "prepareScss")));

gulp.task("scriptsMin", gulp.series("scripts", "cleanScripts"));

gulp.task("build", gulp.series("fonts", "buildPreparing", "styles", "sprites", "scriptsMin"));

gulp.task("watch", function() {
    gulp.watch([themePath + "inc/sass/*.*", themePath + "inc/sass/sass/*.*"], gulp.series("fonts", "buildPreparing", "styles"))
    .on("unlink", function () {
        delete $.cached.caches['styles'];
        $.remember.forget("styles");
    })
    .on("change", function (data) {
        delete $.cached.caches['styles'];
        $.remember.forget("styles");
    });

    gulp.watch(themePath + "inc/icons/**", gulp.series("fonts", "buildPreparing", "styles"))
    .on("unlink", function () {
        delete $.cached.caches['fonts'];
        $.remember.forget("fonts");
    })
    .on("change", function (data) {
        delete $.cached.caches['fonts'];
        $.remember.forget("styles");
    });

    gulp.watch(themePath + "inc/img/sprites/**", gulp.series("sprites"))
    .on("unlink", function () {
        delete $.cached.caches['sprites'];
        $.remember.forget("sprites");
    })
    .on("change", function (data) {
        delete $.cached.caches['sprites'];
        $.remember.forget("sprites");
    });

    gulp.watch(themePath + "inc/js/*.js", gulp.series("scriptsMin"))
    .on("unlink", function () {
        delete $.cached.caches['scripts'];
        $.remember.forget("scripts");
    })
    .on("change", function (data) {
        delete $.cached.caches['scripts'];
        $.remember.forget("scripts");
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
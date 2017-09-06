const themePath = require("./variables/var")["themePath"];
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

module.exports = function (options) {
    return function () {
    	gulp.src(themePath + "inc/sass/build/*.*", {read: false}).pipe($.clean({force: true}));
        return gulp.src(options.src)
            .pipe($.concat("styles." + options.ext))
            .pipe(gulp.dest(themePath + "inc/sass/build/"));
    }
}
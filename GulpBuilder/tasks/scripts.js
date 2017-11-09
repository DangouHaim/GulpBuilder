const themePath = require("./variables/var")["themePath"];
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;

module.exports = function (options) {
    return function () {
        return combine(
            gulp.src(options.src),
            $.cached("scripts"),
            $.remember("scripts"),
            $.minify(),
            gulp.dest(themePath + "inc/js/min/")
            ).on("error", $.notify.onError(function (err) {
                return {
                    title: "Scripts",
                    message: err.message
                };
            }));
        }
    }
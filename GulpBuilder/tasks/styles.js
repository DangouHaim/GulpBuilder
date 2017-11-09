const themePath = require("./variables/var")["themePath"];
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;


const isDebug = require("./variables/var")["isDebug"];

module.exports = function (options) {
    return function () {
        return combine(
            gulp.src(options.src),
            $.cached("styles"),
            $.remember("styles"),
            $.if(isDebug, $.sourcemaps.init()),
            $.sass().on('error', $.sass.logError),
            $.concat(options.target),
            $.autoprefixer({ browsers: ['last 2 versions'], cascade: false }),
            $.cssnano(),
            $.if(isDebug, $.sourcemaps.write(), $.cssnano()),
            gulp.dest(themePath + "inc/css/")
        ).on("error", $.notify.onError(function (err) {
            return {
                title: "Styles",
                message: err.message
            };
        }));
    }
}
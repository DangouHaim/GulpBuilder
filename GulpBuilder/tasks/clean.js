const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;

module.exports = function (options) {
    return function () {
        return combine(
            gulp.src(options.src, {read: false}),
            $.clean({force: true})
            ).on("error", $.notify.onError(function (err) {
                return {
                    title: options.name,
                    message: err.message
                };
            }));
        }
    }
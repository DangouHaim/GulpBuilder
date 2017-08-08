const themePath = require("./variables/var")["themePath"];
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

module.exports = function (options) {
    return function () {
        var res = gulp.src([options.src])
            .pipe($.cached("fonts"))
            .pipe($.remember("fonts"))
            .pipe($.iconfontCss({
                fontName: 'icons',
                path: themePath +'inc/icons/_icons-tp.scss',
                targetPath: '../../sass/_icons.scss',
                fontPath: themePath + 'inc/fonts/icons/'
            }))
            .pipe($.iconfont({
                fontName: 'icons',
                fontWeight: "normal",
                fontStyle: "normal"
            }))
            .pipe(gulp.dest(themePath +'inc/fonts/icons/'));
        return res;
    }
}
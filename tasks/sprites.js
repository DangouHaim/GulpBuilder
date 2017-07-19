const themePath = "./coffee/";
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

module.exports = function (options) {
    return function () {
        var spriteData = 
        gulp.src(options.src)
            .pipe($.cached("sprites"))
            .pipe($.remember("sprites"))
            .pipe($.spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css',
                imgPath: "/wp-content/themes/coffee/inc/img/sprite.png"
            }));
        spriteData.img.pipe(gulp.dest(themePath + 'inc/img/'));
        spriteData.css.pipe(gulp.dest(themePath + 'inc/css/'));
        return spriteData;
    }
}
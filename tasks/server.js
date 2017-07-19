const themePath = "./coffee/";
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const bsync = require("browser-sync");

module.exports = function (options) {
    return function () {
        bsync.init({
            open: 'external',
            host: 'coffee.askerweb.ru',
            proxy:'coffee.askerweb.ru:8000',
            port: 80
        });
        bsync.watch(options.watch).on("change", bsync.reload);
    }
}
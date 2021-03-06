(function($){
    var themePath = "/wp-content/themes/site/";
    window.askAPI = {
        debug: false,
        devel: false,
        historyLoaded: {
            scripts: [],
            css: []
        },
        scripts: {
            main: themePath + "inc/js/main.js"
        },
        css: {
            main: themePath + 'inc/css/main.css',
            header: themePath + 'inc/css/header.css',
            sprite: themePath + 'inc/css/sprite.css'
        },
        /**
         * Динамическая загрузка скрипта
         * @param src
         * @param callback
         */
        loadScript: function (src, callback) {
            if (askAPI.historyLoaded.scripts.indexOf(src) >= 0) {
                if (callback && typeof(callback) === "function") {
                    callback();
                }
                return false;
            }
            if (this.debug) {
                console.log('load Script ' + src + ' (' + askAPI.scripts[src] + ')');
            }
            var d = document, s = d.createElement('script'), g = 'getElementsByTagName';
            s.type = 'text/javascript';
            s.charset = 'UTF-8';
            s.async = false;
            askAPI.historyLoaded.scripts.push(src);
            s.src = askAPI.scripts[src];
            if (callback && typeof(callback) === "function") {
                s.onload = callback;
            }
            var h = d[g]('body')[0];
            h.appendChild(s);
        },
        /**
         * Динамическая загрузка стилей
         * @param src
         * @param async
         * @param callback
         */
        loadStyle: function (src, async, callback) {
            if(this.devel){
                async = false;
            }
            if (askAPI.historyLoaded.css.indexOf(src) >= 0) {
                if (callback && typeof(callback) === "function") {
                    callback();
                }
                return false;
            }
            if (this.debug) {
                var debugAsync = "";
                if (async) {
                    var debugAsync = "Async "
                }
                console.log(debugAsync + 'load Style ' + src + ' (' + askAPI.css[src] + ')');
            }

            askAPI.historyLoaded.css.push(src);
            if (async) {
                $(document).load(askAPI.css[src], function (response, status, xhr) {
                    var lazyStyle = document.createElement('style');
                    lazyStyle.innerHTML = xhr.responseText;
                    document.head.appendChild(lazyStyle);
                    if (callback && typeof(callback) === "function") {
                        callback();
                    }
                });
            } else {
                var d = document, s = d.createElement('link'), g = 'getElementsByTagName';
                s.rel = 'stylesheet';
                s.href = askAPI.css[src];
                var h = d[g]('body')[0];
                h.appendChild(s);
            }
        },
        initPage: function (devel) {
            if(devel){
                this.debug = true;
                this.devel = true;
            }
            if (this.debug) {
                console.log('init Page ');
            }

            askAPI.loadStyle("header", true); //styles from inc/css/header.css - hardcoded in header.php
         	askAPI.loadStyle("sprite", true);
            askAPI.loadStyle("main", true);

            askAPI.loadScript("main", function(){});
        },

    };

    $(document).ready(function () {
        var devel = false;
        if($('.enable-develop').length > 0){
            devel = true;
        }
        askAPI.initPage(devel);

    });




})(jQuery)
var rootDirectory = "../olam/";
var host = "joberli.ru";
var port = 8000;
var res = {
	isDebug: false,
	themePath: ["./" + rootDirectory],
	fullPath: ["/wp-content/themes/" + rootDirectory],
	siteName: [host],
	sitePort: [port],
	siteProxy: [host + ":80"]
};

module.exports = res;
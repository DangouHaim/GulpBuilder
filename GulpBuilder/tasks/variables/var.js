var rootDirectory = "../site/";
var host = "site.com";
var res = {
	themePath: ["./" + rootDirectory],
	fullPath: ["/wp-content/themes/" + rootDirectory],
	siteName: [host],
	siteProxy: [host + ":8000"]
};

module.exports = res;
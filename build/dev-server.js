var webpack = require("webpack");
var express = require('express');
var webpackMiddleware = require('webpack-dev-middleware');
var WebpackHotMiddleware = require('webpack-hot-middleware');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.dev.conf.js");
var config = require("../config/index");

var app = express();
var compiler = webpack(webpackConfig);
// var server = new WebpackDevServer(compiler, {
//     stats: {
//         colors: true,

//     },
//     lazy: false,
//     watchOptions: {
// 		aggregateTimeout: 300,
// 		poll: true
// 	}
// });
app.use('/static', express.static(config.dev.assetsSubDirectory));
app.use(webpackMiddleware(compiler, {
	// publicPath is required, whereas all other options are optional

	noInfo: false,
	// display no info to console (only warnings and errors)

	quiet: false,
	// display nothing to the console

	lazy: false,
	// switch into lazy mode
	// that means no watching, but recompilation on every request

	watchOptions: {
		aggregateTimeout: 300,
		poll: true
	},
	// watch options (only lazy: false)

	publicPath: config.dev.assetsPublicPath,
	// public path to bind the middleware to
	// use the same as in webpack
	
	index: "index.html",
	// the index path for web server

	headers: { "X-Custom-Header": "yes" },
	// custom headers

	stats: {
		colors: true
	},
	// options for formating the statistics

	reporter: null,
	// Provide a custom reporter to change the way how logs are shown.

	serverSideRender: false,
	// Turn off the server-side rendering mode. See Server-Side Rendering part for more info.
}));

app.use(WebpackHotMiddleware(compiler, {
  log: console.log
}));

app.listen(config.dev.port, function() {
    console.log("Starting server on http://localhost:"+ config.dev.port);
});

process.env.NODE_ENV = 'production';

var Webpack = require("webpack");
var config = require("../config/index");
var webpackConfig = require('./webpack.prod.conf');


Webpack(webpackConfig,function(err,stats){
	stats.toString({ chunks: false, color: true });
});
var fs = require("fs"),
	path = require('path'),
	proxy = require('http-proxy').createProxyServer({}),

	config = require('./config'),

	pointHTML = fs.readFileSync(path.resolve(__dirname, './tpl/point.html'), {encoding: 'utf8'}),
	notFoundHTML = fs.readFileSync(path.resolve(__dirname, './tpl/404.html'), {encoding: 'utf8'});


exports.buildCgiMainJS = function (filename, type) {
	var mainJSPath = path.resolve(__dirname, './tpl/main_' + (type ? type : 'simple') + '.js');

	var data = fs.readFileSync(mainJSPath, {encoding: 'utf8'});

	fs.writeFile(filename, data, function (err) {
		if (err) {
			console.log('build ' + filename + ' error: ' + err);
		}
		console.log('build ' + filename);
	});
};

exports.buildCgiData = function (filename) {
	var data = {
		code: 123,
		message: '本地没有数据，请先执行数据录制'
	};

	fs.writeFile(filename, JSON.stringify(data, null, 4), function (err) {
		if (err) {
			console.log('build ' + filename + ' error: ' + err);
		};
		console.log('build ' + filename);
	});

	return data;
};

exports.buildMockjs = function (filename) {
	var data = {
		code: 123,
		message: 'mockjs 为空，请先填入模拟数据'
	};

	fs.writeFileSync(filename, JSON.stringify(data, null, 4));
	return data;
};

//透传
exports.routeToServer = function (req, res) {
	var target = exports.generateURI();

	console.log(target);

	proxy.web(req, res, {
		target: target
	});
};

exports.isJSONP = function (req) {
	return req.hostname === 'jsonp.ke.qq.com';
};

exports.buildDir = function (filename) {
	var fileDir = path.dirname(filename),
		arr = fileDir.split(/\/|\\/),
		baseDir = arr.shift();

	// baseDir || (baseDir = '/');

	if(baseDir) {
		baseDir += '\\';
	} else {
		baseDir = '/'
	}

	for(var i = 0, len = arr.length; i <= len; i++) {
	    if(fs.existsSync(baseDir)) {

	    	if(arr[i]) {
	    		baseDir = path.resolve(baseDir, arr[i]);
	    	}
	        continue;
	    } else {
	        fs.mkdirSync(baseDir);

	        if(arr[i]) {
	    		baseDir = path.resolve(baseDir, arr[i]);
	    	}
	    }
	}
};

//处理html inline
exports.renderHTML = function (content) {
    var data = '',
        selfFn = arguments.callee;

    var configStr = JSON.stringify(config);

    var newPointHTML = pointHTML.replace('{__master_config}', "'" + configStr + "'");


    data = content.replace(/(<body[^>]*>)/, '$1\n</script>')
        		.replace(/(<\/body>)/, newPointHTML + '$1');

    return data;
};

exports.render404 = function (info) {
	var configStr = JSON.stringify(config);

	var newPointHTML = pointHTML.replace('{__master_config}', "'" + configStr + "'");

	return notFoundHTML.replace('{errorInfo}', info).replace(/(<\/body>)/, newPointHTML + '$1');
};

exports.generateURI = function(path) {
	var uri = '';
	//指定测试环境

	path || (path = '');

	for(var i = 0, len = config.hosts.length; i < len; i++) {
		var host = config.hosts[i];

		if(host['selected']) {
			if(host['ip'] === '') {
				//现网IP
				uri = 'https://console.lcfarm.com' + path;
			} else {
				uri = "http://" + host['ip'] + ':' + (host.proxyPort['console'] || 8003) + path;
			}
			break;
		}
	}

	return uri;
};


exports.jsonBody2Str = function (json) {
	var str = "";
	for(var p in json){
		var value = json[p];

		value = encodeURIComponent(value);

		str += "&" + p + "=" + value;
	}
	return str.substr(1);
};
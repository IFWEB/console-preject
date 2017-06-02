var request = require('request-ssl-nfd'),
	fs = require('fs'),

	config = require('../config'),
	hps = require('../helpers');

/*
 * 华丽丽的 https 解决方案
 */
/*request.addFingerprint('m.lcfarm.com', 'A9:5B:61:39:86:B4:83:19:B1:91:77:9F:B7:46:A4:93:A3:2F:DE:49');
request.addFingerprint('www.lcfarm.com', 'A9:5B:61:39:86:B4:83:19:B1:91:77:9F:B7:46:A4:93:A3:2F:DE:49');
*//*
 * 对 request 进行封装，重新给后台发一次请求，并拦截返回的数据
 *
 * @param req request
 * @param callback { fn } 回调，传入返回后拦截的数据
 */
function direct(req, callback){
	var url =req.url;

	//强制要求不要返回gzip的格式
	delete req.headers["accept-encoding"];

	var options = {
		uri: hps.generateURI(url),
		method: req.method,
		headers: req.headers,
		timeout: 5000,
		encoding: 'utf8'
	};

	/*if(global.selectedPro === 'h5' || global.selectedPro === 'activity') {
		options.headers.Host = 'm.lcfarm.com';
	} else if (global.selectedPro === 'pc') {
		options.headers.Host = 'www.lcfarm.com';
	}
*/

	options.headers.Host = 'conosle.lcfarm.com';

	//body是json格式 要转成&字符串格式
	options.body = hps.jsonBody2Str(req.body); 

	//发起request请求
	request(options, function(e, response, body){
		var status, data = body;
		if (e) {
			callback(e);
			return;
		} 

		status = response.statusCode;

		if (status >= 200 && status < 300 || status === 304 || status === 1223) {
			if(hps.isJSONP(req)) {
				//脱掉jsonp外衣
				data = body.replace(/jQuery.*?\(/, '').replace(/\);.*/, '');
			}

			try {
				data = JSON.parse(data);
			} catch (e) {
				// data = {message: '返回数据格式错误', body: data};
			}

			callback(null, data, response);
		} else {
			try {
				data = JSON.parse(body);
			} catch (e) {
				data = {message: '请求出错', status: status};
			}
			console.log(111)
			callback(data);
		}
	});
}


module.exports=direct;
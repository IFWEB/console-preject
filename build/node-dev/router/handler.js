var http = require('http'),
    path = require('path'),

    request = require('request-ssl-nfd'),

    hps = require('../helpers'),
    config = require('../config'),
    direct = require('./direct'),
    handleCgi = require('./cgi');


/*request.addFingerprint('m.lcfarm.com', 'A9:5B:61:39:86:B4:83:19:B1:91:77:9F:B7:46:A4:93:A3:2F:DE:49');
request.addFingerprint('www.lcfarm.com', 'A9:5B:61:39:86:B4:83:19:B1:91:77:9F:B7:46:A4:93:A3:2F:DE:49');
*/

module.exports = function(app) {
    app.get('/_master_', function(req, res) {
        var msg = req.query.config;

        try {
            msg = JSON.parse(msg);
        } catch (e) {
            msg = {};
            console.log('返回 config 格式不正确！');
        }

        for (var x in msg) {
            config[x] = msg[x];
        }

        res.end();

    });

    for (var i = 0, len = config.ignoreList.length; i < len; i++) {
        app.all(config.ignoreList[i], function(req, res) {
            hps.routeToServer(req, res);
        });
    }

    /*    app.get('/registerVerify.htm', function(req, res, next) {

            request(hps.generateURI(req.url)).pipe(res);
        });

        app.get('/user/loginVerify.htm', function(req, res, next) {

            request(hps.generateURI(req.url)).pipe(res);
        });*/

    app.get('/newconsole/consoleapi/validateCode/code', function(req, res, next) {

        request(hps.generateURI(req.url)).pipe(res);
    });

    app.all('/newconsole/consoleapi/*', handleCgi);

    app.get('/', function(req, res, next) {
        res.redirect('/index.html');
    });

    app.get('*.html', function(req, res, next) {

        var filePath, data = '';

        /*if(config.env === 'dev') {
            filePath = path.resolve(global.proDevPath, req.path.slice(1));
        } else {
            filePath = path.resolve(global.proDistPath, req.path.slice(1));
        }*/

        data = hps.renderHTML(res._originC);

        if (data) {
            res.send(data);
        } else {
            next();
        }
    });
};
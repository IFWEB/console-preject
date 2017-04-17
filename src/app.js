require('./assets/css/main.css');

var Vue = require('vue');
var VueRouter = require('vue-router').default;
var path = require('path');

Vue.use(VueRouter);
var listJson = require('./assets/json/app.json');
var map = require('./map.js');

function getComponent(_path, level) {
    var result = null,
        pathStr = _path.split('/').join('_') || '_';

    if (level > 1) {
        result = map(pathStr) || require('./pages/index/default/main.vue');
    } else {
        result = require('./pages/index/side_bar.vue');
    }

    return result;
}

function checkType(source, type) {
    return Object.prototype.toString.call(source) === '[object ' + type + ']' ? true : false;
}

function transRoute(source, rootPath, level) {
    var result = checkType(source, 'Array') ? [] : {},
        currPath = rootPath,
        _level = level || 0;

    if (source['path'] !== undefined) {
        if (source['path']) {
            currPath += source['path'] !== '/' ?
                '/' + source['path'] :
                '/';
        }

        source['component'] = getComponent(currPath, level);
    }

    // level表示当前嵌套的层级，1表示第一层
    ++_level;

    for (var key in source) {
        // component组件内容无需遍历直接赋值
        if (checkType(source[key], 'Object') && key !== 'component') {
            if (source[key]['path'] !== undefined) {
                if (checkType(source, 'Array')) {
                    result.push(transRoute(source[key], currPath, _level));
                } else {
                    result[key] = transRoute(source[key], currPath, _level);
                }
            }
        } else if (checkType(source[key], 'Array')) {
            result[key] = transRoute(source[key], currPath, _level);
        } else {
            result[key] = source[key];
        }
    }
    return result;
}

var indexMenu = transRoute(listJson, '');

var routes = [{
    "path": "/",
    "component": require("./pages/index/index"),
    "children": indexMenu
}, {
    path: '/login',
    component: require('./pages/login/login')
}];


var router = new VueRouter({
    routes: routes
});


var app = new Vue({
    data: {
        list: listJson
    },
    router
}).$mount('#app');
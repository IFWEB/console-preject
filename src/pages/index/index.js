import 'assets/fonts/css/font-awesome.min.css';
import 'assets/css/main.scss';
import 'vodal/common.css';
import 'vodal/rotate.css';

import Vue from 'vue';
import Vodal from 'vodal';

import Util from 'assets/libs/util.js';
import axios from 'axios';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import Ajax from 'assets/js/ajax.js';
import ButtonLimit from 'assets/js/button_limit.js';
import map from 'assets/js/map.js';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ButtonLimit);
Vue.component(Vodal.name, Vodal);

Vue.prototype.$http = axios;


axios.interceptors.request.use(function(config) { // 这里的config包含每次请求的内容
    let token = Util.dataToSessionStorageOperate.achieve('token');
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
}, function(err) {
    return Promise.reject(err);
});

function getComponent(opts) {
    var result = null,
        pathStr = opts.path.split('/').join('_') || '_';

    if (opts.level > 1) {
        if (opts.children && opts.children.length > 0) {
            // 有children还包含三级子目录
            result = require('./empty.vue');
        } else {
            result = map(pathStr) || require('./default/main.vue');
        }
    } else {
        result = require('./empty.vue');
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
        source['name'] = currPath;

        source['component'] = getComponent({
            path: currPath,
            level: level,
            children: source.children
        });
        if (_level === 1 && !(source['children'] && source['children'].length)) {
            source.children = [{
                "path": "",
                "label": source.label,
                "component": getComponent({
                    path: "",
                    level: 2,
                    children: source.children
                })
            }];
        }
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

function getAllMenu(callback) {
    new Ajax({
        url: '/newconsole/consoleapi/user/menus',
        dataType: 'json',
        method: 'POST',
        success: function(res) {
            callback && callback(null, res);
        },
        dataError: function(code, err) {
            if (code === 1003) {
                location.href = 'login.html#/login';
            }
            // var router = new VueRouter({
            //     routes: [{
            //         path: '/login',
            //         component: require('./pages/login/login')
            //     }, {
            //         path: '/',
            //         component: require('./pages/index/index')
            //     }]
            // });
            // var app = new Vue({
            //     el: "#app",
            //     data: {
            //         list: []
            //     },
            //     router
            // });
        },
        error: function(code, err, url) {
            alert(code + "\n" +
                url + "\n" +
                err);
        }
    });
}

function addAlias(list) {
    list[0].alias = '';
    if (list.children && list.children.length > 0) {
        addAlias(list.children);
    }
}

function init() {
    getAllMenu(function(err, res) {
        if (err) {
            return;
        }
        // 初始化路由数据
        var listJson = res.resources;

        //根据菜单json生成index路由对象
        var indexMenu = transRoute(listJson, '');
        addAlias(indexMenu);

        var routes = [{
            "path": "/",
            "component": require("./index.vue"),
            "children": indexMenu
        }];

        // 初始化路由
        var router = new VueRouter({
            // mode: 'history',
            routes: routes
        });

        // 初始化vue
        var app = new Vue({
            el: "#app",
            data: {
                list: listJson
            },
            router
        });
    })
}

init();
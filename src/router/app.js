var Vue = require('vue');
var VueRouter = require('vue-router').default;

// var Login = require('../pages/login/login');
// var Index = require('../pages/index/index');

Vue.use(VueRouter);


var routes = [{
    path: '/home',
    component: function(resolve) {
        require(['../pages/index/index'], resolve)
    },
    children: [{
        // 当 / 匹配成功，
        // Main 会被渲染在 Index 的 <router-view> 中
        path: '/home',
        component: require('../pages/index/main')
    }]
}, {
    path: '/login',
    component: function(resolve) {
        require(['../pages/login/login'], resolve)
    }
}];

var router = new VueRouter({
    routes: routes
});


var app = new Vue({
    router
}).$mount('#app');
require('./assets/css/main.css');

var Vue = require('vue');
var VueRouter = require('vue-router').default;

Vue.use(VueRouter);

var routes = [{
    path: '/home/:id',
    component: function(resolve) {
        require(['./pages/index/index'], resolve)
    },
    children: [{
        path: '',
        component: require('./pages/index/default/side_bar.vue'),
        children: [{
            path: '',
            component: require('./pages/index/default/main.vue')
        }]
    }, {
        path: 'user',
        component: require('./pages/index/default/main')
    }, {
        path: 'business',
        component: require('./pages/index/default/main')
    }, {
        path: 'advertise',
        component: require('./pages/index/default/main')
    }, {
        path: 'system',
        component: require('./pages/index/default/main')
    }, {
        path: 'finance',
        component: require('./pages/index/default/main')
    }, {
        path: 'statistics',
        component: require('./pages/index/default/main')
    }, {
        path: 'promote',
        component: require('./pages/index/default/main')
    }, {
        path: 'baseInfo',
        component: require('./pages/index/default/main')
    }]
}, {
    path: '/login',
    component: function(resolve) {
        require(['./pages/login/login'], resolve)
    }
}];

var router = new VueRouter({
    routes: routes
});


var app = new Vue({
    router
}).$mount('#app');
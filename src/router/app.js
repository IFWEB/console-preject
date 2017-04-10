var Vue = require('vue').default;
var VueRouter = require('vue-router').default;


var test = require('../pages/test');
var Login = require('../pages/login/login');
var Index = require('../pages/index/index');
var Main = require('../pages/index/main');

Vue.use(VueRouter);




var routes = [
{
        path: '/',
        component: Index,
        children: [
        {
            // 当 / 匹配成功，
            // Main 会被渲染在 Index 的 <router-view> 中
            path: '/',
            component: Main
        }
        // ,
        //  {
        //     // 当 /user/:id/profile 匹配成功，
        //     // UserProfile 会被渲染在 Index 的 <router-view> 中
        //     path: 'profile',
        //     component: UserProfile
        // }
        ]
    },
    { path: '/login', component: Login }
];

var router = new VueRouter({
    routes: routes 
});


var app = new Vue({
    router
}).$mount('#app');

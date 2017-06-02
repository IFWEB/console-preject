import 'assets/css/login.scss';

import Vue from 'vue';

var VueRouter = require('vue-router').default;
var Vuex = require('vuex');

Vue.use(VueRouter);
Vue.use(Vuex);

function init() {
    var router = new VueRouter({
        routes: [{
            path: '/',
            component: require('./login.vue')
        }]
    });
    var app = new Vue({
        el: "#app",
        router
    });
}

init();
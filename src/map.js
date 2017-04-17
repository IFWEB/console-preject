var map = {
    // 存放类似的模块引用,
    // default:function(){require('./pages/index/default/main.vue')},
    // user_1:function(){require('./pages/index/user/1.vue')},
    // user_2:function(){require('./pages/index/user/2.vue')},
};

// 注册每一个import函数，需要的时候再执行
map['_'] = function() {
    return import ('./pages/index/default/main.vue');
};

map['_user'] = function() {
    return import ('./pages/index/user/main.vue');
};

map['_user_1'] = function() {
    return import ('./pages/index/user/main1.vue');
};

map['_user_2'] = function() {
    return import ('./pages/index/user/main2.vue');
};

map['_user_3'] = function() {
    return import ('./pages/index/user/main1.vue');
};

map['_user_4'] = function() {
    return import ('./pages/index/user/main2.vue');
};

module.exports = function(name) {
    var result = map[name] || null;
    return result;
};
/**
 * @description 按钮显示隐藏
 * @author 雪进
 * @date "2017-5-13"
 *
 * @param {zepto} $cont zepto对象，无需显示时传空
 * @param {object} DB 数据接口信息
 * @param {string} pageSize 每页个数
 * @param {string} currentPage 可选 currentPage当前页码，默认1
 * @param {boolean} active 可选 自动渲染开关
 * @param {string} active 必须 用来确定输出格式
 * @param {function} callback 回调函数，传数据回去
 * @example
 *      var ButtonLimit = require('./components/js/button_limit.js');
 *      Vue.use(ButtonLimit);
 *      vue组件中直接使用this.$checkAuth方法
 */
var Ajax = require('./ajax.js');
var authList = [];
// button的map,后面是后台使用的字段，用来防止后台修改常用按钮类型
var mapping = {
    add: "add",
    delete: "delete",
    edit: "edit",
    check: "check",
    select: "select"
};

function reqAuthList() {
    new Ajax({
        url: '/newconsole/consoleapi/user/buttons',
        async: false,
        success: function(res) {
            authList = res.resources;
        }
    });
}
// 获取按钮权限列表
reqAuthList();

var buttonLimit = {
    install: function(Vue, opts) {
        // Vue.checkAuthor = function() {
        // }

        // 注入组件
        Vue.mixin({
            created: function() {
                this.$checkAuth = function(type) {
                    var route = this.$route,
                        matched = route.matched,
                        lastMatched = matched[matched.length - 1];
                    var bFix = lastMatched.path.substring(1).replace(/\//g, ':');
                    // 根据mapping的type判断是否渲染button
                    var transType = mapping["" + type] || type;
                    return buttonLimit.checkIn(
                        (bFix.charAt(bFix.length - 1) !== ':' ?
                            bFix + ':' :
                            bFix) +
                        transType);
                }
            }
        });

        // Vue.prototype.checkAuthor = function(type) {
        // }
    },
    checkIn: function(id) {
        for (var i = authList.length - 1; i >= 0; i--) {
            if (authList[i] === id) {
                return true;
            }
        }
        return false;
    }
};

module.exports = buttonLimit;
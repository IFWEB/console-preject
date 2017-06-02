/**
 * Created by Administrator on 2017/4/18.
 */
/**实用工具*/
import axios from 'axios';
const util = function(win) {
    /**
     * 定义一系列变量
     * */
    var util = {},
        base_url = '/';

    /**
     * 根据是线上环境还是本地环境，选取不同的server_url的值
     * */
    if (win.location.href.indexOf('localhost') > -1) {
        base_url = 'http://localhost:5000';
    }
    /**
     *@example
        Util.dateFormat((new Date()),"yyyy年MM月d日 h时m分s秒")      ==> "2016年05月11日 13时49分55秒"
        Util.dateFormat((new Date()),"yyyy-MM-dd hh:mm:ss.S")        ==> "2016-05-11 13:50:29.517"
        Util.dateFormat((new Date()),"yyyy-M-d h:m:s.S")             ==> "2016-5-11 13:50:41.708"
    */
    /**格式化时间*/
    util.dateFormat = function(date, fmt) {
        var time = new Date(date);
        var o = {
            "M+": time.getMonth() + 1, //月份
            "d+": time.getDate(), //日
            "h+": time.getHours(), //小时
            "m+": time.getMinutes(), //分
            "s+": time.getSeconds(), //秒
            "q+": Math.floor((time.getMonth() + 3) / 3), //季度
            "S": time.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };

    /**临时数据存储到sessionStorage中*/
    util.dataToSessionStorageOperate = {
        /**存储*/
        save(data_name, data_value) {
            if (data_name && data_value)
                sessionStorage.setItem(data_name, JSON.stringify(data_value));
        },
        /**取出*/
        achieve(data_name) {
            if (!data_name) return;
            var data_value = sessionStorage.getItem(data_name);
            data_value && (data_value = JSON.parse(data_value));
            return data_value;
        },
        /**删除*/
        remove(data_name) {
            if (data_name)
                sessionStorage.removeItem(data_name);
        },
        /**清空*/
        clear() {
            sessionStorage.clear();
        }
    };

    /**跳转页面*/
    util.jumpPage = function(jumpUrl) {
        if (typeof jumpUrl == 'undefined') win.location.href = win.location.origin + '/#/abnormal';
        else if (jumpUrl.indexOf('http') == -1)
            win.location.href = win.location.origin + '/#/' + jumpUrl;
        else
            win.location.href = jumpUrl;
    };

    /**
     * 公用请求ajax的方式
     * */
    util.ajax = function(path, data, http_method, success_callback, fail_callback) {
        axios({
            url: path,
            method: http_method,
            baseURL: base_url,
            params: data
        }).then(function(response) {
            /**token验证失败*/
            if (response.data.status == -1) {
                util.jumpPage('login');
            } else {
                success_callback && success_callback(response.data);
            }
        }).catch(function(error) {
            fail_callback && fail_callback(error);
        });
    };

    return util;
}(window);
export default util;
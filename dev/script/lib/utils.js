import $ from 'jquery';

var utils = {
    trim: function(val) {
        return $.trim(val);
    },
    queryString: function(key) {
        let _regexp = new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)");
        return (document.location.search.match(_regexp) || ['', null])[1];
    },
    setCookie: function (name, value, days) {
        var Days = days || 1;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
    },
    setCookieTime: function (name, value) {
        var Days = 1;
        var exp = new Date(value);
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
    },
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        document.cookie = name + "=;path=/;expires=" + exp.toGMTString();
    },
};


module.exports = utils;

/**
 * 用JS获取地址栏参数的方法（超级简单）
 *方法一：采用正则表达式获取地址栏参数：（ 强烈推荐，既实用又方便！）
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]);
    return null;
}
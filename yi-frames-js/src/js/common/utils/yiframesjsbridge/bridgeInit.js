/*
 * @Author: zhangfanglan 
 * @Date: 2018-03-02 14:32:27 
 * @Last Modified by: zhangfanglan
 * @Last Modified time: 2018-03-21 18:21:28
 */
import ua from "../ua";
export let bridge = {
    init: function () {
        var script = document.createElement("script");
        if (ua().browser2.imformation.isEPapp) {
            // script.src = 'www.baidu.com'
        } else if (ua().browser2.imformation.weixin) {
            script.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js'
        }
        document.body.appendChild(script)
    }(),  
}
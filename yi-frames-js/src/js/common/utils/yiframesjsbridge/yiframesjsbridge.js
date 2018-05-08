/**
 * @module yiframesjsbridge
 * yiframesjsbridge 与APP进行交互
 * 支持如下链式操作
 * yiframesjsbridge.subscribe('event1',[function1,function2]).subscribe('event2',function(){}).call('query?userId=2',function(){});
 * 修改：subscribe注册的事件，但不再支持call回调使用了，要使用call还请使用匿名回调方法，并且call已经支持超时设置（默认3秒超时）！
 * 修改：支持先notify再subscribe，也进行触发
 */
(function (window) {
    typeof define !== 'undefined' ? define('utils/yiframesjsbridge/yiframesjsbridge.js', __init) : __init(0, {}, {});
    function __init(require, exports, module) {
        var Events = {},
            toBeNotify = [],
            toBeCall = [],
            isCalling = false,
            windowLoaded = false,
            appIframe,
            QUEUE_TIMEOUT = 30,//队列执行间隔时长
            CUSTOM_PROTOCOL_SCHEME = 'yiframes',
            EVENT_PREFIX = 'TEMPORARYEVENT';//临时事件名称前缀，后缀为_+时间缀


        var yiframesjsbridge = window.yiframesjsbridge = {
            /**
             * 触发一个事件
             * @method notify
             * @param eventName 事件名称
             * @param data 事件数据 PS：现在支持变参，除了eventName,data以外还可以添加任意参数
             * @returns {yiframesjsbridge}
             */
            notify: function (eventName, data) {
                var eventList = Events[eventName], i = 0;
                if (eventList) {
                    var len = eventList.length;
                    for (; i < len; i++) {
                        eventList[i].apply(this, toBeNotify.slice.call(arguments, 1));
                    }
                } else {
                    toBeNotify.push({
                        eventName: eventName,
                        data: toBeNotify.slice.call(arguments, 1),
                        scope: this
                    });//暂时存入待触发列表
                }
                //若为临时事件，则通知一次之后马上注销
                if (new RegExp('^' + EVENT_PREFIX + '(_\\d+)$').test(eventName))
                    this.unsubscribe(eventName);
                return this;
            },
            /**
             * 给定作用域触发一个事件
             * @param eventName 事件名称
             * @param scope 作用域
             * @param data 事件数据，支持变参
             */
            notifyWith: function (eventName, scope, data) {
                if (arguments.length < 2)
                    throw new TypeError('按作用域触发事件请提供事件名称与作用域');
                this.notify.apply(scope, [eventName].concat(toBeNotify.slice.call(arguments, 2)));
            },
            /**
             * 订阅一个事件
             * @method subscribe
             * @param eventName 事件名称
             * @param callback 事件回调
             */
            subscribe: function (eventName, callback) {
                var i = 0, len = toBeNotify.length;
                if (arguments.length < 2)
                    throw new TypeError('订阅事件请提供事件名称与事件回调');

                var eventList = Events[eventName] ? Events[eventName] : (Events[eventName] = []);
                eventList = Object.prototype.toString.call(callback) === '[object Array]' ? eventList.concat(callback) : eventList.push(callback);
                for (; i < len; i++) {
                    if (toBeNotify[i].eventName === eventName) {
                        //移除并触发之前已准备触发的事件
                        this.notify.apply(toBeNotify[i].scope, [eventName].concat(toBeNotify[i].data));
                        toBeNotify.splice(i, 1);
                        break;
                    }
                }
                return this;
            },
            /**
             * 取消订阅事件
             * @method unsubscribe
             * @param eventName 事件名称
             */
            unsubscribe: function (eventName, callback) {
                if (callback) {
                    var callbacks = Events[eventName];
                    for (var i = 0; i < callbacks.length; i++) {
                        if (callbacks[i] === callback) {
                            callbacks.splice(i--, 1);
                        }
                    }
                } else
                    delete Events[eventName];
                return this;
            },
            /**
             * 列队执行 无参时代表调起队列开始执行
             * @param callback 回调方法
             */
            queue: function (callback) {
                if (arguments.length == 0 && !isCalling) {
                    _reCall();
                    return this;
                }
                if (isCalling || !windowLoaded) {
                    toBeCall.push(callback);
                    return this;
                }

                isCalling = true;
                callback();

                window.setTimeout(_reCall, QUEUE_TIMEOUT);
                function _reCall() {
                    var flag = false;
                    for (var i = 0; i < toBeCall.length; i++) {
                        flag = true;
                        toBeCall[i].call();
                        window.setTimeout(arguments.callee, QUEUE_TIMEOUT);
                        toBeCall.splice(i, 1);
                        break;
                    }
                    isCalling = flag;
                }
                return this;
            },
            /**
             * 调用APP接口，主要是处理参数包，回调等，得到一个url调用doCall方法
             * @method call
             * @param api 请求地址
             * @param params 参数包 可选
             * @param timeout 超时时间 可选 默认为0代表永远不超时
             * @param callback 回调方法 可选
             */
            call: function (api) {
                if(!this.isMobile){
                    (/debug/).test(location.search)&&console.log('非移动设备，不执行调用:'+api);
                    return this;
                }
                var that = this, callback, url, params, timeout = 0, eventName;
                if (/^\/.*$/.test(api)) {
                    api = api.slice(1);
                }
                switch (arguments.length) {
                    case 0:
                        throw new TypeError('请至少提供一个请求地址参数');
                    case 2:
                        //若参数长度为2，则第二个参数有可能为参数包对象或超时时间或回调方法
                        Type(arguments[1]) == Type.Function ? callback = arguments[1] :
                            Type(arguments[1]) == Type.Number ? timeout = arguments[1] : params = arguments[1];
                        break;
                    case 3:
                        //若参数长度为3，则第二个参数有可能是参数包或超时时间，
                        //第三个参数看情形判断,有可能是超时时间或回调方法
                        Type(arguments[1]) == Type.Number ? timeout = arguments[1] : params = arguments[1];
                        Type(arguments[2]) == Type.Function ? (callback = arguments[2]) :
                            Type(arguments[2]) == Type.Number ? timeout = arguments[2] : '';
                        break;
                    case 4:
                        params = arguments[1];
                        timeout = arguments[2];
                        callback = arguments[3];
                }
                url = CUSTOM_PROTOCOL_SCHEME + '://' + api;
                if (params) {
                    url += (url.indexOf('?') == -1 ? '?' : '&') + function () {
                        var paramArr = [], key;
                        for (key in params) {
                            paramArr.push(key + '=' + (Type(params[key]) === Type.Object ? encodeURIComponent(JSON.stringify(params[key])) : (Type(params[key]) === Type.Array ? encodeURIComponent(params[key].join('|')) : encodeURIComponent(params[key]))));
                        }
                        return paramArr.join('&');
                    }();
                }
                if (callback) {
                    eventName = EVENT_PREFIX + '_' + (new Date()).getTime();
                    this.subscribe(eventName, callback);
                }
                if (eventName) {
                    url += (url.indexOf('?') == -1 ? '?' : '&') + 'jsCallback=' + encodeURIComponent("yiframesjsbridge.notify('" + eventName + "',{data});");
                }
                typeof ApplicationInterface !== 'undefined' ?
                    (function () {
                        //优先使用JsBridge方式进行交互
                        ApplicationInterface.call(url);
                        (/debug/).test(location.search) && console.log(new Date().getTime() + ':JsBridge:yiframesjsbridge:' + url);
                    })() : (function () {
                        //App尚未提供JsBridge
                        //否则生成iframe通知APP
                        that.queue(function () {
                            (/debug/).test(location.search) && console.log(new Date().getTime() + ':Url:yiframesjsbridge:' + url);
                            doCall(url);
                        })
                    })();

                if (timeout !== 0) {
                    //此处针对外部浏览器呼起APP做兼容。非浏览器或非ios9，应该通知  未进入后台，超时等于timeout，也应该通知
                    checkOpen(timeout, function (flag) {
                        if (flag === 0) {
                            that.notify(eventName, packageData(null, false, '客户端未响应'));
                        }
                    });

                }

                return this;
            },
            isBrowser: !/yiframes/g.test(navigator.userAgent),
            isWeiXin: /MicroMessenger/g.test(navigator.userAgent),
            isIOS9: (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) && Boolean(navigator.userAgent.match(/OS [9]_\d[_\d]* like Mac OS X/i)),
            isMobile: /Mobile/g.test(navigator.userAgent),
            isIOS: (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i))
        };

        //APP内 或 APP外且非IOS9
        if (!yiframesjsbridge.isBrowser || (yiframesjsbridge.isBrowser && !yiframesjsbridge.isIOS9)) {
            //app内直接设置为true不需要缓冲
            windowLoaded = true;
        } else {
            if (document.readyState === 'complete') {
                windowLoaded = true;
            } else {
                window.addEventListener('load', function () {
                    windowLoaded = true;
                    yiframesjsbridge.queue();
                });
            }
        }

        function packageData(obj, success, message) {
            return {
                data: obj,
                code: !success & 1,
                message: message,
                success: success
            };
        }

        /**
         * 对象类型获取
         * @method Type
         * @param obj
         * @returns {number}
         * @constructor
         */
        function Type(obj) {
            var type = Object.prototype.toString.call(obj);
            var _type = type.match(/^\[object\s(.*)\]$/)[1];
            return Type[_type] || Type.Object;
        }
        Type.Object = 1;
        Type.Array = 2;
        Type.String = 3;
        Type.Function = 4;
        Type.Number = 5;

        /**
         * @method {{checkOpen}} 检测是否调起APP
         * @param  {Integer} timeout [超时判断]
         * @param  {Function} cb [回调方法]
         */
        function checkOpen(timeout, cb) {
            var _clickTime = +(new Date());
            function check(elsTime) {
                if (elsTime > (timeout + 1000) || document.hidden || document.webkitHidden) {
                    cb(1);
                } else {
                    cb(0);
                }
            }
            //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
            var _count = 0, intHandle;
            intHandle = setInterval(function () {
                _count++;
                var elsTime = +(new Date()) - _clickTime;
                if (_count >= timeout / 20 || elsTime > (timeout + 1000)) {
                    clearInterval(intHandle);
                    check(elsTime);
                }
            }, 20);
        }

        /**
         * 执行app scheme调用
         * 此处要看看是否需要移除iframe，不移除性能会比较好
         * @method doCall
         * @param url
         */
        function doCall(url, force) {
            var doc = document, body = doc.body;
            if (yiframesjsbridge.isIOS9) {
                //IOS9特殊处理
                window.location = url;
            } else {
                if (!appIframe) {
                    appIframe = doc.createElement('iframe');
                    appIframe.id = 'yiframesjsbridgeNativeFrame';
                    appIframe.style.display = 'none';
                    //运行在head中 body尚未渲染
                    if (!body) {
                        setTimeout(function () {
                            doc.body.appendChild(appIframe);
                        }, 0);
                    } else {
                        body.appendChild(appIframe);
                    }
                }
                appIframe.src = url;
            }
        }

        module.exports = yiframesjsbridge;
    }
})(window);

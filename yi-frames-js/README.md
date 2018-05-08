#yi-frames-js [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> The UI widgets of Yi-Frames

## 安装Yi-frames脚手架

First, 使用cnpm/npm/yarn 全局安装 [Yeoman](http://yeoman.io) & generator-yi-frames.

```bash
cnpm i -g yo
cnpm i -g generator-yi-frames
```

Second,安装Yi-frames-js

* 同脚手架模板一起安装：下载脚手架模板到项目文件夹，自带yi-frames-ui模块：
```bash
yo yi-frames

* 单独安装
cnpm i --S yi-frames-js@版本号

```


## Yi-frames-js@1.7.0介绍

```bash
功能目录：
——ui：
1.pagination: 分页组件
2.dropLayer: 下拉菜单
——ui/swiper
	3.swiper@4.0.0 滑动轮播
	4.swiper@2.7.0 (forIE)
5.tabs 选项卡
——ui/echarts
	6.echarts@4.0.2 可视化图标
	7.echarts@3.3.2 (forIE)
8. subNav 竖式伸缩导航栏
9.上拉加载更多&下拉刷新
10.drag拖拽

——utils：
1.exp: 正则验证工具（支持手机号、邮箱、姓名等验证）
2.ua: 用户代理监测
3.countdown: 倒计时
4.html2img: 网页截图(配合html2canvas@1.0.0-alpha.5)
5.fastclick@1.0.6 解决移动端点击事件的300毫秒延迟
6.photoclip@3.3.6 用户上传头像与手势截图
7.qrcode@1.2.0 生成二维码
8.lodash@3.10.1 js实用程序库
9.jspdf@1.3.5 网页生成pdf文件(配合html2canvas@1.0.0-alpha.5)
10.yiframesjsbridge js调取app原生功能
11.date 日期、时间处理的一些方法

——base：
1.getClass: 获取指定元素下所有指定类名的元素
2.eventUtil: DOM2级事件处理程序

组件功能及使用说明：
  http://ep-svnserver30.tech.bitauto.com/FE/yi-widget/yi-frames-js/dist/html/demo/index.html

最新版更新说明:
	使用es6语法(import和export/export default、promise等)
	修改引入方式为 import {} from 'path/path';

```


## License

MIT © [贾时龙Mapk Volkov]()


[npm-image]: https://badge.fury.io/js/generator-yi-frames.svg
[npm-url]: https://npmjs.org/package/generator-yi-frames
[travis-image]: https://travis-ci.org/mapkab/generator-yi-frames.svg?branch=master
[travis-url]: https://travis-ci.org/mapkab/generator-yi-frames
[daviddm-image]: https://david-dm.org/mapkab/generator-yi-frames.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mapkab/generator-yi-frames
[coveralls-image]: https://coveralls.io/repos/mapkab/generator-yi-frames/badge.svg
[coveralls-url]: https://coveralls.io/r/mapkab/generator-yi-frames
 
#yi-frames-ui [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> The UI widgets of Yi-Frames

## 安装Yi-frames脚手架

First, 使用cnpm/npm/yarn 全局安装 [Yeoman](http://yeoman.io) & generator-yi-frames.

```bash
cnpm i -g yo
cnpm i -g generator-yi-frames
```

Second,安装Yi-frames-ui

* 同脚手架模板一起安装：下载脚手架模板到项目文件夹，自带yi-frames-ui模块：
```bash
yo yi-frames

* 单独安装
```bash
cnpm i --S yi-frames-wx
```


## Yi-frames-wx@0.0.3介绍
```bash
- pc配置文件，测试人员手动替换 src => pug => index.pug 中所有内容，后续会更改脚手架配置文件
extends ../node_modules/yi-frames-wx/pc-widget/src/pug/layout.pug
block pugConfig
	-const pugConfig={titleText:`title`, cssName:`css`, confName:`js`, isNotSpa:false, column:'2', bodyClassName:['class'], hrefUrl:`../../`};
block header
    p 页头内容区域 & 页头和主体中间所增加的内容区域
block mainLeft
    p 单列布局内容区域 & 多列布局左侧内容区域
block mainContent
    p 两列布局右侧内容区域 & 多列布局中间内容区域
block mainRight
    p 三列布局右侧内容区域
block footer
    p 页底内容区域 & 主体与页底之间所增加内容区域

- 配置文件说明
titleText：设置浏览器标题
cssName：设置css的文件名，默认public
confName：设置js的文件名
isNotSpa：true=多页，false=单页
column： 1=单列，2=左右双列，3=三列
bodyClassName： 设置body的类名
hrefUrl：设置css、js文件的路径，根据pug文件目录层级配置‘../’
- 测试包，仅供测试开发使用，禁止使用到项目开发中
- wap组件
- pc组件
- 后续继续迭代
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
 
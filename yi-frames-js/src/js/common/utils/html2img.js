/*
 * @Author: guojufeng@ 
 * @Date: 2017-12-25 15:18:12
 * html2image模块
 * @param {object=} parameter 参数配置
 * @param {string} parameter.targetEleId: 目标元素id--要截屏的区域
 * @param {string} parameter.imgType: 要保留下来的图片格式：png|jpg|bmp|gif
 * @param {Boolean} toDown: 是否执行下载功能，不执行则返回图片base64地址
*/
import { html2canvas } from './html2canvas';
export let html2img = (parameter,toDown = true)=> {
  const promise = new Promise((resolve,reject)=>{
    if(parameter.imgType == 'png' || parameter.imgType == 'jpg' || parameter.imgType == 'bmp' || parameter.imgType == 'gif'){
      let type = parameter.imgType;
      /**
      * 获取mimeType
      * @param  {String} type the old mime-type
      * @return the new mime-type
      */
      const _fixType = function(type) {
          type = type.toLowerCase().replace(/jpg/i, 'jpeg');
          let r = type.match(/png|jpeg|bmp|gif/)[0];
          return 'image/' + r;
      };
      html2canvas(parameter.targetEleId).then(function(canvas) {
        let imgData = canvas.toDataURL(type)
        let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = imgData.replace(_fixType(type),'image/octet-stream');
        if(toDown){
          let link_title = parameter.titleStr ? parameter.titleStr + '_' : 'easypass_';
          save_link.download = link_title + (new Date()).getTime() + '.' + type;
          let event = document.createEvent('MouseEvents');
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          save_link.dispatchEvent(event);
        }else{
          resolve(save_link.href);
        }
      }); 
    }else{
      reject(new Error('parameter.imgType 类型错误，应该是字符串，且只有四种类型值。'));
    }
  });
  return promise;
}
/*
 * @Author: guojufeng@ 
 * @Date: 2017-12-29 10:10:52
 * 一款手势驱动的裁图插件
 * @param {object=} parameter 参数配置
 * @param {String|HTMLElement} parameter.cutBoxId: 裁剪控件元素idName
 * @param {Array} parameter.sizeArr: 裁剪框大小 [200,300]
 * @param {String|HTMLElement} parameter.selectFileId: 上传图片的 <input type="file"> 控件的选择器或者DOM对象。如果有多个，可使用英文逗号隔开的选择器字符串，或者DOM对象数组。
 * @param {String|HTMLElement} parameter.confirmBtnId: 确认截图按钮的选择器或者DOM对象。如果有多个，可使用英文逗号隔开的选择器字符串，或者DOM对象数组。
*/
const photoClip = require('photoclip/dist/Photoclip.min');
export let photoclip = (parameter)=>{
	const promise = new Promise((resolve, reject)=>{
		const clipArea = new photoClip(parameter.cutBoxId, {
			size: parameter.sizeArr,
			outputSize:[0,0], //打开图片大小，[0,0]表示原图大小
			file: parameter.selectFileId,
			ok: parameter.confirmBtnId,
			loadStart: ()=> { //图片开始加载的回调函数。this 指向当前 PhotoClip 的实例对象，并将正在加载的 file 对象作为参数传入。（如果是使用非 file 的方式加载图片，则该参数为图片的 url）
				$(".clip-loading").removeClass("hide");
			},
			loadComplete: ()=> {//图片加载完成的回调函数。
				$(".clip-loading").addClass("hide");
			},
			done: (dataURL)=> {
			//裁剪完成的回调函数。会将裁剪出的图像数据DataURL作为参数传入。			
				if (dataURL){
			    resolve(dataURL);//获取图像base64码成功，执行回调。
			  } else {
			    reject(new Error('获取图像base64码失败'));//获取图像base64码失败
			  }
			}
		});
	});
	return promise;
};
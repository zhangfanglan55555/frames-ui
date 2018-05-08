/*
 * @Author: guojufeng@ 
 * @Date: 2018-01-06 19:21:13
 * tab选项卡
 * @param 参数配置
 * @param {String} tabId 包裹tab部分最外边div的idName
 * @param {String} tabContClass 待切换的内容区，div的className
*/
import { getClass } from '../../_base/getClass';
export let tabs = (tabId,tabContClass) => {
	return new Promise((resolve,reject)=>{
		let oTabsBox = document.getElementById(tabId);
		if(oTabsBox){
			getClass(tabId,'tabs-ul')
			.then((tabsUl)=>{
				let oLi = tabsUl[0].getElementsByTagName('li');
				return new Promise((resolve,reject)=>{
					if(oLi.length <= 0){
						reject(new Error('元素tabs-ul 里边找不到li标签'));
					}else{
						resolve(oLi);
					}
				})
			})
			.then((oLi)=>{
				getClass(tabId,tabContClass)
				.then((oTabCont)=>{
					if(oTabCont.length <= 0){
						reject(new Error('tabContClass参数错误，请检查传入的参数与实际tabs结构中的类名是否匹配'));
					};
					for (let i = 0; i < oLi.length; i++) {
						oLi[i].tabsIndex = i;
						oLi[i].onclick = function(){
							for (let j = 0; j < oLi.length; j++) {
								oLi[j].className = '';
								oTabCont[j].className = tabContClass + ' hide';
							}
							this.className = 'active';
							oTabCont[this.tabsIndex].className = tabContClass;
						}
					}
				})
			})
		}else{
			reject(new Error('tabId参数错误，请检查这个id是否存在于结构中，并且是否正确拼写为字符串格式'));
		}
	});
}
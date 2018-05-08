﻿/*
 * @Author: guojufeng@ 
 * @Date: 2017-12-18 11:04:22
 * 分页
 * @param {object=} parameter 参数配置
 * @param {string} parameter.idName: ul元素的id名
 * @param {number} parameter.currentPage: 当前页码
 * @param {number} parameter.pageSums: 按钮总数(即总页数) = 数据条数总和/单页显示条数
 * @param 默认参数配置
 * @param {number} btnSums: 每页当中显示按钮个数 默认为10
 * @param {boolean} isEP: 是否易湃平台项目 默认为true
*/
export let pagination = (parameter,btnSums = 10,isEP = true) =>{
  let currentPage = Number(parameter.currentPage);
  initPagination();
  function initPagination(){
    // 生成页数模板
    const startPage = Math.max(1, currentPage - parseInt(btnSums / 2));
    const endPage = Math.min(parameter.pageSums, startPage + (btnSums - 1));
    let pageHtml = '';
    const pageTxts = {
      pageA: 7,
      pageB: 11,
      pageC: 10,
      pageD: 4,
      lessThanOne: `<li class="prev disable"><span class="normal-state">首页</span></li>
                    <li class="prev disable"><span class="normal-state"><i class="icon icon-previouspage"></i></span></li>`,
      oneToSix: `<li class="prev"><a href="javascript:;" data-num="1">首页</a></li>
                 <li class="prev">
                  <a href="javascript:;" data-num="${(currentPage - 1)}">
                    <i class="icon icon-previouspage"></i>
                  </a>
                 </li>`,
      equalToSeven: '<li><a data-num="1" href="javascript:;">...</a></li>',
      greaterThanSenven: `<li><a data-num="${(currentPage - 5)}" href="javascript:;">...</a></li>`,
      greaterThanPageSum: `<li class="next disable"><span class="normal-state"><i class="icon icon-nextpage"></i></span></li>
                           <li class="next disable"><span class="normal-state">末页</span></li>`,
      lessThanEleven: `<li class="next">
                        <a href="javascript:;" data-num="${(currentPage + 1)}">
                          <i class="icon icon-nextpage"></i>
                        </a>
                      </li>
                      <li class="next">
                        <a href="javascript:;" data-num="${parameter.pageSums}">末页</a>
                      </li>`,
      lessEqualTen: '<li><a data-num="11" href="javascript:;">...</a></li>',
      othersPage: `<li><a data-num="${(currentPage + 5)}" href="javascript:;">...</a></li>`
    };
    if(!isEP){
      pageTxts.pageA = 5,
      pageTxts.pageB = 8,
      pageTxts.pageC = 6,
      pageTxts.pageD = 3,
      pageTxts.lessThanOne = '<li class="prev disable"><span class="normal-state">&lt;</span></li>';
      pageTxts.oneToSix = `<li class="prev"><a href="javascript:;" data-num="${(currentPage - 1)}">&lt;</a></li>`;
      pageTxts.equalToSeven = `<li><a href="javascript:;" data-num="1">1</a></li>
                               <li><a data-num="1" href="javascript:;">...</a></li>`;
      pageTxts.greaterThanSenven = `<li><a href="javascript:;" data-num="1">1</a></li>
                                    <li><a data-num="${(currentPage - parseInt(btnSums / 2)-1)}" href="javascript:;">...</a></li>`;
      pageTxts.greaterThanPageSum = '<li class="next disable"><span class="normal-state">&gt;</span></li>';
      pageTxts.lessThanEleven = `<li class="next"><a href="javascript:;" data-num="${(currentPage + 1)}">&gt;</a></li>`;
      pageTxts.lessEqualTen = `<li><a data-num="${(btnSums+1)}" href="javascript:;">...</a></li>
                              <li><a href="javascript:;" data-num="${parameter.pageSums}">${parameter.pageSums}</a></li>`;
      pageTxts.othersPage = `<li><a data-num="${(currentPage + parseInt(btnSums / 2)+1)}" href="javascript:;">...</a></li>
                            <li><a href="javascript:;" data-num="${parameter.pageSums}">${parameter.pageSums}</a></li>`;
    };
    if(parameter.pageSums > 1){
      // 上一页、首页
      if(currentPage <= 1){
        pageHtml += pageTxts.lessThanOne;
      }else{
        if(currentPage >= 1 && currentPage < pageTxts.pageA){//7 | 5
          pageHtml += pageTxts.oneToSix;
        }else{
          if(currentPage === pageTxts.pageA){//7 | 5
            if(!isEP){
              pageHtml += pageTxts.oneToSix;
              pageHtml += '<li><a href="javascript:;" data-num="1">1</a></li>';
            }else{
              pageHtml += pageTxts.oneToSix + pageTxts.equalToSeven;
            }
          }else{
            pageHtml += pageTxts.oneToSix + pageTxts.greaterThanSenven;
          }
        }
      };
      // 中间按钮
      for(let centerPage = startPage; centerPage <= endPage; centerPage++){
        if(currentPage === centerPage){
          pageHtml += `<li class="active"><span class="normal-state">${centerPage}</span></li>`;
        }else{
          pageHtml += `<li><a href="javascript:;" data-num="${centerPage}">${centerPage}</a></li>`;
        };
      }
      // 下一页、尾页
      if(currentPage >= parameter.pageSums){
        pageHtml += pageTxts.greaterThanPageSum;
      }else{
        if(parameter.pageSums < pageTxts.pageB){//11 | 8
              pageHtml += pageTxts.lessThanEleven;
          }else{
            if((parameter.pageSums - currentPage) <= pageTxts.pageD){//5 | 3
                pageHtml += pageTxts.lessThanEleven;
            }else if(!isEP && (parameter.pageSums - currentPage) === 4){
                pageHtml += `<li><a href="javascript:;" data-num="${parameter.pageSums}">${parameter.pageSums}</a></li>`;
                pageHtml += pageTxts.lessThanEleven;
            }else{
              if(currentPage <= pageTxts.pageC){//10 | 6
                pageHtml += pageTxts.lessEqualTen + pageTxts.lessThanEleven;
              }else{
                pageHtml += pageTxts.othersPage + pageTxts.lessThanEleven;
              }
            }
          }
      };
    };
    if(parameter.idName){
      const pageBox = document.getElementById(parameter.idName);
      const promise = new Promise((resolve,reject)=>{
        if(pageBox){
          pageBox.innerHTML = pageHtml;
        }else{
          reject(new Error ('parameter.idName属性错误：找不到你传入的id元素，请检查idName属性值是否存在并正确。'));
        }
      });
    return promise;
    }
  };
};
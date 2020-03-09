/**
 * Created by Tim on 2016/6/30.
 */
"use strict";
/*设置和更新标题中的日期*/
var oTitleTimeInfo=$('#titleTimeInfo')[0];
var oSetTitleDate=new setTitleDate({ele:oTitleTimeInfo});
/*设置和更新标题中的日期*/
/*首页地图操作*/
var operatorGeo=function (options) {
    var that=this;

    that.options={//配置项
        ele:null,//echarts实例对象
        backBtn:null,//返回按钮对象
        titleInfoName:null,//标题地名对象
        titleMemberName:null,//加盟商名字对象
        MemberName:'一应云',//加盟商名字
        data:null,//加盟商、项目和网点数据
        geoCoordMap:null,//地图数据
        geoPath:null,//地图json数据的路径
        geoLevel:0,//地图层级：0代表全国，11代表省或自治区，12代表直辖市，2代表市
        option:null,//echarts参数
        chineseName:'',//存储当前地图的中文名
        provinceName:'',//省的名字
        prevGeoMap:[],//记录前一个地图名称，便于操作返回按钮
        isBackBtn:false,//是否开启返回按钮
        params:{},//请求接口的参数
        url:null,//接口地址
        isSort:false,//判断是否进行加盟商信息筛选
        sortCode:'',//筛选的项目编号
        clickLock:{//点击事件锁
            click:true
        },
        WarnAnimate:{},//告警和预警数据数据交互动画对象
        WarnData:{//存储警告数据
            isFirst:true,
            AlarmData:{
                data:null,
                len:0
            },
            AlertData:{
                data:null,
                len:0
            }
        },
        WarnDataByColumn:{//由栏目中传过来的报警信息
            isFirst:true,
            Code:null,
            WarnId:null,//告警Id
        },
        monitorVideoUri:'',//点击的视频路径
        timer:{}//定时器
    }

    for(var item in options){
        that.options[item]=options[item];
    }

    that.init();
};

operatorGeo.prototype={
    init:function () {
        var that=this;

        that.initOption();//初始化配置echarts参数
        that.initWarnAnimate();//初始化告警和预警数据数据交互动画
        that.loadMap('china','GetAllOfMemberInfor');//修改地图
        that.dblclick();//地图区域双击事件 -> 用于查看省市地图信息
        that.click();//单击加盟商总部、项目和网点，筛选出该加盟上下的所有项目和网点
        that.backBtnClick();//返回按钮点击事件
    },
    initOption:function () {//配置echarts参数
        var that=this;
        var options=that.options;

        options.option = {
            tooltip : {
                trigger: 'item',
                //triggerOn:'click',//鼠标点击时触发
                enterable:true,//鼠标是否能进入提示框内
                formatter: function (params, ticket, callback) {
                    var content='';

                    if(params.value!=undefined){
                        content='<p style="text-align: center;">'
                            +'<span class="dpb" style="padding-top:18px;padding-bottom:10px;font-family:微软雅黑;font-size: 1.5rem;color: #ffffff;">'+params.name+'</span>'
                            +'<span class="dpb" style="font-family:微软雅黑;font-size: 0.875rem;color: #898a95;">'+params.value[6]+'</span>'
                            +'</p>';
                    }

                    /*设置是否要设置新的提示浮窗的样式*/
                    localStorage.modifyTooltip=true;
                    /*设置是否要设置新的提示浮窗的样式*/

                    return content;
                }
            },
            legend: {
                orient: 'horizontal',
                bottom: 212,
                right:116,
                itemGap:18,
                itemWidth:28,
                itemHeight:18,
                padding:[0,0,0,0],
                data:[
                    {
                        name:'正常',
                        icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAASCAYAAABIB77kAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF5GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMDgtMjlUMTQ6MTI6MjkrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTA4LTI5VDE0OjI1OjIzKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA4LTI5VDE0OjI1OjIzKzA4OjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZmMWZkZjJjLTk1NzEtMDA0Ni04ZWNhLTE2NjM1NDJjNmQ5NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4MjBFMEI0N0FCNTIxMUU4ODkzMzhEQTk5MThBMzA2OCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjgyMEUwQjQ3QUI1MjExRTg4OTMzOERBOTkxOEEzMDY4IiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODIwRTBCNDRBQjUyMTFFODg5MzM4REE5OTE4QTMwNjgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODIwRTBCNDVBQjUyMTFFODg5MzM4REE5OTE4QTMwNjgiLz4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NmYxZmRmMmMtOTU3MS0wMDQ2LThlY2EtMTY2MzU0MmM2ZDk1IiBzdEV2dDp3aGVuPSIyMDE4LTA4LTI5VDE0OjI1OjIzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkQcWjgAAAHgSURBVDiNrZXBaxNBFIe/2Q01hbhrSwNCWCkKsrdcSy9CUDxoEVqo5/bsRf8QPXgs0otetCjSnlq1eNAGT8ktFRFpEyk0iLtGmuAmz8PuJmprMiM+mMPszsc3M+z+nqJS58+SYqEE3ARKwLnk8R7wCnisqo2Xv6w9xg+vSr0/RMQXkW0ZXdsi4ieM0VDpCaVYuASsA6ebUY+7hy02wjbvOxEAF09luO5kuZPPMZWxAL4Bc8Brk/MpKnWkWPCBMuA+DY5Y3v9K0O2dCLi2xQPvDAvuOEAAzAA1baGIKOAtMPMsOGLh0xdk5C5hbXqS+VhaBmZhJNYXXga2mlGPC7UDwq4Wh2MrPvhnycfXewV4ocNZwCLA/WZLWwYQdoV7h610uqjLWcSfPs/DtrYsrY0BUzIRegC1dmQs3O30Gc9E2DE2JTWmzBkL+AzgZzPG8PmxPnM8roYI3wHccLLGwmsD5o2J8BHArakcjq1/R46tuJ3PpdOHJsJNoJzPWKx6E+goFbDqTaT/YBnY0haqakOAJSCYd8dZm57Eta2/Aq5t8WSQMgGwjGbKxJsdEt7rYZvdToQiDu+5/xDeJ7WnHY32tPOv7em3u1PVRo04iK8CK8BH4AfwnbgjrCTvZpO1xvUTjjVArGkLKW4AAAAASUVORK5CYII='
                    },
                    {
                        name:'预警提示',
                        icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAASCAYAAABIB77kAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF5GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMDgtMjlUMTQ6MjA6NDcrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTA4LTI5VDE0OjI1OjM3KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA4LTI5VDE0OjI1OjM3KzA4OjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVjMTA2MGYwLWE1ZDUtY2E0Yy04Zjc0LTcyZmFmNGMzNmRhMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBQjQzMzFFOUFCNTMxMUU4QTFERUYyRDkwNDQ2QkFFNiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkFCNDMzMUU5QUI1MzExRThBMURFRjJEOTA0NDZCQUU2IiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUI0MzMxRTZBQjUzMTFFOEExREVGMkQ5MDQ0NkJBRTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUI0MzMxRTdBQjUzMTFFOEExREVGMkQ5MDQ0NkJBRTYiLz4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NWMxMDYwZjAtYTVkNS1jYTRjLThmNzQtNzJmYWY0YzM2ZGEzIiBzdEV2dDp3aGVuPSIyMDE4LTA4LTI5VDE0OjI1OjM3KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pqa/dCMAAAH9SURBVDiNpZW9T1NRGMZ/p2mBxkIXEGyCA1HTBBUiQxsGDWVgQGIKCSaGQcraDvqH6NCREJayKGljYNJoo4mCJpCgDMWvwZhakaVwiXwlL8O9h6h83HvwSU5yzrnnye99h/u8inyafyXJbAK4DSSA8871N+AF8EgVMs//eHvIf7Ly6YMlIlERKYq7iiISdTxGS+kOJZm9AcwA9Ws7Fg8+FZmtLPPRWgXgUugsN1suc/9iD401IYANYAB4adKfIp9GktkoMA+E8+UlUotTVHd/H2kIB4JMXLvDUKQToArEgZJnoIgo4A0QL5SXGHo7gSAuVSqmY2MMRjpwCu0GF5MjH9ALxNd2LO4u5FxhAIIwupDj17YFdoe9XmAaOAyQ/fKK9b0trz7W97Z4+Lmoj8MmwATAkx/vPcO0ZivLepswAbYClDZ+GgNXrANPqwlw25jkqMbnN/b4gDJAtL7Z2Nx2plFvv5sA3wHcOnfVGNjf3K63r02AUwDptus0+Os8wxr8ddy70KOPORPgU2C+qTbEZNcICuVqUigmu0Zoqg2B/eM/8wxUhYwAo0B1MNLBdGyMcCB4rCEcCPI4ltIpUwVSeEwZu9gTwnum8oEVaxWFHd4DLVf+O7yPGk9zHsbT3GnHk++vdguZEnYQ9wHjwFdgF9jEngjjzrdu562x9gFDkz15wNAGJwAAAABJRU5ErkJggg=='
                    },
                    {
                        name:'告警提示',
                        icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAASCAYAAABIB77kAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF5GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMDgtMjlUMTQ6MjA6NTMrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTA4LTI5VDE0OjI1OjUyKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA4LTI5VDE0OjI1OjUyKzA4OjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhiNTM1NDAzLTcwYzktMDU0Yi05NzY3LTRiMDcwOWM3ZDBhOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCMEMxRjQ2RkFCNTMxMUU4ODExOEU0NTc4ODg2MzI4QyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkIwQzFGNDZGQUI1MzExRTg4MTE4RTQ1Nzg4ODYzMjhDIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjBDMUY0NkNBQjUzMTFFODgxMThFNDU3ODg4NjMyOEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjBDMUY0NkRBQjUzMTFFODgxMThFNDU3ODg4NjMyOEMiLz4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OGI1MzU0MDMtNzBjOS0wNTRiLTk3NjctNGIwNzA5YzdkMGE4IiBzdEV2dDp3aGVuPSIyMDE4LTA4LTI5VDE0OjI1OjUyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsxmihMAAAHmSURBVDiNrZXBa9NQHMc/eQkm4GK2bkNIaXHqod56HL0IZWMw8TrPE+Yf4P/h7rbgSS9eBUWjDg9zZZf25g5zwjAFmRRDN0gw7fPQvDncbPPELzz4veR9+bwfJN+fEbZ9/pRfDevAPaAOlLPHh8B74Hm3U3x35uw5/1iFbf90SSkrUsotOVlbUspK5tFahurQr4a3gReAO0x7HB81SKKANDkAwLKvY3vLTM0/QFgFgD5wF/ig06ARtn38algBWoAXRy/5cfiQ4aB/oUGYLtOlRzjTdwAiYBHYyw2UUhrAR2Axjl7R+7IByEk2CgsNHG+V7KK1HKZT4BIQDNMe3z7VkH/p7JzRdLl6axthzQIsA2/z+ASwBnDy/UluGIAc9Dk+aqrtWl6fYPTpE0evc8OUkihQZV0HWAJI431tYJp8VmVJB5hok5SMS9oWAXQBLOemttmyVQjxVQe4C+B4K9pA+8qSKrd1gM8ALs+tY5hubphhukzNb6jtUx3gG6AlrFlmypuAkQfHTHlT/YMtIJhg+A3sdooSWAcix1ulsNBAjOlUmC6Fa49VykTAfXKmDDA+vOMoYJDsAwamfQPnP4T3ReNpJ8d42vnX8STOwrud4h6jIF4BmsAB8BM4YTQRmtm7WnZWW78AAl1BbeaotLYAAAAASUVORK5CYII='
                    }],
                textStyle: {
                    color: '#fff',
                    fontFamily:'微软雅黑 Light',
                    fontSize:'18'
                }
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                //roam: true,//是否开启鼠标缩放和平移漫游。默认不开启
                itemStyle: {
                    normal: {
                        // areaColor: '#13548d',
                        borderColor: '#48c7ff',
                        borderWidth:2,
                    },
                    emphasis: {
                        areaColor: '#ffce00',
                        shadowColor:'rgba(30,29,27,1)',
                        shadowBlur:60
                    }
                },
                // regions: [
                //     {
                //         name: '南海诸岛',
                //         value: 0,
                //         itemStyle: {
                //             normal: {
                //                 opacity: 0,
                //                 label: {
                //                     show: false
                //                 }
                //             }
                //         }
                //     },
                //     {
                //         name: '广东省',
                //         itemStyle: {
                //             normal: {
                //                 areaColor: '#13548d'
                //             },
                //         }
                //     }
                // ],
            }
        };

        options.ele.setOption(options.option);
    },
    setData:function (data) {//设置加盟商、项目和网点数据
        var that=this;
        var options=that.options;

        options.data=data;
    },
    setGeoCoordMap:function (data) {//地图数据
        var that=this;
        var options=that.options;

        options.geoCoordMap=data;
    },
    setGeoPath:function (isFlag) {//设置地图json数据的路径,isFlag用于标记是否正在进行返回操作
        var that=this;
        var options=that.options;

        if(!isFlag){
            switch(options.geoLevel){
                case 0:
                    options.geoPath='js/geoProvince/';
                    break;
                case 11:
                    options.geoPath='js/city/'+options.option.geo.map+'/';
                    break;
            }
        }else{
            switch(options.geoLevel){
                case 11:
                case 12:
                    options.geoPath='js/geoProvince/';
                    break;
            }
        }
    },
    setSeries:function (normalData,warnData,warningData) {//设置系列列表
        var that=this;
        var options=that.options;

        options.option.series =[
            {
                name: '正常',
                type: 'scatter',
                coordinateSystem: 'geo',
                data:normalData ,
                symbolSize:[8,8],
                // symbolSize:[4,4],
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        borderType:'solid',
                        borderWidth:2,
                        borderColor:'#ffffff',
                        color: '#00d0e4',
                        fontWeight:'bolder'//,
                        //shadowColor: 'rgba(29, 30, 32, 1)',
                        //shadowBlur: 10
                    },
                    emphasis:{
                        shadowColor: 'rgba(29, 30, 32, 1)',
                        shadowBlur: 10
                    }
                }
            },
            {
                name: '预警提示',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: warningData ,
                symbolSize: [12,12],
                // symbolSize: [6,6],
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        borderType:'solid',
                        borderWidth:2,
                        borderColor:'#ffffff',
                        color: '#00ae6c'//,
                        // shadowColor: 'rgba(29, 30, 32, 1)',
                        // shadowBlur: 10
                    },
                    emphasis:{
                        shadowColor: 'rgba(255, 68, 0, 1)',
                        shadowBlur: 10
                    }
                },
                zlevel: 1
            },
            {
                name: '告警提示',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                rippleEffect:{
                    period:2,
                    scale:4.5
                },
                data:warnData ,
                symbolSize:[20,20],
                // symbolSize:[10,10],
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        borderType:'solid',
                        borderWidth:2,
                        borderColor:'#ffffff',
                        color: '#e5cf1a'//,
                        //shadowColor: 'rgba(29, 30, 32, 1)',
                        //shadowBlur: 10
                    },
                    emphasis:{
                        shadowColor: 'rgba(29, 30, 32, 1)',
                        shadowBlur: 10
                    }
                }
            }
        ];
    },
    setUrl:function () {//设置接口访问地址
        var that=this;
        var options=that.options;

        that.clearUrl();//清空接口地址

        options.url=localStorage.server_ip+'/api/Standard/PostServices';
    },
    clearUrl:function () {//清空接口地址
        var that=this;
        var options=that.options;

        options.url=null;
    },
    setParams:function (paramsName,Code) {//设置请求接口参数
        var that=this;
        var options=that.options;

        that.clearParams(paramsName);

        switch (paramsName){
            case 'GetAllOfMemberInfor':
                switch(options.geoLevel){
                    case 0:
                        options.params[paramsName]={_service: 'Monitor.Services.IMemberServices',
                            service_assembly: 'Monitor.Services',service_method: 'GetAllOfMemberInfor',
                            requstInfor: '{ "District": "All","ProvinceText":"广东省","CityText":"深圳市"}'
                        };
                        break;
                    case 11:
                    case 12:
                        options.params[paramsName]={_service: 'Monitor.Services.IMemberServices',
                            service_assembly: 'Monitor.Services',service_method: 'GetAllOfMemberInfor',
                            requstInfor: '{ "District": "Province","ProvinceText":"'+options.provinceName+'","CityText":"深圳市"}'

                        };
                        break;
                    case 2:
                        options.params[paramsName]={_service: 'Monitor.Services.IMemberServices',
                            service_assembly: 'Monitor.Services',service_method: 'GetAllOfMemberInfor',
                            requstInfor: '{ "District": "City","ProvinceText":"'+options.provinceName+'","CityText":"'+options.chineseName+'"}'

                        };
                        break;
                }
                break;
            case 'GetMemberInforByCode':
                // Code='CCWY';
                switch(options.geoLevel){
                    case 0:
                        options.params[paramsName]={_service: 'Monitor.Services.IMemberServices',
                            service_assembly: 'Monitor.Services',service_method: 'GetMemberInforByCode',
                            requstInfor: '{ "District": "All","ProvinceText":"广东省","CityText":"深圳市","Code":"'+Code+'"}'
                        };
                        break;
                    case 11:
                    case 12:
                        options.params[paramsName]={_service: 'Monitor.Services.IMemberServices',
                            service_assembly: 'Monitor.Services',service_method: 'GetMemberInforByCode',
                            requstInfor: '{ "District": "Province","ProvinceText":"'+options.provinceName+'","CityText":"深圳市","Code":"'+Code+'"}'

                        };
                        break;
                    case 2:
                        options.params[paramsName]={_service: 'Monitor.Services.IMemberServices',
                            service_assembly: 'Monitor.Services',service_method: 'GetMemberInforByCode',
                            requstInfor: '{ "District": "City","ProvinceText":"'+options.provinceName+'","CityText":"'+options.chineseName+'","Code":"'+Code+'"}'

                        };
                        break;
                }
                break;
            case 'IAlarmServices':
                options.params[paramsName]={_service: 'Monitor.Services.IAlarmServices',
                    service_assembly: 'Monitor.Services',service_method: 'GetAlarmMessage'
                };
                break;
            case 'ISetOrGetMemberCacheServices':
                options.params[paramsName]={_service: 'Monitor.Services.ISetOrGetMemberCacheServices',
                    service_assembly: 'Monitor.Services',service_method: 'GetMemberInfor',
                    requstInfor:{
                        Code:'CAPM'
                    }
                }
                break;
        }
    },
    clearParams:function (paramsName) {//清空请求接口参数
        var that=this;
        var options=that.options;

        options.params[paramsName]=null;
    },
    toJson:function (data) {//将字符串转换成json对象
        return JSON.parse(data);
    },
    toLowerCase:function (str) {//将字符串转换成效写
        if(str==null||str==undefined){
            return '';
        }

        return str.toString().toLowerCase();
    },
    checkString:function (str) {//验证是否为null或undefined，并对其进行转换
        if(str==null||str==undefined){
            str='无';
        }

        return str;
    },
    convertData:function (data) {//拼接报警数据和地图数据
        var that=this;
        var options=that.options;

        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = options.geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value,data[i].region,data[i].Code,data[i].ParentCode,data[i].tipAddress)
                });
            }
        }
        return res;
    },
    setGeoName:function(chineseGeoName){//获取地图点中区域的拼音名字
        var that=this;
        var options=that.options;

        that.setChineseName(chineseGeoName);

        switch(options.geoLevel){
            case 0:
                that.setProvinceName(chineseGeoName);

                for(var i=0;i<provinceNameArrLen;i++){
                    if(chineseGeoName.indexOf(provinceNameArr[i].chineseName)>=0){
                        return provinceNameArr[i].EnglishName;
                    }
                }
                break;
            case 11:
                //获取到相关省的城市数据
                var cityNameDetail=cityNameData['cityName_'+options.option.geo.map];
                for(var item in cityNameDetail){
                    if(item==chineseGeoName){
                        return cityNameDetail[item];
                    }
                }
                break;
            default:
                return "china";
                break;
        }
    },
    setChineseName:function (name) {//存储当前地图的中文名
        var that=this;
        var options=that.options;

        options.chineseName=name;
    },
    setMemberName:function (name) {//存储当前加盟商名字
        var that=this;
        var options=that.options;

        options.MemberName=name;
    },
    setProvinceName:function (name) {//存储省的中文名
        var that=this;
        var options=that.options;

        switch(name){
            case "北京直辖市":
                options.provinceName='北京';
                break;
            case "天津直辖市":
                options.provinceName='天津';
                break;
            case "上海直辖市":
                options.provinceName='上海';
                break;
            case "重庆直辖市":
                options.provinceName='重庆';
                break;
            default:
                options.provinceName=name;
                break;
        }
    },
    setTitleInfoName:function () {//设置标题地名
        var that=this;
        var options=that.options;
        var strTitleInfoName=options.chineseName;

        if(options.titleMemberName!=null&&options.titleMemberName.length>0){
            $(options.titleMemberName).text(options.MemberName);
        }

        if(options.titleInfoName!=null){
            if(strTitleInfoName.indexOf('直辖市')>0){
                strTitleInfoName=strTitleInfoName.substring(0,strTitleInfoName.indexOf('直辖市'))+'市';
            }

            if(strTitleInfoName.indexOf('_1')>0){
                strTitleInfoName=strTitleInfoName.substring(0,strTitleInfoName.indexOf('_1'));
            }

            if(strTitleInfoName!='联盟伙伴'&&$(options.titleMemberName).text().trim()!=''){
                // strTitleInfoName='·'+strTitleInfoName;
                strTitleInfoName=''+strTitleInfoName;
            }

            if(strTitleInfoName=='联盟伙伴'&&$(options.titleMemberName).text().trim()!=''){
                // strTitleInfoName='·'+'全国';
                strTitleInfoName=''+'全国';
            }

            $(options.titleInfoName).text(strTitleInfoName);
        }
    },
    setPrevGeoMap:function (isRemove) {//设置前一个地图名称
        var that=this;
        var options=that.options;

        if(!isRemove){
            options.prevGeoMap.unshift(options.option.geo.map);
        }else{
            return options.prevGeoMap.shift();
        }

    },
    getData:function (resultData) {//获取所有数据
        var that=this;
        var options=that.options;
        var resultDataLength=resultData.length;
        var arrData=[];
        var arrGeoCoorMap={};

        for(var i=0;i<resultDataLength;i++){
            var temp_data={name:resultData[i].Name,value:resultData[i].Level,region:{
                ProvinceText:resultData[i].ProvinceText,
                CityText:resultData[i].CityText
            },Code:resultData[i].Code,ParentCode:that.checkString(resultData[i].ParentCode)};
            var tempParentName=that.checkString(resultData[i].ParentName);

            if(tempParentName==''||tempParentName=='无'){
                temp_data.tipAddress=temp_data.region.ProvinceText+temp_data.region.CityText;
            }else{
                temp_data.tipAddress=tempParentName;
            }

            arrData.push(temp_data);
            arrGeoCoorMap[resultData[i].Name]=[resultData[i].Longitude,resultData[i].Latitude];
        }
        that.setData(arrData);//设置加盟商、项目和网点数据
        that.setGeoCoordMap(arrGeoCoorMap);//设置地图数据

        // console.log(that.convertData(options.data));

        var normalData=that.convertData(options.data);
        var warnData=[];
        var warningData=[];

        that.setSeries(normalData,warnData,warningData);;//设置系列列表
    },
    setGeoLevel:function () {//设置地图层级
        var that = this;
        var options = that.options;

        if(options.chineseName.indexOf('省')>=0||options.chineseName.indexOf('自治区')>=0){
            options.geoLevel=11;
            return;
        }

        if(options.chineseName.indexOf('直辖市')>=0||options.chineseName.indexOf('北京')>=0||options.chineseName.indexOf('天津')>=0||options.chineseName.indexOf('上海')>=0||options.chineseName.indexOf('重庆')>=0){
            options.geoLevel=12;
            return;
        }

        if((options.chineseName.indexOf('市')>=0||options.chineseName.indexOf('自治州')>=0||options.chineseName.indexOf('自治县')>=0||options.chineseName.indexOf('县_1')>=0
            ||options.chineseName.indexOf('林区')>=0||options.chineseName.indexOf('地区')>=0||options.chineseName.indexOf('兴安盟')>=0||options.chineseName.indexOf('锡林郭勒盟')>=0||options.chineseName.indexOf('阿拉善盟')>=0)
            &&options.chineseName.indexOf('直辖市')<0){
            options.geoLevel=2;
            return;
        }

    },
    setIsSort:function () {//设置是否对加盟商信息进行筛选
        var that=this;
        var options=that.options;

        options.isSort=!options.isSort;
    },
    setClickLock:function (lockName) {//设置点击事件锁
        var that=this;
        var options=that.options;

        options.clickLock[lockName]=!options.clickLock[lockName];
    },
    completeRegisterMap:function(areaName,resultData) {//注册地图
        var that=this;
        var options=that.options;

        $.get(options.geoPath+areaName+'.json', function (chinaJson)
        {
            echarts.registerMap(areaName, chinaJson);

            if(resultData!=undefined&&resultData!=null){
                that.getData(resultData);//获取加盟商数据
            }

            options.ele.clear();//清空当前实例，会移除实例中所有的组件和图表
            options.option.geo.map=areaName;
            options.option.geo.regions=that.setRegions(chinaJson);//设置区域颜色
            options.ele.setOption(options.option);
            that.setBackBtnStatus();
            that.setClickLock('click');//设置点击事件锁
            that.setSaveWarnDataStatus(true);//设置获取警告数据状态
            that.getIAarmData('IAlarmServices');//获取报警数据
        });
    },
    setRegions:function (regionsJson) {//设置区域颜色
        var colors=['#083967','#13548d','#1c74b2'];
        var colorsLen=colors.length;
        var features=regionsJson.features;
        var echatsRegions=[{
            name: '南海诸岛',
            value: 0,
            itemStyle: {
                normal: {
                    opacity: 0,
                    label: {
                        show: false
                    }
                }
            }
        }];

        for(var i=0,len=features.length;i<len;i++){
            var regionsItem={
                name:features[i].properties.name,
                itemStyle: {
                    normal: {
                        areaColor: colors[Math.floor(Math.random()*colorsLen)]
                    },
                }
            };
            echatsRegions.push(regionsItem);
        }

        return echatsRegions;
    },
    loadMap:function(maps,paramsName,Code){//修改地图
        var that=this;
        var options=that.options;

        if(maps=='china'||maps==undefined || maps==null)
        {
            maps='china';
            // options.chineseName='联盟伙伴';
            options.chineseName='全国';
            options.geoLevel=0;
        }

        that.setTitleInfoName();//设置标题地名
        that.setUrl();//设置接口访问地址
        if(Code!=undefined){
            that.setParams(paramsName,Code);//设置请求接口参数
        }else{
            that.setParams(paramsName);//设置请求接口参数
        }


        if('china'==maps){
            // console.log(options.params[paramsName]);
            ajaxCall(options.url,options.params[paramsName],function (data) {
                //报警数据
                data=that.toJson(data);
                console.log(data);
                var resultCode=data.Code;
                var resultData=data.Data;

                if(resultCode==200){
                    if(resultData!=undefined&&resultData!=null){
                        that.getData(resultData);//获取加盟商数据
                    }

                    options.ele.clear();//清空当前实例，会移除实例中所有的组件和图表
                    options.option.geo.map=maps;//配置echarts参数
                    options.option.geo.regions=that.setRegions(china);//设置区域颜色
                    options.ele.setOption(options.option);
                    that.setBackBtnStatus();
                    that.setClickLock('click');//设置点击事件锁
                    that.setSaveWarnDataStatus(true);//设置获取警告数据状态
                    that.getIAarmData('IAlarmServices');//获取报警数据
                }else{
                    console.log(data.Message);
                }
            });
        }else{
            ajaxCall(options.url,options.params[paramsName],function (data) {
                //报警数据
                data=that.toJson(data);
                console.log(data);
                var resultCode=data.Code;
                var resultData=data.Data;

                if(resultCode==200){
                    that.completeRegisterMap(maps,resultData);
                }else{
                    console.log(data.Message);
                }
            });
        }

    },
    initWarnAnimate:function () {//初始化告警和预警数据数据交互动画
        var that=this;
        var options=that.options;
        var WarnAmountCon=options.WarnAnimate.WarnAmountCon;
        var WarningAmountCon=options.WarnAnimate.WarningAmountCon;

        WarnAmountCon.SetWarnAnimate=new setWarnAnimate(0,{ele:WarnAmountCon.ele,id:WarnAmountCon.id});
        WarningAmountCon.SetWarnAnimate=new setWarnAnimate(0,{ele:WarningAmountCon.ele,id:WarningAmountCon.id});
    },
    setWarnData:function (AlarmItems,AlarmItemsLen,AlertItems,AlertItemsLen) {//设置警告数据
        var that=this;
        var options=that.options;
        var AlarmData=options.WarnData.AlarmData;
        var AlertData=options.WarnData.AlertData;

        AlarmData.data=AlarmItems;
        AlarmData.len=AlarmItemsLen;
        AlertData.data=AlertItems;
        AlertData.len=AlertItemsLen;
    },
    setSaveWarnDataStatus:function (flag) {//设置获取警告数据状态
        var that=this;
        var options=that.options;

        options.WarnData.isFirst=flag;
    },
    isEqualWarnData:function (AlarmItems,AlarmItemsLen,AlertItems,AlertItemsLen) {//判断每次获取的警告数据有没有变化
        var that=this;
        var options=that.options;
        var AlarmData=options.WarnData.AlarmData;
        var AlertData=options.WarnData.AlertData;
        var flag=0;

        if(AlarmItemsLen!=AlarmData.len){
            flag-=1;
        }else{
            if(AlarmItemsLen>0&&AlarmData.data[0].ManagementCode!=AlarmItems[0].ManagementCode){
                flag-=1;
            }
        }

        if(AlertItemsLen!=AlertData.len){
            flag-=1;
        }else{
            if(AlertItemsLen>0&&AlertData.data[0].ManagementCode!=AlertItems[0].ManagementCode){
                flag-=1;
            }
        }

        return (flag==0);
    },
    setIAlarmShow:function (resultData,timerName) {//设置显示警报信息
        var that=this;
        var options=that.options;
        var WarnAmountCon=options.WarnAnimate.WarnAmountCon;
        var WarningAmountCon=options.WarnAnimate.WarningAmountCon;
        var warnInfoMasker=options.warnInfoMasker;
        var normalData=that.convertData(options.data);
        var warnData=[];
        var warningData=[];
        var normalDataLen=normalData.length;
        var AlarmItems=resultData.AlarmItems;
        var AlarmItemsLen=AlarmItems.length;
        var AlertItems=resultData.AlertItems;
        var AlertItemsLen=AlertItems.length;

        if(warnInfoMasker.isFirst){
            that.warnInfoMaskerShow(resultData);//{//显示报警弹窗
        }

        if(options.WarnData.isFirst){
            that.setWarnData(AlarmItems,AlarmItemsLen,AlertItems,AlertItemsLen);//设置警告数据
            that.setSaveWarnDataStatus(false);//设置获取警告数据状态
        }else{
            if(that.isEqualWarnData(AlarmItems,AlarmItemsLen,AlertItems,AlertItemsLen)){//判断每次获取的警告数据有没有变化
                that.getIAarmData('ISetOrGetMemberCacheServices');//获取报警数据
                return;
            }else{
                that.setWarnData(AlarmItems,AlarmItemsLen,AlertItems,AlertItemsLen);//设置警告数据
            }
        }

        console.log("控制刷新成功");
        console.log(resultData);

        WarnAmountCon.SetWarnAnimate.getWarnNum(resultData.AlarmCount);//设置告警数量
        WarningAmountCon.SetWarnAnimate.getWarnNum(resultData.AlartCount);//设置预警数量

        if(options.isSort||options.geoLevel!=0){
            for(var i=0;i<normalDataLen;i++){
                for(var j=0;j<AlarmItemsLen;j++){
                    // j==1&&(AlarmItems[j].ManagementCode='ORG131987161');
                    if(that.toLowerCase(AlarmItems[j].ManagementCode)==that.toLowerCase(normalData[i].value[4])){
                        warnData.push(normalData[i]);
                    }
                }
                for(var j=0;j<AlertItemsLen;j++){
                    if(that.toLowerCase(AlertItems[j].ManagementCode)==that.toLowerCase(normalData[i].value[4])){
                        warningData.push(normalData[i]);
                    }
                }
            }
        }else{
            if(resultData.Result==undefined||resultData.Result==null){
                return;
            }
            var result=resultData.Result;
            var resultLen=result.length;

            for(var i=0;i<resultLen;i++){
                for(var j=0;j<normalDataLen;j++){
                    // result[i].MemberCode='CAPM';
                    if(that.toLowerCase(result[i].MemberCode)==that.toLowerCase(normalData[j].value[4])){
                        result[i].AlarmCount>0&&warnData.push(normalData[j]);
                        result[i].AlertCount>0&&warningData.push(normalData[j]);
                    }
                }
            }
        }
        // console.log(resultData);
        // console.log(JSON.stringify(warnData[0])+':'+warningData.join());
        that.setSeries(normalData,warnData,warningData);;//设置系列列表
        options.ele.setOption(options.option);
        that.getIAarmData('ISetOrGetMemberCacheServices');//获取报警数据
    },
    setIAlarmShowByColumn:function (resultData,strWarnID,timerName) {//展示由栏目要求显示的信息
        var that=this;
        var options=that.options;
        var WarnDataByColumn=options.WarnDataByColumn;
        var warnInfoMasker=options.warnInfoMasker;

        if(resultData==undefined||resultData==null){
            return;
        }

        if(WarnDataByColumn.isFirst){
            WarnDataByColumn.WarnId=strWarnID;//存储栏目传过来的告警Id
            WarnDataByColumn.Code=resultData.Code;//存储栏目传过来的告警数据

            WarnDataByColumn.isFirst=false;//设置获取栏目传过来的警告数据状态
        }else{
            if(WarnDataByColumn.WarnId==resultData.WarnId){//判断由栏目中传过来的告警数据是不是有变化
                that.getIAarmData('IAlarmServices');
                return;
            }else{
                WarnDataByColumn.WarnId=strWarnID;//存储栏目传过来的告警Id
                WarnDataByColumn.Code=resultData.Code;//存储栏目传过来的告警数据
            }
        }

        console.log("控制刷新成功");

        that.clearTimer('IAlarmServices');//清除定时器
        options.prevGeoMap=['china']//设置前一个地图名称
        options.geoLevel=0;
        var ProvinceText=resultData.ProvinceText;
        var map='';

        if(ProvinceText.indexOf('省')>=0||ProvinceText.indexOf('自治区')>=0){
            options.prevGeoMap.unshift(that.setGeoName(resultData.ProvinceText));
            options.option.geo.map=that.setGeoName(resultData.ProvinceText);
            options.geoLevel=11;
            options.chineseName=resultData.CityText;
            map=that.setGeoName(resultData.CityText);
        }else{
            options.chineseName=ProvinceText;
            map=that.setGeoName(resultData.ProvinceText);
        }

        that.setGeoPath(false);//设置地图json数据的路径
        that.setGeoLevel();//设置地图层级
        options.clickLock['click']=true;
        warnInfoMasker.isFirst=true;//设置显示弹窗的开关为true，表示可以显示

        that.loadMap(map,'GetMemberInforByCode',resultData.ParentCode);//修改地图
    },
    warnInfoMaskerShow:function (resultData) {//显示报警弹窗
        var that=this;
        var options=that.options;
        var warnInfoMasker=options.warnInfoMasker;
        var WarnDataByColumn=options.WarnDataByColumn;
        var AlarmItems=resultData.AlarmItems;
        var AlarmItemsLen=AlarmItems.length;
        var AlertItems=resultData.AlertItems;
        var AlertItemsLen=AlertItems.length;

        if(WarnDataByColumn.Code!=null){
            for(var i=0;i<AlarmItemsLen;i++){
                if(that.toLowerCase(AlarmItems[i].ManagementCode)==that.toLowerCase(WarnDataByColumn.Code)&&AlarmItems[i].Id==WarnDataByColumn.WarnId){
                    $(warnInfoMasker.title).text('告警信息');
                    var str=' <p class="clear"><span class="fl">所 在 地：</span><span class="fl">'+that.checkString(AlarmItems[i].ProjectName)+'</span></p>'
                    +'<p class="clear"><span class="fl">告警类型：</span><span class="fl">告警</span></p>'
                    +'<p class="clear"><span class="fl">告警模块：</span><span class="fl">'+that.checkString(AlarmItems[i].TargetType)+'</span></p>'
                    +'<p class="clear"><span class="fl">告警内容：</span><span class="fl">'+that.checkString(AlarmItems[i].PushDesc)+'</span></p>';
                    // +'<p class="clear"><span class="fl">责 任 人 ：</span><span class="fl">'+that.checkString(AlarmItems[i].Attention)+'</span></p>'
                    // +'<p class="clear"><span class="fl"> 联系方式：</span><span class="fl">'+that.checkString(AlarmItems[i].AttentionPhone)+'</span></p>';
                    $(warnInfoMasker.con).html(str);
                }
            }

            for(var i=0;i<AlertItemsLen;i++){
                if(that.toLowerCase(AlertItems[i].ManagementCode)==that.toLowerCase(WarnDataByColumn.Code)&&AlertItems[i].Id==WarnDataByColumn.WarnId){
                    $(warnInfoMasker.title).text('预警信息');
                    var str=' <p class="clear"><span class="fl">所 在 地：</span><span class="fl">'+that.checkString(AlertItems[i].ProjectName)+'</span></p>'
                        +'<p class="clear"><span class="fl">告警类型：</span><span class="fl">预警</span></p>'
                        +'<p class="clear"><span class="fl">告警模块：</span><span class="fl">'+that.checkString(AlertItems[i].TargetType)+'</span></p>'
                        +'<p class="clear"><span class="fl">告警内容：</span><span class="fl">'+that.checkString(AlertItems[i].PushDesc)+'</span></p>';
                        // +'<p class="clear"><span class="fl">责 任 人 ：</span><span class="fl">'+that.checkString(AlertItems[i].Attention)+'</span></p>'
                        // +'<p class="clear"><span class="fl"> 联系方式：</span><span class="fl">'+that.checkString(AlertItems[i].AttentionPhone)+'</span></p>';
                    $(warnInfoMasker.con).html(str);
                }
            }

            $(warnInfoMasker.masker).show();
        }

        warnInfoMasker.isFirst=false;
    },
    getIAarmData:function (timerName) {//获取报警数据
        var that=this;
        var options=that.options;

        that.clearTimer(timerName);//清除定时器
        that.setUrl();//设置接口访问地址
        that.setParams(timerName);//设置请求接口参数

        options.timer[timerName]=setTimeout(function () {
            ajaxCall(options.url,options.params[timerName],function (data) {
                var data=that.toJson(data);

                switch (timerName){
                    case 'IAlarmServices':
                        if(data.Code==200){
                            that.setIAlarmShow(data.Data,timerName);//设置显示警报信息
                        }else{
                            console.log(data.Message);
                        }

                        break;
                    case 'ISetOrGetMemberCacheServices':
                        if(data.Code==200){
                            var strWarnID=data.Message.toString().split('#');//"success#372f1c48-a390-4e58-9a41-b367c113bb69"

                            if(strWarnID.length>=2){
                                strWarnID=strWarnID[1];
                            }

                            that.setIAlarmShowByColumn(data.Data,strWarnID,timerName);//展示由栏目要求显示的信息
                        }else{
                            that.getIAarmData('IAlarmServices');
                            // console.log(data.Message);
                        }
                        break;
                }

            });
        },iLongTime);
    },
    clearTimer:function (timerName) {//清除定时器
        var that=this;
        var options=that.options;

        clearTimeout(options.timer[timerName]);
    },
    openPanorama:function (x,y){//打开百度地图全景图
        var map = new BMap.Map('main');
        map.centerAndZoom(new BMap.Point(114.048865,22.564269), 12);
        map.addTileLayer(new BMap.PanoramaCoverageLayer());

        var panorama = new BMap.Panorama('main');
        panorama.setPov({heading: -40, pitch: 6});
        panorama.setPosition(new BMap.Point(x,y)); //根据经纬度坐标展示全景图
    },
    dblclick:function () {//地图区域双击事件 -> 用于查看省市地图信息
        var that=this;
        var options=that.options;

        options.ele.on('dblclick',function (params) {
            if(params.componentType=="series"||options.clickLock['click']){
                return;
            }

            console.log(params);

            var mapName=that.setGeoName(params.name);//获取当前地图对应的英文或数字编码

            that.clearTimer('IAlarmServices');//清除定时器
            that.setPrevGeoMap(false);//设置前一个地图名称
            that.setGeoPath(false);//设置地图json数据的路径
            that.setGeoLevel();//设置地图层级
            that.setClickLock('click');//设置点击事件锁

            if(options.isSort){
                that.loadMap(mapName,'GetMemberInforByCode',options.sortCode); //修改地图
            }else{
                that.loadMap(mapName,'GetAllOfMemberInfor'); //修改地图
            }
        });
    },
    click:function () {//单击加盟商总部、项目和网点，筛选出该加盟上下的所有项目和网点
        var that=this;
        var options=that.options;

        options.ele.on('click',function (params) {
            if(params.componentType=="geo"||options.clickLock['click']){
                return;
            }

            console.log(params);
            that.clearTimer('IAlarmServices');//清除定时器
            that.setClickLock('click');//设置点击事件锁

            if(!options.isSort){
                if(options.geoLevel==0){
                    options.sortCode=params.value[4];
                }else{
                    options.sortCode=params.value[5]=='无'?"ccpg":params.value[5];
                }

                if(params.value[2]==0){
                    that.setMemberName(params.name);//存储当前加盟商名字
                }else{
                    that.setMemberName(params.value[6]);//存储当前加盟商名字
                }

                that.loadMap(options.option.geo.map,'GetMemberInforByCode',options.sortCode);
            }else{
                that.setMemberName('');//存储当前加盟商名字

                that.loadMap(options.option.geo.map,'GetAllOfMemberInfor');
            }

            that.setIsSort();//设置是否对加盟商信息进行筛选
        });
    },
    backBtnClick:function () {//返回按钮点击事件
        var that=this;
        var options=that.options;

        options.backBtn.on('click',function () {
            if(options.isBackBtn){
                switch(options.geoLevel){
                    case 0:
                        options.geoLevel=0;
                        break;
                    case 11:
                    case 12:
                        options.geoLevel=0;
                        break;
                    case 2:
                        options.chineseName=options.provinceName;
                        options.geoLevel=11;
                        break;
                }

                that.clearTimer('IAlarmServices');//清除定时器
                that.setGeoPath(true);//设置地图json数据的路径
                options.clickLock['click']=true;

                if(options.isSort){
                    that.loadMap(that.setPrevGeoMap(true),'GetMemberInforByCode',options.sortCode); //修改地图
                }else{
                    that.loadMap(that.setPrevGeoMap(true),'GetAllOfMemberInfor'); //修改地图
                }
            }
        });
    },
    lockBackBtn:function () {//锁定返回按钮
        var that=this;
        var options=that.options;

        options.backBtn.removeClass('back_btn_unlock');
        options.isBackBtn=false;
    },
    unlockBackBtn:function () {//解除返回按钮锁定状态
        var that=this;
        var options=that.options;

        options.backBtn.addClass('back_btn_unlock');
        options.isBackBtn=true;
    },
    setBackBtnStatus:function () {//设置返回按钮状态
        var that=this;
        var options=that.options;

        switch(options.geoLevel){
            case 0:
                that.lockBackBtn();
                break;
            case 11:
            case 12:
            case 2:
                that.unlockBackBtn();
                break;
        }
    }
};
/*首页地图操作*/
/*关闭弹窗事件*/
function hideMakser(id) {
    $(id).hide();
}
/*关闭弹窗事件*/






/**
 * Created by Tim on 2016/7/1.
 */
"use strict";
/*======测试环境变量=======*/
//http://192.168.2.215
//http://192.168.2.148:8080
// localStorage.server_ip ='http://192.168.2.217';
localStorage.server_ip ='http://192.168.2.216';
// localStorage.server_ip ='http://192.168.2.215';
//localStorage.server_ip = 'http://localhost:62610/';
// localStorage.server_ip ='http://192.168.2.104:62610';
// localStorage.server_ip ='http://192.168.2.23';
/*======测试环境变量=======*/
/*======生产环境变量=======*/
// localStorage.server_ip ="http://112.95.151.110";
/*======生产环境变量=======*/
/*请求接口的定时时长*/
/*请求接口的定时时长*/
var iLongTime=3000;
/*ajax请求*/
function ajaxCall(url,params,callback,errorCallback){
    try{
        $.ajax({
            url:url,
            data:params,
            cache:false,
            type:'post',
            dataType:'json',
            success:function (data){
                callback(data);
            }, error: function (xmlHttpRequest, textStatus, errorThrown) {
                errorCallback;
                console.log("3=" + errorThrown + textStatus + xmlHttpRequest);
            }
        });
    }catch(e){
        console.log(e);
    }
}
/*ajax请求*/
/*验证一应智能监控平台-前台登录状态*/
function checkLoginStatus(strGoToPage) {
    var strLoginStatus=localStorage.loginStatus;//获取登录状态值
    var isLogin=false;

    if(strLoginStatus!=null&&strLoginStatus!=undefined&&strLoginStatus=='已登录'){
        isLogin=true;
    }else{
        localStorage.goToPage=strGoToPage;//设置回调跳转的页面值
        isLogin=false;
    }
    
    return isLogin;
}
/*验证一应智能监控平台-前台登录状态*/
/*跳转到一应智能监控平台-前台登录页*/
function goToLogin() {
    setTimeout(function () {
        // window.location.href='login.html';
        window.location.href=localStorage.server_ip+'/StaticPage/login.html';
    },500)
}
/*跳转到一应智能监控平台-前台登录页*/
/*切换屏监测事件*/
var switchMonitorScreen=function (options) {
    var that=this;
    
    that.options={
        sreenName:'',//当前显示的监控屏名称
        screenCode:'',//当前显示的监控屏编码
        url:null,//接口地址
        params:{},//请求接口的参数
        timer:{}//定时器
    };

    for(var item in options){
        that.options[item]=options[item];
    }

    that.init();
};
switchMonitorScreen.prototype={
    init:function () {
        var that=this;
        var options=that.options;

        if(!that.isExistScreen()){
            return;
        }

        that.loadNewUrlInfor();//加载新的地址信息
    },
    isExistScreen:function () {//验证当前显示的监控屏名称是否存在
        var that=this;
        var options=that.options;
        var isExist=true;

        if(options.sreenName==undefined||options.sreenName==null||options.sreenName==''){
            isExist=false;
        }

        return isExist;
    },
    toJson:function (data) {//将字符串转换成json对象
        return JSON.parse(data);
    },
    checkString:function (str) {//验证是否为null或undefined，并对其进行转换
        if(str==null||str==undefined){
            str='无';
        }

        return str;
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
    setParams:function (paramsName) {//设置请求接口参数
        var that=this;
        var options=that.options;

        that.clearParams(paramsName);

        switch(paramsName){
            case 'GetUrlInfor':
                options.params[paramsName]={
                    _service: 'Monitor.Services.IGetUrlCacheServices',
                    service_assembly: 'Monitor.Services',service_method: 'GetUrlInfor'
                }
                break;
        }
    },
    clearParams:function (paramsName) {//清空请求接口参数
        var that=this;
        var options=that.options;

        options.params[paramsName]=null;
    },
    clearTimer:function (timerName) {//清除定时器
        var that=this;
        var options=that.options;

        clearTimeout(options.timer[timerName]);
    },
    isContain:function (screenUrl) {//判断换屏地址中是否包含当前显示的监控屏名称
        var that=this;
        var options=that.options;
        var flag=true;

        if(screenUrl.toString().indexOf(options.sreenName)<0){
            flag=false;
        }

        if(options.sreenName=='index'){
            var arrScreenUrl=screenUrl.toString().split(options.sreenName);

            //console.log(arrScreenUrl[1].toString().charAt(0));
            arrScreenUrl[1].toString().charAt(0)!='.'&&(flag=false);
        }

        return flag;
    },
    gotoNewPage:function (screenUrl) {//跳转新页面
        window.setTimeout(function () {
            window.location.href=localStorage.server_ip+screenUrl;
        },500);
    },
    loadNewUrlInfor:function () {//加载新的地址信息
        var that=this;
        var options=that.options;
        var paramName='GetUrlInfor';

        that.clearTimer(paramName);//清除定时器
        that.setUrl();//设置接口访问地址
        that.setParams(paramName);//设置请求接口参数

        options.timer[paramName]=setTimeout(function () {
            ajaxCall(options.url,options.params[paramName],function (data) {
                data=that.toJson(data);
                var resultData=data.Data;
                // console.log(options.params[paramName]);
                // console.log(data);
                if(data.Code==200){
                    switch(options.screenCode){
                        case 'Map':
                            if(!that.isContain(resultData.BigMapUrl)){//判断换屏地址中是否包含当前显示的监控屏名称
                                that.gotoNewPage(resultData.BigMapUrl);//跳转新页面
                            }else{
                                that.loadNewUrlInfor();//加载新的地址信息
                            }
                            break;
                        case 'First':
                            if(!that.isContain(resultData.FirstScreenUrl)){//判断换屏地址中是否包含当前显示的监控屏名称
                                that.gotoNewPage(resultData.FirstScreenUrl);//跳转新页面
                            }else{
                                that.loadNewUrlInfor();//加载新的地址信息
                            }
                            break;
                        case 'Second':
                            if(!that.isContain(resultData.SecondScreenUrl)){//判断换屏地址中是否包含当前显示的监控屏名称
                                that.gotoNewPage(resultData.SecondScreenUrl);//跳转新页面
                            }else{
                                that.loadNewUrlInfor();//加载新的地址信息
                            }
                            break;
                        case 'Three':
                            if(!that.isContain(resultData.ThreeScreenUrl)){//判断换屏地址中是否包含当前显示的监控屏名称
                                that.gotoNewPage(resultData.ThreeScreenUrl);//跳转新页面
                            }else{
                                that.loadNewUrlInfor();//加载新的地址信息
                            }
                            break;
                        case 'Four':
                            if(!that.isContain(resultData.FourScreenUrl)){//判断换屏地址中是否包含当前显示的监控屏名称
                                that.gotoNewPage(resultData.FourScreenUrl);//跳转新页面
                            }else{
                                that.loadNewUrlInfor();//加载新的地址信息
                            }
                            break;
                    }
                }else{
                    that.loadNewUrlInfor();//加载新的地址信息
                    console.log(data.Message);
                }
            },that.loadNewUrlInfor());
        },iLongTime);
    }
}
/*切换屏监测事件*/
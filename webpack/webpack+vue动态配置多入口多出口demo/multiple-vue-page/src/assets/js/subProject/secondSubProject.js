/**
 * Created by Tim on 2016/7/12.
 */
"use strict";
/*视频标题的点击事件*/
function monitorVideoTitleClick(obj) {
    var uri=$(obj).attr('data-value');

    if(oSetMonitorVideo!=undefined||oSetMonitorVideo!=null){
        oSetMonitorVideo.SetVideoUri(uri);//设置选择的视频信息
    }
}
/*视频标题的点击事件*/
/*设置视频监控信息*/
var setMonitorVideo=function (options) {
    var that=this;

    that.options={
        videoCombination:[],//视频组合数据
        ManagementCode:'',//具体项目编号
        monitorVideoAddress:null,//监控视频所在地址
        monitorVideoList:null,//监控视频列表
        url:null,//接口地址
        monitorVideoUri:'',//点击的视频路径
        params:{},//请求接口的参数
        monitorVideoData:{//监控视频数据
            isFirst:true,
            monitorVideo:[]
        },
        timer:{}//定时器
    };

    for(var item in options){
        that.options[item]=options[item];
    }

    that.init();
}

setMonitorVideo.prototype={
    init:function() {
        var that=this;
        var options=that.options;

        if((!that.isExistObject(options.monitorVideoAddress))||(!that.isExistObject(options.monitorVideoList))){
            return;
        }

        that.loadMonitorVideo();
    },
    isExistObject:function (obj) {//验证对象是否存在
        var isExist=true;

        if(obj==undefined||obj==null||$(obj).length<=0){
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
    videoCombination:function () {//初始化视频组合数据
        var that=this;
        var options=that.options;

        that.videoCombination=[
            [{index:0,url:'rtsp://221.238.40.158:30118/h264'},{index:1,url:'rtsp://221.238.40.158:30120/h264'}],
            [{index:0,url:'rtsp://221.238.40.158:30118/h264'},{index:2,url:'rtsp://221.238.40.158:30122/h264'}],
            [{index:0,url:'rtsp://221.238.40.158:30118/h264'},{index:3,url:'rtsp://221.238.40.158:30124/h264'}],
            [{index:1,url:'rtsp://221.238.40.158:30120/h264'},{index:2,url:'rtsp://221.238.40.158:30122/h264'}],
            [{index:1,url:'rtsp://221.238.40.158:30120/h264'},{index:3,url:'rtsp://221.238.40.158:30124/h264'}],
            [{index:2,url:'rtsp://221.238.40.158:30122/h264'},{index:3,url:'rtsp://221.238.40.158:30124/h264'}]
        ]
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
            case 'GetCameraURL':
                options.params[paramsName]={
                    _service: 'Monitor.Services.ICameraDataService',
                    service_assembly: 'Monitor.Services',service_method: 'GetCameraURL',
                    cameraType:'PMV01'
                }
                break;
            case 'SetVideoUri':
                options.params[paramsName]={
                    _service: 'Monitor.Services.IVideoChoosedServices',
                    service_assembly: 'Monitor.Services',service_method: 'SetVideoUri',
                    st:0,
                    uri:options.monitorVideoUri
                }
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
    clearTimer:function (timerName) {//清除定时器
        var that=this;
        var options=that.options;

        clearTimeout(options.timer[timerName]);
    },
    loadMonitorVideo:function () {//获取监控视频
        var that=this;
        var options=that.options;
        var paramName='GetCameraURL';

        that.clearTimer(paramName);//清除定时器
        that.setUrl();//设置接口访问地址
        that.setParams(paramName);//设置请求接口参数

        options.timer[paramName]=setTimeout(function () {
            ajaxCall(options.url,options.params[paramName],function (data) {
                data=that.toJson(data);
                // console.log(options.params[paramName]);
                // console.log(data);
                if(data.Code==200){
                    that.setMonitorVideoShow(data.Data,data.Message,paramName);//设置显示监控视频
                }else{
                    // alert(data.Message);
                }
            });
        },iLongTime);
    },
    setMonitorVideoShow:function (resultData,message,paramName) {//设置显示监控视频
        var that=this;
        var options=that.options;
        var monitorVideoData=options.monitorVideoData;

        if(monitorVideoData.isFirst){
            that.setMonitorVideoData(resultData);//设置监控视频数据
            that.setMonitorVideoStatus(false);//设置获取监控视频数据状态
        }else{
            if(that.isEqualMonitorVideo(resultData)){
                that.loadMonitorVideo();//获取监控视频
                return;
            }else{
                that.setMonitorVideoData(resultData);//设置监控视频数据
            }
        }

        console.log("控制刷新成功");
        console.log(resultData);

        that.initMonitorVideoInfo(resultData,message);//初始化监控视频显示的信息
    },
    clearMonitorVideoAddress:function () {//清除监控视频标题信息
        var that=this;
        var options=that.options;

        $(options.monitorVideoAddress).html('');
    },
    clearMonitorVideoList:function () {//清除监控视频列表信息
        var that=this;
        var options=that.options;

        $(options.monitorVideoList).html('');
    },
    initMonitorVideoInfo:function (resultData,message) {//初始化监控视频显示的信息
        var that=this;
        var options=that.options;
        var monitorVideoData=options.monitorVideoData;
        var resultDataLen=resultData.length
        var strTitle='';
        var strMonitorVideo='';

        if(resultDataLen>0){
            var arrCameraInfo=that.checkString(resultData[0].CameraName).split('   ');

            var CameraName=arrCameraInfo[arrCameraInfo.length-1].toString();
            CameraName=CameraName.substr(CameraName.indexOf('：')+1);

            if(options.ManagementCode==''){
                that.clearMonitorVideoAddress();//清除监控视频标题信息
                strTitle='全国'+'停车场';
                $(options.monitorVideoAddress).html(strTitle);
            }

            that.clearMonitorVideoList();//清除监控视频列表信息

            for(var i=0;i<resultDataLen;i++){
                if(i>=4){
                    break;
                }
                // if(options.ManagementCode==''){
                //     switch(i){
                //         case 0:
                //             strMonitorVideo+='<li class="monitor_video_item fl"  onclick="monitorVideoTitleClick(this)" data-value="rtsp://221.238.40.158:30118/h264">';
                //             break;
                //         case 1:
                //             strMonitorVideo+='<li class="monitor_video_item fl"  onclick="monitorVideoTitleClick(this)" data-value="rtsp://221.238.40.158:30120/h264">';
                //             break;
                //         case 2:
                //             strMonitorVideo+='<li class="monitor_video_item fl"  onclick="monitorVideoTitleClick(this)" data-value="rtsp://221.238.40.158:30122/h264">';
                //             break;
                //         case 3:
                //             strMonitorVideo+='<li class="monitor_video_item fl"  onclick="monitorVideoTitleClick(this)" data-value="rtsp://221.238.40.158:30124/h264">';
                //             break;
                //     }
                // }else{
                //     if(i==0){strMonitorVideo+='<li class="monitor_video_item fl"  onclick="monitorVideoTitleClick(this)" data-value="rtsp://221.238.40.158:30120/h264">'}
                //     if(i==1){strMonitorVideo+='<li class="monitor_video_item fl"  onclick="monitorVideoTitleClick(this)" data-value="rtsp://221.238.40.158:30122/h264">'}
                //     if(i!=0&&i!=1){strMonitorVideo+='<li class="monitor_video_item fl"  onclick="monitorVideoTitleClick(this)" data-value="'+resultData[i].Url+'">'}
                // }
                strMonitorVideo+='<li class="monitor_video_item fl"  onclick="monitorVideoTitleClick(this)" data-value="'+resultData[i].Url+'">';
                strMonitorVideo+='<div class="monitor_video_con">'
                        +'<div class="monitor_video_masker"><img src="../images/no_monitor_image.png" class="dpb"></div>'
                        +'<div class="monitor_video">'
                            +'<object  type="application/x-vlc-plugin" events="True" pluginspage="http://www.videolan.org" codebase="http://downloads.videolan.org/vlc/last/vlc-2.2.2.tar.xz">';

                // if(options.ManagementCode==''){
                //     switch(i){
                //         case 0:
                //             strMonitorVideo +='<param name="mrl" value="rtsp://221.238.40.158:30118/h264" />';
                //             break;
                //         case 1:
                //             strMonitorVideo +='<param name="mrl" value="rtsp://221.238.40.158:30120/h264" />';
                //             break;
                //         case 2:
                //             strMonitorVideo +='<param name="mrl" value="rtsp://221.238.40.158:30122/h264" />';
                //             break;
                //         case 3:
                //             strMonitorVideo +='<param name="mrl" value="rtsp://221.238.40.158:30124/h264" />';
                //             break;
                //     }
                // }else{
                //     if(i==0){strMonitorVideo +='<param name="mrl" value="rtsp://221.238.40.158:30120/h264" />'}
                //     if(i==1){strMonitorVideo +='<param name="mrl" value="rtsp://221.238.40.158:30122/h264" />'}
                //     if(i!=0&&i!=1){strMonitorVideo +='<param name="mrl" value="'+resultData[i].Url+'" />'}
                // }

                strMonitorVideo +='<param name="mrl" value="'+resultData[i].Url+'" />';

                strMonitorVideo +='<param name="volume" value="50" />'
                                +'<param name="autoplay" value="true" />'
                                +'<param name="loop" value="false" />'
                                +'<param name="fullscreen" value="true" />'
                            +'</object>'
                        +'</div>'
                    +'</div>'
                    +'<p class="monitor_video_title">'+CameraName+'</p>'
               + '</li>';
            }

            if(resultDataLen<4){
                for(var i=resultDataLen;i<4;i++){
                    strMonitorVideo+='<li class="monitor_video_item fl">'
                        +'<div class="no_monitor_image">'
                            +'<img src="../images/no_monitor_image.png" class="dpb">'
                        +'</div>'
                       + '<p class="monitor_video_title">暂无监控视频</p>'
                    +'</li>';
                }
            }

            $(options.monitorVideoList).html(strMonitorVideo);
            $(options.monitorVideoList).find('object').css({width:'100%',height:'100%'});
        }
        
        that.setTitle();//设置标题
    },
    setTitle:function () {//设置标题
        var that=this;
        var options=that.options;
        var ProvinceText='';
        var CityText='';
        var projectName='';
        var strTitle='';
        var paramName='ISetOrGetMemberCacheServices'
        that.setParams(paramName);//设置请求接口参数

        that.clearTimer(paramName);//清除定时器

        options.timer[paramName]=setTimeout(function () {
            ajaxCall(options.url,options.params[paramName],function (data) {
                data=that.toJson(data);
                if(data.Code==200){
                    var Data=data.Data;

                    if(options.ManagementCode=''){
                        options.ManagementCode=Data.Code;
                    }else{
                        if(options.ManagementCode==Data.Code){
                            that.setTitle();//设置标题
                            return;
                        }else{
                            options.ManagementCode=Data.Code;
                        }
                    }

                    ProvinceText=that.checkString(Data.ProvinceText);
                    CityText=that.checkString(Data.CityText);
                    projectName=that.checkString(Data.Name);

                    strTitle='全国'+'-'+ProvinceText+'-'+CityText+'-'+projectName+'停车场';

                    that.clearMonitorVideoAddress();//清除监控视频标题信息
                    $(options.monitorVideoAddress).html(strTitle);
                    that.loadMonitorVideo();//获取监控视频
                }else{
                    // console.log(data.Message);
                    that.setTitle();//设置标题
                }
            });
        },iLongTime);

    },
    setMonitorVideoData:function (resultData) {
        var that=this;
        var options=that.options;
        var monitorVideoData=options.monitorVideoData;
        var resultDataLen=resultData.length;

        if(resultData!=null&&resultData!=undefined&&resultDataLen>0){
            monitorVideoData.monitorVideo=resultData;
        }
    },
    setMonitorVideoStatus:function (flag) {//设置获取监控视频数据状态
        var that=this;
        var options=that.options;
        var monitorVideoData=options.monitorVideoData;

        monitorVideoData.isFirst=flag;
    },
    isEqualMonitorVideo:function (resultData) {//判断监控视频数据是不是没有变化
        var that=this;
        var options=that.options;
        var monitorVideoData=options.monitorVideoData;
        var monitorVideo=monitorVideoData.monitorVideo;
        var monitorVideoLen=monitorVideo.length
        var resultDataLen=resultData.length;
        var flag=0;

        if(resultDataLen!=monitorVideoLen){
            flag-=1;
        }else{
            for(var i=0;i<resultDataLen;i++){
                if(monitorVideo[i].Province!=resultData[i].Province){
                    flag-=1;
                }
                if(monitorVideo[i].City!=resultData[i].City){
                    flag-=1;
                }
                if(monitorVideo[i].ProjectId!=resultData[i].ProjectId){
                    flag-=1;
                }

                if(monitorVideo[i].Url!=resultData[i].Url){
                    flag-=1;
                }
            }
        }

        return (flag==0);
    },
    SetVideoUri:function (uri) {//设置选择的视频信息
        var that=this;
        var options=that.options;
        var paramName='SetVideoUri';

        options.monitorVideoUri=uri;//存储点击的视频的路径
        that.clearTimer(paramName);//清除定时器
        that.setUrl();//设置接口访问地址
        that.setParams(paramName);//设置请求接口参数

        ajaxCall(options.url,options.params[paramName],function (data) {
            if(data=='true'){
                console.log('缓存成功');
            }else{
                console.log('失败');
            }
        });
    }
}
/*设置视频监控信息*/
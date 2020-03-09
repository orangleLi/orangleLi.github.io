/*ajax请求*/


var hosts={
    /*生产环境*/
    serverIotapi:'iotapi.einwin.com',
    serverToken:'gateway.einwin.com',
}
var FLAG_HOST = {flag_iotapi: 'iotapi', flag_token: 'token'};

var token = 'OUI5MEI2QTAwQzI2NjJDRUEwRjUzQjNGOTA4NjlGOTUwOTkxMEJBNjQwRjRFRDgwOEE5ODM5OTM4QTM2NDVEOQ=='
function postCall(data,callback,errorFun) {
    ajaxCall(data, callback, "post",errorFun);
}
function getCall(data, callback,errorFun) {
    ajaxCall(data, callback, "get",errorFun);
}
function getUrl(flag,url){
    switch (flag){
        case FLAG_HOST.flag_iotapi:
            url='http://'+hosts.serverIotapi+'/'+url;
            break;
        case FLAG_HOST.flag_token:
            url='http://'+hosts.serverToken+'/'+url;
            break;
    }
    return url;
}
function ajaxCall(data,callback, type,errorFun){
    var params ={flag:FLAG_HOST.flag_iotapi,headers:{"Access-Token":token}};
    var url = 'http://iotapi.einwin.com/v2/data_platform/common/query';
    var serverRequest='';
    var options={
        url:url,
        type:type,
        dataType:'json',
        contentType: "application/json; charset=utf-8",
        success:function (data){
            if(!((data) instanceof Object)){
                data=JSON.parse(data);
            }
            callback(data);
        },error: function (xmlHttpRequest, textStatus, errorThrown) {
            errorFun&&errorFun();
        }
    };

    if(params.headers&&params.headers!=null){
        options.headers=params.headers;
    }

    if(params.contentType&&params.contentType!=null){
        options.contentType=params.contentType;
    }

    if (data&&data!=null&&type == "post") {
        options.data = JSON.stringify(data);
    }

    try{
        serverRequest=$.ajax(options);
    }catch(e){
        console.log(e);
    }

    return serverRequest;
}
/*ajax请求*/
var lastMonthDate=''; var yesterdayData='';
function getParamDate(){
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var lastMonth = now.getMonth();//得到月份
    var date = now.getDate();//得到日期
    var nowMonth;var lastData = date - 1;
    if(lastMonth===12){
        nowMonth = 1;
    }
    else{
        nowMonth = lastMonth + 1
    }
    if (nowMonth < 10) nowMonth = "0" + nowMonth;
    if (lastMonth < 10) lastMonth = "0" + lastMonth;
    if (date < 10) date = "0" + date;
    if (lastData < 10) lastData = "0" + lastData;
    lastMonthDate = year+"-"+lastMonth+"-"+date+"T00:00:00.000+0800";
    yesterdayData = year+"-"+nowMonth+"-"+lastData+"T23:59:59.000+0800";
}
getParamDate();

var open_door_tppe = {0:'远程',1:'密码',2:'动态二维码',3:'IC门卡',4:'指纹识别',5:'人脸识别',6:'光控',7:'固定二维码',8:'蓝牙',9:'WIFI'}
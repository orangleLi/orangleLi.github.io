/**
 * Created by Tim on 2016/7/4.
 */
"use strict";
/*打开搜索窗*/
function  showMasker(masker) {
    $(masker).show();
}
/*打开搜索窗*/
/*隐藏搜索窗*/
function hideMasker(masker,obj) {
    $(masker).addClass('ani_fadeout');
    $(obj).addClass('ani_moveout');
    var timer=setTimeout(function () {
        clearTimeout(timer);
        $(masker).hide();
        $(masker).removeClass('ani_fadeout');
        $(obj).removeClass('ani_moveout');
        if(oSetColumnInfo!=undefined||oSetColumnInfo!=null){
            oSetColumnInfo.clearSearch();
        }
    },1000);
}
/*隐藏搜索窗*/
/*筛选栏目指标点击事件*/
//选择全部
function checkColumnAll(obj) {
    var flag=$(obj).attr('data-flag');
    
    if(flag=='true'){
        $('#search_columns_list').find('li').removeClass('columns_item_active').attr('data-flag',false);
    }else{
        $('#search_columns_list').find('li').addClass('columns_item_active').attr('data-flag',true);
    }
}
//选择单个指标
function checkColumnSingle(obj) {
    var flag=$(obj).attr('data-flag');

    if(flag=='true'){
        $('#search_columns_list').find('.columns_item_all').removeClass('columns_item_active').attr('data-flag',false);
        $(obj).removeClass('columns_item_active').attr('data-flag',false);
    }else{
        $(obj).addClass('columns_item_active').attr('data-flag',true);
        var arrColumnsItem=$('#search_columns_list').find('li').not('.columns_item_all');
        var ColumnsItemLen=arrColumnsItem.length;
        var tempLen=0;

        for(var i=0;i<ColumnsItemLen;i++){
            if($(arrColumnsItem[i]).attr('data-flag')=='true'){
                tempLen+=1;
            }
        }

        if(ColumnsItemLen==tempLen){
            $('#search_columns_list').find('.columns_item_all').addClass('columns_item_active').attr('data-flag',true);
        }
    }
}
/*筛选栏目指标点击事件*/
/*报警列表项点击事件*/
function warnItemClick(obj) {
    var arrCode=$(obj).attr('data-value').toString().split(',');

    if(arrCode.length<=0){
        return;
    }

    var Code=arrCode[0];
    var ParentCode=arrCode[1];
    var strId=arrCode[2];

    if(Code==undefined||Code==null){
        Code=ccpg;
    }

    if(oSetColumnInfo!=undefined||oSetColumnInfo!=null){
        oSetColumnInfo.setMemberInfor(Code,ParentCode,strId);//设置选择项目
    }
}
/*报警列表项点击事件*/
/*设置栏目信息*/
var setColumnInfo=function (options) {
    var that=this;

    that.options={
        ColumnCode:null,//栏目编号
        QuotaCode:'',//指标编号
        ManagementCode:'',//具体项目编号
        ParentCode:'',//具体项目的父编号
        WarnId:'',//告警Id
        QuotasInfo:[],//指标信息
        url:null,//接口地址
        params:{},//请求接口的参数
        searhObj:{
            searchInput:null,//搜索框
            searchBtn:null,//搜索按钮
            searchColumnsList:null,//搜索栏目指标数组
            suerBtn:null//确定按钮
        },
        warnDataList:null,//报警数据列表对象
        WarnAnimate:{//告警和预警数据数据交互动画对象
            warnData:null,
            warningEnergyColumn:null,
            warningData:null
        },
        WarnData:{//存储警告数据
            isFirst:true,
            AlarmData:{
                data:null,
                len:0
            },
            AlertData:{
                data:null,
                len:0
            },
            Count:0
        },
        WarnDatadiffFlag:{//数据差异标示
            AlarmIPreLen:0,//前面不同的数量
            AlertIPreLen:0,//前面不同的数量
            isClear:false//是否全部不同，进行清理
        },
        timer:{}//定时器
    }

    for(var item in options){
        that.options[item]=options[item];
    }

    that.init();
}

setColumnInfo.prototype={
    init:function () {
        var that=this;
        var options=that.options;

        if(options.ColumnCode==undefined||options.ColumnCode==null){
            return;
        }

        that.initWarnAnimate();//初始化告警和预警数据数据交互动画
        that.getQuotas();//获取该栏目的所有指标信息
        that.events();//绑定事件
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
            case 'GetQuotasByCode':
                options.params[paramsName]={
                    _service: 'Monitor.Services.IColumnServices',
                    service_assembly: 'Monitor.Services',service_method: 'GetQuotasByCode',
                    Code: options.ColumnCode
                }
                break;
            case 'GetAlarmByCode':
                options.params[paramsName]={
                    _service: 'Monitor.Services.IColumnServices',
                    service_assembly: 'Monitor.Services',service_method: 'GetAlarmByCode',
                    quotatypeRequest:{
                        Code:options.ColumnCode,
                        QuotaCode:options.QuotaCode
                    }
                }
                break;
            case 'SetMemberInfor':
                options.params[paramsName]={
                    _service: 'Monitor.Services.ISetOrGetMemberCacheServices',
                    service_assembly: 'Monitor.Services',service_method: 'SetMemberInfor',
                    requstInfor:{
                        Code:options.ManagementCode,
                        PCode:options.ParentCode,
                        ID:options.WarnId
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
    initWarnAnimate:function () {//初始化告警和预警数据数据交互动画
        var that=this;
        var options=that.options;
        var WarnAnimate=options.WarnAnimate;

        WarnAnimate.SetEneryColumn=new setEneryColumn({
            arrEneryColumn:{
                warnData:$(WarnAnimate.warnData[0]),
                warningEnergyColumn:WarnAnimate.warningEnergyColumn,
                warningData:$(WarnAnimate.warningData[0])
            }
        });
    },
    setWarnNumShow:function (AlarmLen,AlertLen) {//设置显示告警和预警数量
        var that=this;
        var options=that.options;
        var WarnAnimate=options.WarnAnimate;

        $(WarnAnimate.warnData[2]).text(AlarmLen);
        $(WarnAnimate.warningData[2]).text(AlertLen);
    },
    loadAlarmInfo:function () {//获取栏目报警信息
        var that=this;
        var options=that.options;
        var paramName='GetAlarmByCode';

        that.clearTimer(paramName);//清除定时器
        that.setUrl();//设置接口访问地址
        that.setParams(paramName);//设置请求接口参数

        options.timer[paramName]=setTimeout(function () {
            ajaxCall(options.url,options.params[paramName],function (data) {
                data=that.toJson(data);
                // console.log(options.params[paramName]);
                // console.log(data);
                if(data.Code==200){
                    that.setIAlarmShow(data.Data,paramName);//设置显示警报信息
                }else{
                    // alert(data.Message);
                }
            })
        },iLongTime);
    },
    setIAlarmShow:function (resultData,timerName) {//设置显示警报信息
        var that=this;
        var options=that.options;
        var WarnAnimate=options.WarnAnimate;
        var WarnData=options.WarnData;
        var AlarmData=WarnData.AlarmData;
        var AlertData=WarnData.AlertData;
        var AlarmItems=[];
        var AlarmItemsLen=0;
        var AlertItems=[];
        var AlertItemsLen=0;

        if(resultData.AlarmItems!=null&&resultData.AlarmItems!=undefined
        &&resultData.AlertItems!=null&&resultData.AlertItems!=undefined){
            AlarmItems=resultData.AlarmItems;
            AlarmItemsLen=AlarmItems.length;
            AlertItems=resultData.AlertItems;
            AlertItemsLen=AlertItems.length;
        }

        if(options.WarnData.isFirst){
            that.setWarnData(AlarmItems,AlarmItemsLen,AlertItems,AlertItemsLen);//设置警告数据
            that.setSaveWarnDataStatus(false);//设置获取警告数据状态
            that.initWarnDataList(AlarmItems,AlarmItemsLen,AlertItems,AlertItemsLen)
        }else{
            if(that.isEqualWarnData(AlarmItems,AlarmItemsLen,AlertItems,AlertItemsLen)){//判断每次获取的警告数据有没有变化
                that.loadAlarmInfo();//获取栏目报警信息
                return;
            }else{
                that.changeWarnDataList(AlarmItems,AlarmItemsLen,AlertItems,AlertItemsLen);//修改报警列表
                that.setWarnData(AlarmItems,AlarmItemsLen,AlertItems,AlertItemsLen);//设置警告数据
            }
        }
        console.log("控制刷新成功");
        console.log(resultData);

        var  iwarnData=0;
        var  iwarningData=0;

        if(WarnData.Count>0){
            iwarnData=Math.round((AlarmData.len/WarnData.Count)*100);
            iwarningData=Math.round((AlertData.len/WarnData.Count)*100);
        }

        that.setWarnNumShow(AlarmData.len,AlertData.len);//设置显示告警和预警数量
        WarnAnimate.SetEneryColumn.setWarnData(iwarnData,iwarningData);


        that.loadAlarmInfo();//获取栏目报警信息
    },
    clearWarnDataList:function () {//清除报警列表所有数据
        var that=this;
        var options=that.options;

        $(options.warnDataList).html('');
    },
    initWarnDataList:function (AlarmItems,AlarmItemsLen,AlertItems,AlertItemsLen) {//初始化报警数据列表
        var that=this;
        var options=that.options;

        that.clearWarnDataList();//清除报警列表所有数据

        for(var i=AlertItemsLen-1;i>=0;i--){
            var tempTime = AlertItems[i].TriggerDateTime.split(' ');
            var iDelayTime=(AlertItemsLen-1-i)*0.4;
            var temp='<li class="warn_data_item ani_warnItemMoveIn" data-value="'+AlertItems[i].ManagementCode+','+AlertItems[i].CompanyCode+','+AlertItems[i].Id+'" style="animation-delay:'+iDelayTime+'s;-webkit-animation-delay:'+iDelayTime+'s;" onclick="warnItemClick(this)">'
                +'<div class="warn_data_item_bg">'
                +'<img src="../images/warn_data_item_bg.png" class="dpb">'
                +'</div>'
                +'<div class="warn_data_item_con clear">'
                +'<p class="fl"><span class="dpb">'+tempTime[0]+'<br/>'+tempTime[1]+'</span></p>'
                +'<p class="fl"><span class="dpb">'+that.checkString(AlertItems[i].Target)+'</span></p>'
                +'<p class="fl" title="'+that.checkString(AlertItems[i].PushDesc)+'"><span class="dpb">'+that.checkString(AlertItems[i].PushDesc)+'</span></p>'
                +'<p class="fl"><span class="dpb warning_icon"><img src="../images/warning_icon.png" class="dpb"></span></p>'
                +'<p class="fl"><span class="dpb">'+that.checkString(AlertItems[i].ProjectName)+'</span></p>'
                +'</div>'
                +'</li>';
            $(options.warnDataList).prepend(temp);
        }

        for(var i=AlarmItemsLen-1;i>=0;i--){
            var tempTime = AlarmItems[i].TriggerDateTime.split(' ');
            var iDelayTime=(AlarmItemsLen+AlertItemsLen-1-i)*0.4;
            var temp='<li class="warn_data_item ani_warnItemMoveIn" data-value="'+AlarmItems[i].ManagementCode+','+AlarmItems[i].CompanyCode+','+AlarmItems[i].Id+'" style="animation-delay:'+iDelayTime+'s;-webkit-animation-delay:'+iDelayTime+'s;" onclick="warnItemClick(this)">'
                +'<div class="warn_data_item_bg">'
                +'<img src="../images/warn_data_item_bg.png" class="dpb">'
                +'</div>'
                +'<div class="warn_data_item_con clear">'
                +'<p class="fl"><span class="dpb">'+tempTime[0]+'<br/>'+tempTime[1]+'</span></p>'
                +'<p class="fl"><span class="dpb">'+that.checkString(AlarmItems[i].Target)+'</span></p>'
                +'<p class="fl" title="'+that.checkString(AlarmItems[i].PushDesc)+'"><span class="dpb">'+that.checkString(AlarmItems[i].PushDesc)+'</span></p>'
                +'<p class="fl"><span class="dpb warn_icon"><img src="../images/warn_icon.png" class="dpb"></span></p>'
                +'<p class="fl"><span class="dpb">'+that.checkString(AlarmItems[i].ProjectName)+'</span></p>'
                +'</div>'
                +'</li>';
            $(options.warnDataList).prepend(temp);
        }
    },
    changeWarnDataList:function (AlarmItems,AlarmItemsLen,AlertItems,AlertItemsLen) {//修改报警列表
        var that=this;
        var options=that.options;
        var WarnData=options.WarnData;
        var WarnDatadiffFlag=options.WarnDatadiffFlag;
        var warnDataListCount=WarnData.Count+WarnDatadiffFlag.AlarmIPreLen+WarnDatadiffFlag.AlertIPreLen;

        if(WarnDatadiffFlag.isClear){
            that.initWarnDataList(AlarmItems,AlarmItemsLen,AlertItems,AlertItemsLen);//初始化报警数据列表
        }else{
            if(warnDataListCount>20){
                var arrWarnDataItem=$(options.warnDataList).find('li');

                for(var i=20;i<warnDataListCount;i++){
                    $(arrWarnDataItem[i]).remove();
                }
            }

            for(var i=WarnDatadiffFlag.AlertIPreLen-1;i>=0;i--){
                var tempTime = AlertItems[i].TriggerDateTime.split(' ');
                var iDelayTime=(WarnDatadiffFlag.AlertIPreLen-1-i)*0.4;
                var temp='<li class="warn_data_item ani_warnItemMoveIn" data-value="'+AlertItems[i].ManagementCode+','+AlertItems[i].CompanyCode+','+AlertItems[i].Id+'" style="animation-delay:'+iDelayTime+'s;-webkit-animation-delay:'+iDelayTime+'s;" onclick="warnItemClick(this)">'
                    +'<div class="warn_data_item_bg">'
                    +'<img src="../images/warn_data_item_bg.png" class="dpb">'
                    +'</div>'
                    +'<div class="warn_data_item_con clear">'
                    +'<p class="fl"><span class="dpb">'+tempTime[0]+'<br/>'+tempTime[1]+'</span></p>'
                    +'<p class="fl"><span class="dpb">'+that.checkString(AlertItems[i].Target)+'</span></p>'
                    +'<p class="fl" title="'+that.checkString(AlertItems[i].PushDesc)+'"><span class="dpb">'+that.checkString(AlertItems[i].PushDesc)+'</span></p>'
                    +'<p class="fl"><span class="dpb warning_icon"><img src="../images/warning_icon.png" class="dpb"></span></p>'
                    +'<p class="fl"><span class="dpb">'+that.checkString(AlertItems[i].ProjectName)+'</span></p>'
                    +'</div>'
                    +'</li>';
                $(options.warnDataList).prepend(temp);
            }
            for(var i=WarnDatadiffFlag.AlarmIPreLen-1;i>=0;i--){
                var tempTime = AlarmItems[i].TriggerDateTime.split(' ');
                var iDelayTime=(AlertItemsLen+WarnDatadiffFlag.AlarmIPreLen-1-i)*0.4;
                var temp='<li class="warn_data_item ani_warnItemMoveIn" data-value="'+AlarmItems[i].ManagementCode+','+AlarmItems[i].CompanyCode+','+AlarmItems[i].Id+'" style="animation-delay:'+iDelayTime+'s;-webkit-animation-delay:'+iDelayTime+'s;" onclick="warnItemClick(this)">'
                    +'<div class="warn_data_item_bg">'
                    +'<img src="../images/warn_data_item_bg.png" class="dpb">'
                    +'</div>'
                    +'<div class="warn_data_item_con clear">'
                    +'<p class="fl"><span class="dpb">'+tempTime[0]+'<br/>'+tempTime[1]+'</span></p>'
                    +'<p class="fl"><span class="dpb">'+that.checkString(AlarmItems[i].Target)+'</span></p>'
                    +'<p class="fl" title="'+that.checkString(AlarmItems[i].PushDesc)+'"><span class="dpb">'+that.checkString(AlarmItems[i].PushDesc)+'</span></p>'
                    +'<p class="fl"><span class="dpb warn_icon"><img src="../images/warn_icon.png" class="dpb"></span></p>'
                    +'<p class="fl"><span class="dpb">'+that.checkString(AlarmItems[i].ProjectName)+'</span></p>'
                    +'</div>'
                    +'</li>';
                $(options.warnDataList).prepend(temp);
            }
        }
    },
    setWarnData:function (AlarmItems,AlarmItemsLen,AlertItems,AlertItemsLen) {//设置警告数据
        var that=this;
        var options=that.options;
        var WarnData=options.WarnData;
        var AlarmData=WarnData.AlarmData;
        var AlertData=WarnData.AlertData;

        AlarmData.data=AlarmItems;
        AlarmData.len=AlarmItemsLen;
        AlertData.data=AlertItems;
        AlertData.len=AlertItemsLen;

        WarnData.Count=AlarmData.len+AlertData.len;
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
        var WarnDatadiffFlag=options.WarnDatadiffFlag;
        var flag=0;

        //将不同的数量清零
        WarnDatadiffFlag.isClear=false;
        WarnDatadiffFlag.AlarmIPreLen=0;
        WarnDatadiffFlag.AlertIPreLen=0;

        if((AlarmItemsLen==0&&AlertItemsLen==0)
            ||(AlarmData.len==0&&AlertData.len==0)
            ||(AlarmItemsLen>0&&AlarmData.len>0&&AlarmItems[0].TargetTypeCode!=AlarmData.data[0].TargetTypeCode)
            ||(AlertItemsLen>0&&AlertData.len>0&&AlertItems[0].TargetTypeCode!=AlertData.data[0].TargetTypeCode)
            ||(AlarmItemsLen>0&&AlarmData.len>0&&AlarmData.data[0].ManagementCode!=AlarmItems[0].ManagementCode&&AlarmData.data[AlarmData.len-1].ManagementCode!=AlarmItems[AlarmItemsLen-1].ManagementCode)
            ||(AlertItemsLen>0&&AlertData.len>0&&AlertData.data[0].ManagementCode!=AlertItems[0].ManagementCode&&AlertData.data[AlertData.len-1].ManagementCode!=AlertItems[AlertItemsLen-1].ManagementCode)){
            WarnDatadiffFlag.isClear=true;
            flag-=1;

            return (flag==0);
        }

        if((AlertItemsLen!=AlertData.len&&AlertItemsLen>0&&AlertData.len>0&&AlertData.data[0].ManagementCode!=AlertItems[0].ManagementCode)
            ||(AlarmItemsLen!=AlarmData.len&&AlarmItemsLen>0&&AlarmData.len>0&&AlarmData.data[0].ManagementCode!=AlarmItems[0].ManagementCode)){
            flag-=1;

            for(var i=0;i<AlarmItemsLen;i++){
                if(i<AlarmData.len&&AlarmData.data[i].ManagementCode!=AlarmItems[i].ManagementCode){
                    WarnDatadiffFlag.AlarmIPreLen+=1;
                }
            }

            for(var i=0;i<AlertItemsLen;i++){
                if(i<AlertData.len&&AlertData.data[i].ManagementCode!=AlertItems[i].ManagementCode){
                    WarnDatadiffFlag.AlertIPreLen+=1;
                }
            }

            if((WarnDatadiffFlag.AlarmIPreLen==0&&AlarmItemsLen!=AlarmData.len)||(WarnDatadiffFlag.AlarmIPreLen==AlarmItemsLen)
                ||(WarnDatadiffFlag.AlertIPreLen==0&&AlertItemsLen!=AlertData.len)||(WarnDatadiffFlag.AlertIPreLen==AlertItemsLen)){
                WarnDatadiffFlag.isClear=true;
            }

            return (flag==0);
        }

        return (flag==0);
    },
    getQuotas:function () {//获取该栏目的所有指标信息
        var that = this;
        var options = that.options;
        var paramName='GetQuotasByCode'

        that.setUrl();//设置接口访问地址
        that.setParams(paramName);//设置请求接口参数

        ajaxCall(options.url,options.params[paramName],function (data) {
            data=that.toJson(data);
            console.log(data);
            if(data.Code==200){
                that.setQuotas(data.Data);//设置本地栏目指标信息
                that.loadAlarmInfo();//获取栏目报警信息
            }else{
                // alert(data.Message);
            }
        })
    },
    setQuotas:function (resultData) {//设置本地栏目指标信息（将从服务器上获取到的栏目指标信息存储到本地）
        var that=this;
        var options=that.options;
        var tempQuotaCode=[];

        if(resultData==undefined||resultData==null){
            return;
        }

        var resultDataLen=resultData.length;

        for(var i=0;i<resultDataLen;i++){
            var temp={QuotaCode:resultData[i].Code,Name:resultData[i].Name}
            tempQuotaCode.push(resultData[i].Code);
            options.QuotasInfo.push(temp);
        }

        options.QuotaCode=tempQuotaCode.join(',');
    },
    searchQuotas:function (name) {//搜索指标信息
        var that=this;
        var options=that.options;
        var searchObj = options.searhObj;
        var str='';
        var strQuotasCode=[];
        var QuotasInfoLen=options.QuotasInfo.length;

        for(var i=0;i<QuotasInfoLen;i++){
            if(options.QuotasInfo[i].Name.indexOf(name)>=0){
            str+='<li class="clear columns_item" data-value="'+options.QuotasInfo[i].QuotaCode+'" data-flag="false" onclick="checkColumnSingle(this)">'
                   + '<div class="checkbox_btn fl">'
                        +'<img src="../images/checkbox_yes.png" class="dpb">'
                    +'</div>'
                    +'<p class="fl"><span>'+options.QuotasInfo[i].Name+'</span></p>'
                +'</li>';
            strQuotasCode.push(options.QuotasInfo[i].QuotaCode);
            }
        }

        str='<li class="clear columns_item columns_item_all" data-value="'+strQuotasCode.join(',')+'" data-flag="false" onclick="checkColumnAll(this)">'
            + '<div class="checkbox_btn fl">'
                +'<img src="../images/checkbox_yes.png" class="dpb">'
            +'</div>'
            +'<p class="fl"><span>全部</span></p>'
        +'</li>'+str;

        $(searchObj.searchColumnsList).html(str);

    },
    setMemberInfor:function (Code,ParentCode,strId) {//设置选择项目
        var that=this;
        var options=that.options;
        var paramName='SetMemberInfor';

        options.ManagementCode=Code;//设置具体项目编号
        options.ParentCode=ParentCode;//设置具体项目的父编号
        options.WarnId=strId;//设置告警Id

        that.clearTimer('GetAlarmByCode');//清除定时器
        that.setUrl();//设置接口访问地址
        that.setParams(paramName);//设置请求接口参数

        ajaxCall(options.url,options.params[paramName],function (data) {
            data=that.toJson(data);

            if(data.Code==200){
                console.log(data.Message);
                that.setSaveWarnDataStatus(true);//设置获取警告数据状态
                that.loadAlarmInfo();//获取栏目报警信息
            }
        });
    },
    clearSearch:function () {//清除搜索信息
        var that=this;
        var options=that.options;
        var searchObj = options.searhObj;

        $(searchObj.searchInput).val('');
        $(searchObj.searchColumnsList).html('');
    },
    events:function () {//绑定事件
        var that = this;
        var options = that.options;
        var searchObj = options.searhObj;

        $(searchObj.searchBtn).on('click', function () {
            var name=$(searchObj.searchInput).val().replace(/\s/g,'');

            that.searchQuotas(name);//搜索指标信息
        });
        $(searchObj.suerBtn).on('click', function () {
            var oColumnsItemAll=$('#search_columns_list').find('.columns_item_all');
            var allFlag=oColumnsItemAll.attr('data-flag');

            if(allFlag=='true'){
                options.QuotaCode=oColumnsItemAll.attr('data-value');
            }else{
                var strQuotaCode=[];
                var arrColumnsItem=$('#search_columns_list').find('li').not('.columns_item_all');
                var ColumnsItemLen=arrColumnsItem.length;

                for(var i=0;i<ColumnsItemLen;i++){
                    if($(arrColumnsItem[i]).attr('data-flag')=='true'){
                        strQuotaCode.push($(arrColumnsItem[i]).attr('data-value'));
                    }
                }

                options.QuotaCode=strQuotaCode.join(',');
            }

            hideMasker('#search_masker','#search_masker_con');//隐藏搜索窗
            that.clearTimer('GetAlarmByCode');//清除定时器
            that.setSaveWarnDataStatus(true);//设置获取警告数据状态
            that.loadAlarmInfo();//获取栏目报警信息
        });
    }
};
/*设置栏目信息*/
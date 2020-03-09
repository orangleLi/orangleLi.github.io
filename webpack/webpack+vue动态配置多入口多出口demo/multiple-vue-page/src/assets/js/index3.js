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
        titleInfoName:null,//标题地名对象
        data:null,//加盟商、项目和网点数据
        geoCoordMap:null,//地图数据
        geoPath:null,//地图json数据的路径
        option:null,//echarts参数
        params:{},//请求接口的参数
        url:null,//接口地址
        normalData:null,//地图数据
        currentNum:0,//当前正在显示的项目点索引号
        BIType:'finance',//BI类型
        clickLock:{//点击事件锁
            click:true,
            isClear:true,//点击项目点时是否清除轮播具体某项目BI信息
        },
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
        that.loadMap('china');//修改地图
        that.click();//单击加盟商总部、项目和网点，筛选出该加盟上下的所有项目和网点
        that.switchModuleClick();//切换模块点击事件
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
                            +'<span class="dpb" style="padding-top:18px;padding-bottom:10px;font-family:微软雅黑;font-size: 1.5rem;color: #ffffff;">'+params.value[3].Address+'&nbsp;'+params.name+'</span>'
                            +'<span class="dpb" style="font-family:微软雅黑;font-size: 0.875rem;color: #898a95;">'+params.value[3].MerchantName+'</span>'
                            +'</p>';
                    }

                    /*设置是否要设置新的提示浮窗的样式*/
                    localStorage.modifyTooltip=true;
                    /*设置是否要设置新的提示浮窗的样式*/

                    return content;
                }
            },
            legend: {
                orient: 'vertical',
                bottom: 60,
                left:80,
                itemGap:18,
                itemWidth:28,
                itemHeight:18,
                padding:[0,0,0,0],
                data:[],
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
                        areaColor: '#13548d',
                        borderColor: '#48c7ff',
                        borderWidth:2,
                    },
                    emphasis: {
                        areaColor: '#ffce00',
                        shadowColor:'rgba(30,29,27,1)',
                        shadowBlur:60
                    }
                }
            }
        };

        options.option.geo.regions=that.setRegions(china);//设置区域颜色
        options.ele.setOption(options.option);
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
    setSeries:function (normalData,BIActiveData) {//设置系列列表
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
                        fontWeight:'bolder',
                        shadowColor: 'rgba(29, 30, 32, 1)',
                        shadowBlur: 10
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
                data: BIActiveData ,
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
                        color: '#00ae6c',
                        shadowColor: 'rgba(29, 30, 32, 1)',
                        shadowBlur: 10
                    },
                    emphasis:{
                        shadowColor: 'rgba(255, 68, 0, 1)',
                        shadowBlur: 10
                    }
                },
                zlevel: 1
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
    setParams:function (paramsName) {//设置请求接口参数
        var that=this;
        var options=that.options;

        that.clearParams(paramsName);

        switch (paramsName){
            case 'finance':
                options.params[paramsName]={_service: "Monitor.Services.BI.IFinanceBIService",
                    service_assembly: "Monitor.Services.BI",service_method: "getViewList",
                    financeParam:{
                        "MerchantCode":"CCPG",
                        // "Period":"201608"
                    }
                };
                break;
            case 'HR':
                    options.params[paramsName]={_service: "Monitor.Services.BI.IHRBIService",
                        service_assembly: "Monitor.Services.BI",service_method: "getViewList",
                        hrParam:{"MerchantCode":"CCPG"}
                    };
                break;
            case 'member':
                options.params[paramsName]={_service: "Monitor.Services.BI.IMemberBIService",
                    service_assembly: "Monitor.Services.BI",service_method: "getViewList",
                    memberParam:{
                        // "MerchantCode":"M0001"
                        "MerchantCode":"CCPG",
                        // "Period":"201608"
                    }
                };
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
            str='';
        }

        return str;
    },
    isExistObject:function (obj) {//验证对象是否存在
        var isExist=true;

        if(obj==undefined||obj==null||$(obj).length<=0){
            isExist=false;
        }

        return isExist;
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
                    value: geoCoord.concat(data[i].value,data[i].region,data[i].Code,data[i].ParentCode,data[i].BIData)
                });
            }
        }
        return res;
    },
    setTitleInfoName:function () {//设置标题地名
        var that=this;
        var options=that.options;
        var strTitleInfoName='';
        $(options.titleInfoName).text(strTitleInfoName);
    },
    setNormalData:function (normalData) {//设置存储地图数据
        var that=this;
        var options=that.options;

        options.normalData=normalData;
    },
    setCurrentNum:function (isInit) {//设置当前正在显示的项目点索引号
        var that=this;
        var options=that.options;

        if(isInit){
            options.currentNum=0;
            return;
        }

        var normalDataLen=options.normalData.length;

        if(options.currentNum<normalDataLen-1){
            options.currentNum+=1;
        }else{
            options.currentNum=0;
        }
    },
    getData:function (resultData) {//获取所有数据
        var that=this;
        var options=that.options;
        var resultDataLength=resultData.length;
        var arrData=[];
        var arrGeoCoorMap={};

        for(var i=0;i<resultDataLength;i++){
            var temp_data={name:that.checkString(resultData[i].CompanyName),value:80,region:{
                Address:that.checkString(resultData[i].Address),
                MerchantName:that.checkString(resultData[i].MerchantName)
            },Code:resultData[i].CompanyCode,ParentCode:that.checkString(resultData[i].MemberCode)};
            switch(options.BIType){
                case 'finance':
                    temp_data.BIData={BIData:[
                        {name:'营业收入',value:resultData[i].Income,unit:'元'},
                        {name:'营业利润',value:resultData[i].Profit,unit:'元'}
                    ]};
                    break;
                case 'HR':
                    temp_data.BIData={BIData:[{name:'人数',value:resultData[i].Number,unit:'人'}]};
                    break;
                case 'member':
                    temp_data.BIData={BIData:[
                        {name:'建筑面积',value:resultData[i].AreaBulid,unit:'㎡'},
                        {name:'占地面积',value:resultData[i].AreaCovered,unit:'㎡'},
                        {name:'项目个数',value:resultData[i].Number,unit:'个'}
                    ]};
                    break;
            }
            arrData.push(temp_data);
            arrGeoCoorMap[resultData[i].CompanyName]=[resultData[i].Longitude,resultData[i].Latitude];
        }
        that.setData(arrData);//设置加盟商、项目和网点数据
        that.setGeoCoordMap(arrGeoCoorMap);//设置地图数据

        // console.log(that.convertData(options.data));

        var normalData=that.convertData(options.data);
        var BIActiveData=[];

        that.setCurrentNum(true);//设置当前正在显示的项目点索引号

        if(normalData.length>0){
            that.setBIDetailInfoShow(normalData[0]);//设置显示某具体项目BI详细信息
            BIActiveData.push(normalData[0]);
        }

        that.setNormalData(normalData);//设置存储地图数据
        that.setMemberInfor();//设置选择项目

        // console.log(BIActiveData);
        that.setSeries(normalData,BIActiveData);//设置系列列表
    },
    setClickLock:function (lockName,value) {//设置点击事件锁
        var that=this;
        var options=that.options;

        options.clickLock[lockName]=value;
    },
    loadMap:function(maps){//修改地图
        var that=this;
        var options=that.options;

        if(maps=='china'||maps==undefined || maps==null)
        {
            maps='china';
            options.chineseName='全国';
            options.geoLevel=0;
        }

        that.setTitleInfoName();//设置标题地名
        that.setUrl();//设置接口访问地址
        that.setParams(options.BIType);//设置请求接口参数


        if('china'==maps){
            ajaxCall(options.url,options.params[options.BIType],function (data) {
                //报警数据
                data=that.toJson(data);
                console.log(data);
                var resultData=data.Data;

                if(resultData!=undefined&&resultData!=null){
                    that.getData(resultData);//获取加盟商数据
                }
                options.option.geo.map=maps;//配置echarts参数
                options.ele.clear();//清空当前实例，会移除实例中所有的组件和图表
                options.ele.setOption(options.option);
                that.setClickLock('click',true);//设置点击事件锁
                that.setClickLock('isClear',true);//设置点击事件锁
            });
        }

    },
    setBIDetailInfoShow:function (strBIDetailInfo) {//设置显示某具体项目BI详细信息
        var that=this;
        var options=that.options;
        var strBIContent='';

        strBIContent+='<p class="clear project_name">';

        if(strBIDetailInfo.name!=''){
            strBIContent+='<span class="fr">'+strBIDetailInfo.name+'</span>'
        }
        
        if(strBIDetailInfo.value[3].Address!=''){
            strBIContent+='<span class="fr">'+strBIDetailInfo.value[3].Address+'</span>'
        }

        strBIContent+='</p>'
        +'<p class="clear project_BI_info">';

        var BIData=strBIDetailInfo.value[6].BIData;
        var BIDataLen=BIData.length;

        for(var i=0;i<BIDataLen;i++){
            strBIContent+='<span class="fl"><i>'+BIData[i].name+'：</i><i>'+BIData[i].value+'</i><i>'+BIData[i].unit+'</i></span>';
        }

        strBIContent+='</p>';

        $(options.projectBIDetailInfo).html('');
        $(options.projectBIDetailInfo).html(strBIContent);
        options.clickLock.isClear&&that.setMemberInfor();//设置选择项目
    },
    clearTimer:function (timerName) {//清除定时器
        var that=this;
        var options=that.options;

        clearTimeout(options.timer[timerName]);
    },
    click:function () {//单击加盟商总部、项目和网点，筛选出该加盟上下的所有项目和网点
        var that=this;
        var options=that.options;

        options.ele.on('click',function (params) {
            if(params.componentType=="geo"||!options.clickLock['click']){
                return;
            }
            var BIActiveData=[{name:params.name,value:params.value}];

            if(options.clickLock.isClear){
                that.clearTimer('SetMemberInfor');
                that.setClickLock('isClear',false);//设置点击事件锁
                options.ele.clear();//清空当前实例，会移除实例中所有的组件和图表
                that.switchBIData(BIActiveData);//切换BI数据
            }else{
                that.setClickLock('isClear',true);//设置点击事件锁
                that.setCurrentNum(true);//设置当前正在显示的项目点索引号
                that.setMemberInfor();//设置选择项目
            }
            //that.setClickLock('click',false);//设置点击事件锁
        });
    },
    switchModuleClick:function () {//切换模块点击事件
        var that=this;
        var options=that.options;

        if(that.isExistObject(options.switchBIModuleItem)){
            options.switchBIModuleItem.click(function () {
                if(!options.clickLock['click']){
                    return;
                }

                $(this).parent().find('.switch_BI_module_active').removeClass('switch_BI_module_active');
                $(this).addClass('switch_BI_module_active');

                that.setBIType($(this).attr('data-BIType'));//设置BI类型
                that.setClickLock('click',false);//设置点击事件锁
                that.loadMap('china');//修改地图
            });
        }
    },
    setBIType:function (BIType) {//设置BI类型
        var that=this;
        var options=that.options;

        options.BIType=BIType;
    },
    setMemberInfor:function () {//设置选择项目
        var that=this;
        var options=that.options;
        var paramName='SetMemberInfor';

        that.clearTimer(paramName);//清除定时器

        options.timer[paramName]=setTimeout(function () {
            // console.log(options.normalData);
            that.setCurrentNum(false);//设置当前正在显示的项目点索引号
            // console.log(options.currentNum);
            if(options.normalData.length>0){
                var BIActiveData=[options.normalData[options.currentNum]]
                that.switchBIData(BIActiveData);//切换BI数据
            }else{
                that.clearTimer('SetMemberInfor');
                $(options.projectBIDetailInfo).html('');
            }
        },2000);
    },
    switchBIData:function (BIActiveData) {//切换BI数据
        var that=this;
        var options=that.options;

        that.setBIDetailInfoShow(BIActiveData[0]);//设置显示某具体项目BI详细信息
        // options.option.series[1].data=BIActiveData;//修改正在显示的BI数据点
        that.setSeries(options.normalData,BIActiveData);//设置系列列表
        // console.log(options.option.series);
        options.ele.setOption(options.option);
    }
};
/*首页地图操作*/






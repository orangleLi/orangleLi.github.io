import {postCall} from '@/assets/js/subProject/fourthSubProject/initToken.js'
import {numberScrollHasEndNum} from '@/assets/js/subProject/fourthSubProject/numberScroll.js'
import $ from 'jquery';
import echarts from 'echarts';
var arrGeoCoorMap={};
var arrData = [];

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = arrGeoCoorMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
                region:data[i].region
            });
        }
    }
    return res;
};

// 项目总数
// var allProNum =
// {
//     "dataset": "device_realtime_dataset",
//     "metrics": ["__distinct_count(project_id)"]
// }
// 设备总数：
var DeviceNum =
{
    "dataset": "device_realtime_dataset",
    "metrics": ["__count(device_id)"]
}
// 在线设备总数：
var OnLine = {
    "dataset": "device_realtime_dataset",
    "metrics": ["__count(device_id)"],
    "filters": {
        "is_online": true
    }
}

var DeviceNumOfProvince =
{
    "dataset": "device_realtime_dataset",
    "fields": ["city"],
    "metrics": ["__count(device_id)"],
    "filters": {
        "province":""
    }
}
var OnLineOfProvince =
{
    "dataset": "device_realtime_dataset",
    "fields": ["city"],
    "metrics": ["__count(device_id)"],
    "filters": {
        "province":"",
        "is_online": true
    }
}
var DeviceNumOfCity =
{
    "dataset": "device_realtime_dataset",
    "metrics": ["__count(device_id)"],
    "filters": {
        "province":"",
        "city": ""
    }
}
var OnLineOfCity =
{
    "dataset": "device_realtime_dataset",
    "metrics": ["__count(device_id)"],
    "filters": {
        "province":"",
        "city": "",
        "is_online": true
    }
}

var startDeviceNum = 0;
function initDeviceNum(param){
    postCall(param,function(resultData){
        // debugger
        var showNum = 0;
        if(resultData.results.length !==0){
            $.each(resultData.results, function (item) {
                showNum += resultData.results[item].count_device_id;
            })
            if((showNum+'') !==$("#DeviceNum").text()){
                $("#DeviceNum").text(showNum);
                numberScrollHasEndNum(startDeviceNum, showNum, '#DeviceNum');
                startDeviceNum = showNum;
            }
        }else{
            $("#DeviceNum").text(0);
        }
    });
}
initDeviceNum(DeviceNum);
var startOnLineNum = 0;
function initOnLine(param){
    postCall(param,function(resultData){
        // debugger
        var showNum = 0;
        if(resultData.results.length !==0){
            $.each(resultData.results, function (item) {
                showNum += resultData.results[item].count_device_id
            })
            if((showNum+'') !== $("#mapOnLine").text()){
                $("#mapOnLine").text(showNum);
                numberScrollHasEndNum(startOnLineNum, showNum, "#mapOnLine");
                startOnLineNum = showNum;
            }
        }else{
            $("#mapOnLine").text(0);
        }
    });
}
initOnLine(OnLine);
setInterval(function () {
    var paramDeviceNum,paramOnLine;
    // tag 0 全国 1 省 2 市
    switch(tag){
        case 0:
            paramDeviceNum = DeviceNum;
            paramOnLine = OnLine;
            break;
        case 1:
            paramDeviceNum = DeviceNumOfProvince;
            paramOnLine = OnLineOfProvince;
            break;
        case 2:
            paramDeviceNum = DeviceNumOfCity;
            paramOnLine = OnLineOfCity;
            break;
    }
    initDeviceNum(paramDeviceNum);
    initOnLine(paramOnLine);
},5000);

//获取当前时间，精确到秒
function getLastUpDateTime(){
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth();//得到月份
    var date = now.getDate();//得到日期
    var hour = now.getHours();//得到小时
    var minu = now.getMinutes();//得到分钟
    var sec = now.getSeconds();//得到秒
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    var time = year + "-" + month + "-" + date+ "T" + hour + ":" + minu + ":" + sec+".000+0800";
    return time;
}
var getInfoContentData = {
    "dataset": "exception_event_dataset",
    "fields": ["exception_type", "alarm_detail_info","new_time"],
    "filters": {
        "new_time": {"__gt": '1970-01-01T00:00:00.000+0800'}
    },
    "sorts": ["-new_time"]
}
function initEningMonitorPlatform01(){
    var info = '';
    postCall(getInfoContentData, function (resultData) {
        if(resultData.results.length===0)return false;
        $.each(resultData.results, function (item){
            if(item===5)return false;
            info += "<li><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM1OUE2MzZEQTlEOTExRThBMDlFRDFBNDFEMzA2NTA4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM1OUE2MzZFQTlEOTExRThBMDlFRDFBNDFEMzA2NTA4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzU5QTYzNkJBOUQ5MTFFOEEwOUVEMUE0MUQzMDY1MDgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzU5QTYzNkNBOUQ5MTFFOEEwOUVEMUE0MUQzMDY1MDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4fuZdkAAABm0lEQVR42pTUyytEURzA8TuDKJKaiA3lsWLhkQVSI//CbJRQLLyiJGRhQRYa5c1CFFkqC2uNBZOFyEqR5JVYySOPMfge/aZu032e+jTnzPzub84953eOx7//pTloRdiCDw3Yjf0Qqk7S6sKRbLpzGGF86nWQsBdnKIZ6eMgg5gQB/M/QKmkuDjCNI+TJONMgdhx+ZnmhBokmCduxJP0+TEk/HZ/xwSSb1Y9V0iZU6GbtRwn20IiruBy2S6aSrkk/tmOvaMOKyTMvyEcEN0YBsX/1IFn4LBJGcYkWXKPfLOmP5rwlyIZNqPJBkHIKGL2+25aBN4xhGF3YJHmIzzQse10mVMv0Lf0cpGBHN0H1Jl63M43KQejAIg4xKWVVq19Tt7NNlQpQBV9Jsg+zNVWb9S79Zwxi3WKjNuzqtBVl8oBq9VK7zXIw7nTxv7p6tky6avB9D2Zwi24s6GZqu1xmAeosF+IY8wgjC/dGZUg5daLGyTlWN045BlCFB7kXHg1iR9VdQeICzeHOB+UuPceT7Hp8K8W2HHPtT4ABAFl4Xj+El4noAAAAAElFTkSuQmCC'>" +
                "<span class='infoCls' id='test2'>"+resultData.results[item].exception_type+","+
                resultData.results[item].alarm_detail_info +"</span></li>";
        });
        $("#alarmInfo").html(info);
    });
}
initEningMonitorPlatform01();
setInterval(function () {
    initEningMonitorPlatform01();
    //根据LastUpDateTime 上一次获取告警的时间去查询LastUpDateTime到现在新增加的告警信息；
    getInfoContentData.filters.new_time = getLastUpDateTime();
},5000);

// // 初始化图表标签


var ProjectNumChart = echarts.init(document.getElementById('runningSitiation'));
var optionMap;
initMap();
setClick();
function setRegions(regionsJson) {//设置区域颜色
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
}
function initMap(){
    optionMap = {
        tooltip: {
            trigger: 'item',
            // triggerOn:'click',//鼠标点击时触发
            enterable:true,//鼠标是否能进入提示框内
            formatter: function (params) {
                var content='';
                var addressInfo = params.data.region.ProvinceText.indexOf('直辖市')!==-1?params.data.region.ProvinceText:params.data.region.ProvinceText + params.data.region.CityText;

                if(params.value!=undefined){
                    content='<p style="text-align: center;">'
                        +'<span class="dpb" style="padding: 0.05rem;font-family: 微软雅黑;font-size: 0.18rem;color: #ffffff;">'+params.name+'</span><br>'
                        +'<span class="dpb" style="padding-top: 0.02rem;font-family:微软雅黑;font-size: 0.0875rem;color: #898a95;">'+addressInfo+'</span>'
                        +'</p>';
                }
                /*设置是否要设置新的提示浮窗的样式*/
                localStorage.modifyTooltip=true;
                /*设置是否要设置新的提示浮窗的样式*/
                $("#info").html(params.name);
                // $("#otherInfo").html("value: "+params.value[2]);
                return content;
            }
        },
        geo: {
            map: 'china',
            label: {
                // emphasis: {
                //     show: false
                // }
            },
            itemStyle: {
                normal: {
                    areaColor: '#083967',
                    borderColor: '#48c7ff',
                    borderWidth: 2,
                },
                emphasis: {
                    areaColor: '#48c7ff',//高亮效果
                    // shadowColor: 'rgba(2, 41, 86, 1)',
                    // shadowBlur: 10,
                    // shadowOffsetY: 20,
                },
            }
        },
        series: [
            {
                name: '正常',
                type: 'scatter',
                coordinateSystem: 'geo',
                opacity: 1,
                // data: convertData(arrData),
                data: [],
                symbolSize: 15,//散点图的大小
                label: {
                    normal: {
                        show: false
                    },
                    // emphasis: {
                    //     show: false
                    // }
                },
                itemStyle: {
                    normal: {
                        color: '#00d0e4',
                        borderColor: '#fff',
                        borderWidth: 2,
                        //shadowColor: 'rgba(29, 30, 32, 1)',
                        //shadowBlur: 10
                    },
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 2,
                    }
                }
            }
        ]
    };
// 图表自适应
    window.addEventListener('resize', function () {
        ProjectNumChart.resize();
    });

    arrData=[];
    arrGeoCoorMap={};
    optionMap.geo.regions=setRegions(china);//设置区域颜色

    $.get('../js/subProject/fourthSubProject/mapData.json',function (resultData) {
        // resultData = JSON.parse(resultData);

        var resultDataLength = resultData.length;

        $("#ProjectNum").text(resultDataLength);
        numberScrollHasEndNum(0, resultDataLength, '#ProjectNum');

        for (var i = 0; i < resultDataLength; i++) {
            setArrData(resultData[i]);
        }
        optionMap.series[0].data = convertData(arrData);
        ProjectNumChart.setOption(optionMap);
    });
}


var requstInforData = {"District": "All","ProvinceText":"广东省","CityText":"深圳市"};
var nowProvinceCode = '';
function setData(requstInforData,str){

    arrData=[];
    arrGeoCoorMap={};

    $.get('../js/subProject/fourthSubProject/mapData.json',function (resultData) {
        // resultData = JSON.parse(resultData);
        var resultDataLength=resultData.length;
        // resultData = resultData.Data;

        for(var i=0;i<resultDataLength;i++){
            if(str === 'all'){
                setArrData(resultData[i]);
            }
            else if(str === 'province'){

                if(resultData[i].ProvinceText.indexOf(provinceOrCityName)!==-1){
                    setArrData(resultData[i]);

                    nowProvinceCode({"param":'中国'}, function (resultData) {
                        $.each(resultData.list, function (item) {
                            if(provinceOrCityName.indexOf(resultData.list[item].province_name.substring(0, 2))!==-1){
                                nowProvinceCode = 'F001' + resultData.list[item].province_code;
                                DeviceNumOfProvince.filters.province =  nowProvinceCode;
                                initDeviceNum(DeviceNumOfProvince);
                                OnLineOfProvince.filters.province =   nowProvinceCode;
                                initOnLine(OnLineOfProvince)
                            }
                        })
                    });
                }
            }
            else if(str === 'city'){

                if(resultData[i].ProvinceText.indexOf(lastProvinceOrCityName)!==-1 && resultData[i].CityText.indexOf(provinceOrCityName)!==-1){
                    setArrData(resultData[i]);

                    postGetCodeByName({"param":'中国_' + lastProvinceOrCityName }, function (resultData) {
                        $.each(resultData.list, function (item) {
                            if(resultData.list[item].city_name.indexOf(provinceOrCityName)!==-1){
                                DeviceNumOfCity.filters.province = nowProvinceCode;
                                OnLineOfCity.filters.province =   nowProvinceCode;

                                nowProvinceCode = nowProvinceCode + resultData.list[item].city_code;
                                DeviceNumOfCity.filters.city = nowProvinceCode;
                                OnLineOfCity.filters.city = nowProvinceCode;
                                nowProvinceCode = '';
                                initDeviceNum(DeviceNumOfCity);
                                initOnLine(OnLineOfCity)
                            }
                        })
                    });
                }
            }
        }
        //更新项目数量
        $("#ProjectNum").text(arrData.length);
        numberScrollHasEndNum(0, arrData.length, '#ProjectNum');

        optionMap.series[0].data = convertData(arrData);
        //使用制定的配置项和数据显示图表
        ProjectNumChart.setOption(optionMap);
    });
}
function setArrData(resultDataI){

    var temp_data={name:resultDataI.Name,value:resultDataI.Level,region:{
            ProvinceText:resultDataI.ProvinceText,
            CityText:resultDataI.CityText
        },Code:resultDataI.Code,ParentCode:this.checkString(resultDataI.ParentCode)};
    var tempParentName=this.checkString(resultDataI.ParentName);

    if(tempParentName==''||tempParentName=='无'){
        temp_data.tipAddress=temp_data.region.ProvinceText+temp_data.region.CityText;
    }else{
        temp_data.tipAddress=tempParentName;
    }
    arrData.push(temp_data);
    arrGeoCoorMap[resultDataI.Name]=[resultDataI.Longitude,resultDataI.Latitude];
}

// //地图点击下钻
// // tag 0 全国 1 省 2 市
var tag = 0;var lastProvinceOrCityName='';var provinceOrCityName;

function setClick(){
    ProjectNumChart.on('click', function (params) {//点击事件
        if (params.componentType === 'geo') {//点击地图区域
            reFreshMap(params.name);
        }
        else if(params.componentType === 'series'){//点击地图散点
            if(tag===0){
                reFreshMap(params.data.region.ProvinceText);
            }
            else if(tag===1){
                reFreshMap(params.data.region.CityText);
            }
        }
    });
}
function reFreshMap(paramsName){
    if(lastProvinceOrCityName.indexOf('直辖市')===-1){
        if(tag === 0) {

            provinceOrCityName =paramsName;
            $("#titleShow").html(provinceOrCityName);
            tag++;
            var provinceEngName = provinceNameChineseToEng(provinceOrCityName);
            $.get('../js/geoProvince/' + provinceEngName + '.json', function (mapJson) {
                optionMap.geo.map = provinceEngName;
                $.each(optionMap.series, function (index) {
                    optionMap.series[index].data=''
                });
                echarts.registerMap(provinceEngName, mapJson);
                requstInforData = { "District": "Province","ProvinceText":provinceOrCityName,"CityText":"深圳市"};
                setData(requstInforData,'province');
            });


            lastProvinceOrCityName = provinceOrCityName;
        }
        else if(tag === 1) {
            provinceOrCityName =paramsName;
            $("#titleShow").html(provinceOrCityName);
            tag++;
            var provinceEngName = provinceNameChineseToEng(lastProvinceOrCityName);
            $.get('../js/city/'+provinceEngName+"/"+cityNameChineseToEng(provinceOrCityName, lastProvinceOrCityName)+'.json', function (mapJson) {
                optionMap.geo.map = provinceEngName;
                $.each(optionMap.series, function (index) {
                    optionMap.series[index].data=''
                });
                echarts.registerMap(provinceEngName, mapJson);
                requstInforData = { "District": "City","ProvinceText":lastProvinceOrCityName,"CityText":provinceOrCityName};
                setData(requstInforData,'city');
            });

        }

    }
}

$("#refreshBack").click(function () {
    clickOrDblclick();
});
ProjectNumChart.on('dblclick', function (params) {
    tag = 0;
    optionMap.geo.map = 'china';
    requstInforData = { "District": "All","ProvinceText":"广东省","CityText":"深圳市"};
    setData(requstInforData,'all');
});
function clickOrDblclick(){
    if(lastProvinceOrCityName.indexOf('直辖市')!==-1){
        $("#titleShow").html(lastProvinceOrCityName);
        tag--;
        lastProvinceOrCityName = ''
        optionMap.geo.map = 'china';

        requstInforData = { "District": "All","ProvinceText":"广东省","CityText":"深圳市"};
        setData(requstInforData,'all');
    }
    else if(tag === 1){//返回到全部
        $("#titleShow").html('全国');
        tag--;
        optionMap.geo.map = 'china';
        requstInforData = { "District": "All","ProvinceText":"广东省","CityText":"深圳市"};
        setData(requstInforData,'all');
    }
    else if(tag === 2) { //返回到省

        $("#titleShow").html(lastProvinceOrCityName);
        tag--;
        var provinceEngName = provinceNameChineseToEng(lastProvinceOrCityName);
        $.get('../js/geoProvince/' + provinceEngName + '.json', function (mapJson) {
            optionMap.geo.map = provinceEngName;
            $.each(optionMap.series, function (index) {
                optionMap.series[index].data=''
            });
            echarts.registerMap(provinceEngName, mapJson);
            provinceOrCityName = lastProvinceOrCityName;
            requstInforData = { "District": "Province","ProvinceText":lastProvinceOrCityName,"CityText":"深圳市"};
            setData(requstInforData,'province');
        });
    }
    else if(tag === 0){
        $("#titleShow").html('全国');
        window.location.reload();
    }
}
function checkString(str) {//验证是否为null或undefined，并对其进行转换
    if(str==null||str==undefined){
        str='无';
    }

    return str;
}
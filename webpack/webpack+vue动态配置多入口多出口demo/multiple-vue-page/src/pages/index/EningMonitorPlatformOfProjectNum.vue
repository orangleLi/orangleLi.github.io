<template>
    <div class="container2 container">
        <div class="mapTitle">
            <div class="mainTitle">一应云<span class="styleCls" id="titleShow"> 全国</span>物联网态势</div>
            <select class="subTitle styleCls" @change="transformScreen">
                <option value="4">全国物联网态势</option>
                <option value="indexOne">第一屏</option>
                <option value="indexTwo">第二屏</option>
                <option value="indexThree">第三屏</option>
            </select>
        </div>
        <div class="dateInfo"><span class="fontCls numberFont">0000</span>年<span class="fontCls numberFont"> 0</span>月<span class="fontCls numberFont"> 0</span>日  星期<span class="fontCls">一  <span class="numberFont">00:00</span></span> </div>
        <div id="projectNumChart" class="mapCls"></div>
        <div class="statistics">
            <ul class="countTitle">
                <li><ul class="mapTitleCls"><li class="mapContent">项目数量</li><li class="numberCls" id="ProjectNum">0</li></ul></li>
                <li><img src="../../assets/images/pic23.png" class="spacing"></li>
                <li><ul class="mapTitleCls"><li class="mapContent">设备数量</li><li class="numberCls" id="DeviceNum">0</li></ul></li>
                <li><img src="../../assets/images/pic23.png" class="spacing"></li>
                <li><ul class="mapTitleCls"><li class="mapContent">在线</li><li class="numberCls" id="mapOnLine">0</li></ul></li>
            </ul>
            <ul class="infoContent" id="alarmInfo">
            </ul>
        </div>
        <div id="refreshBack" class="refreshCls" @click="clickOrDblclick"></div>
    </div>
</template>

<script>
    import store from '@/pages/index/store/store.js'
    import {postCall, postGetCodeByName} from '@/assets/js/subProject/fourthSubProject/initToken.js'
    import {numberScrollHasEndNum} from '@/assets/js/subProject/fourthSubProject/numberScroll.js'
    import {provinceNameChineseToEng, cityNameChineseToEng} from '@/assets/js/subProject/fourthSubProject/geoNameDictionary.js'
    import {setTitleDate} from '@/assets/js/subProject/fourthSubProject/alternateAnimate.js'
    import {transformScreenCommon} from '@/pages/index/transformScreen.js'
    import echarts from 'echarts'
    import mapData from '@/assets/js/subProject/fourthSubProject/mapData.json'

    export default {
        name: "EningMonitorPlatformOfProjectNum",
        data () {
            return {
                EMOProjectNum: this.$store.state.EMOProjectNum,
            }
        },
        computed: {

        },
        methods:{
            transformScreen(){
                transformScreenCommon($(".subTitle").val());
            },
            initDeviceNum(param){
                var _this = this;
                postCall(param,function(resultData){
                    // debugger
                    var showNum = 0;
                    if(resultData.results.length !==0){
                        $.each(resultData.results, function (item) {
                            showNum += resultData.results[item].count_device_id;
                        })
                        if((showNum+'') !==$("#DeviceNum").text()){
                            $("#DeviceNum").text(showNum);
                            numberScrollHasEndNum(_this.EMOProjectNum.startDeviceNum, showNum, '#DeviceNum');
                            _this.EMOProjectNum.startDeviceNum = showNum;
                        }
                    }else{
                        $("#DeviceNum").text(0);
                    }
                });
            },
            initOnLine(param){
                var _this = this;
                postCall(param,function(resultData){
                    // debugger
                    var showNum = 0;
                    if(resultData.results.length !==0){
                        $.each(resultData.results, function (item) {
                            showNum += resultData.results[item].count_device_id
                        })
                        if((showNum+'') !== $("#mapOnLine").text()){
                            $("#mapOnLine").text(showNum);
                            numberScrollHasEndNum(_this.EMOProjectNum.startOnLineNum, showNum, "#mapOnLine");
                            _this.EMOProjectNum.startOnLineNum = showNum;
                        }
                    }else{
                        $("#mapOnLine").text(0);
                    }
                });
            },
            getLastUpDateTime(){
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
            },
            initEningMonitorPlatform01(){
                var info = '';var _this = this;
                postCall(_this.EMOProjectNum.getInfoContentData, function (resultData) {
                    if(resultData.results.length===0)return false;
                    $.each(resultData.results, function (item){
                        if(item===2)return false;
                        info += "<li><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM1OUE2MzZEQTlEOTExRThBMDlFRDFBNDFEMzA2NTA4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM1OUE2MzZFQTlEOTExRThBMDlFRDFBNDFEMzA2NTA4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzU5QTYzNkJBOUQ5MTFFOEEwOUVEMUE0MUQzMDY1MDgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzU5QTYzNkNBOUQ5MTFFOEEwOUVEMUE0MUQzMDY1MDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4fuZdkAAABm0lEQVR42pTUyytEURzA8TuDKJKaiA3lsWLhkQVSI//CbJRQLLyiJGRhQRYa5c1CFFkqC2uNBZOFyEqR5JVYySOPMfge/aZu032e+jTnzPzub84953eOx7//pTloRdiCDw3Yjf0Qqk7S6sKRbLpzGGF86nWQsBdnKIZ6eMgg5gQB/M/QKmkuDjCNI+TJONMgdhx+ZnmhBokmCduxJP0+TEk/HZ/xwSSb1Y9V0iZU6GbtRwn20IiruBy2S6aSrkk/tmOvaMOKyTMvyEcEN0YBsX/1IFn4LBJGcYkWXKPfLOmP5rwlyIZNqPJBkHIKGL2+25aBN4xhGF3YJHmIzzQse10mVMv0Lf0cpGBHN0H1Jl63M43KQejAIg4xKWVVq19Tt7NNlQpQBV9Jsg+zNVWb9S79Zwxi3WKjNuzqtBVl8oBq9VK7zXIw7nTxv7p6tky6avB9D2Zwi24s6GZqu1xmAeosF+IY8wgjC/dGZUg5daLGyTlWN045BlCFB7kXHg1iR9VdQeICzeHOB+UuPceT7Hp8K8W2HHPtT4ABAFl4Xj+El4noAAAAAElFTkSuQmCC'>" +
                            "<span class='infoCls' id='test2'>"+resultData.results[item].exception_type+","+
                            resultData.results[item].alarm_detail_info +"...</span></li>";
                    });
                    $("#alarmInfo").html(info);
                });
            },
            //地图
            convertData(data) {
                var _this = this;
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = _this.EMOProjectNum.arrGeoCoorMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value),
                            region:data[i].region
                        });
                    }
                }
                return res;
            },
            setRegions(regionsJson) {//设置区域颜色
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
            initMap(){
                var _this = this;
                _this.EMOProjectNum.ProjectNumChart = echarts.init(document.getElementById('projectNumChart'));
                _this.EMOProjectNum.optionMap = {
                    tooltip: {
                        trigger: 'item',
                        // triggerOn:'click',//鼠标点击时触发
                        enterable:true,//鼠标是否能进入提示框内
                        formatter: function (params) {
                            var content='';
                            var addressInfo = params.data.region.ProvinceText.indexOf('直辖市')!==-1?params.data.region.ProvinceText:params.data.region.ProvinceText + params.data.region.CityText;

                            if(params.value!=undefined){
                                content='<p style="text-align: center;">'
                                    +'<span class="dpb" style="padding: 0.01rem;font-family: 微软雅黑;font-size: 0.1rem;color: #ffffff;">'+params.name+'</span><br>'
                                    +'<span class="dpb" style="padding-top: 0rem;font-family:微软雅黑;font-size: 0.08rem;color: #898a95;">'+addressInfo+'</span>'
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
                        itemStyle: {
                            normal: {
                                areaColor: '#083967',
                                borderColor: '#48c7ff',
                                borderWidth: 2,
                            },
                            emphasis: {
                                areaColor: '#48c7ff',//高亮效果
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
                            },
                            itemStyle: {
                                normal: {
                                    color: '#00d0e4',
                                    borderColor: '#fff',
                                    borderWidth: 2,
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
                    _this.EMOProjectNum.ProjectNumChart.resize();
                });

                _this.EMOProjectNum.optionMap.geo.regions=_this.setRegions(_this.EMOProjectNum.china);//设置区域颜色

                var resultData = mapData;
                var resultDataLength = resultData.length;

                $("#ProjectNum").text(resultDataLength);
                numberScrollHasEndNum(0, resultDataLength, '#ProjectNum');

                for (var i = 0; i < resultDataLength; i++) {
                    _this.setArrData(resultData[i]);
                }
                _this.EMOProjectNum.optionMap.series[0].data = _this.convertData(_this.EMOProjectNum.arrData);
                _this.EMOProjectNum.ProjectNumChart.setOption(_this.EMOProjectNum.optionMap);
            },
            setData(requstInforData,str){
                var _this = this;
                _this.EMOProjectNum.arrData=[];
                _this.EMOProjectNum.arrGeoCoorMap={};

                var resultData = mapData;
                var resultDataLength=resultData.length;

                for(var i=0;i<resultDataLength-1;i++){
                    if(str === 'all'){
                        _this.setArrData(resultData[i]);
                    }
                    else if(str === 'province'){
                        if(resultData[i].ProvinceText.indexOf(_this.EMOProjectNum.provinceOrCityName)!==-1){
                            _this.setArrData(resultData[i]);

                            postGetCodeByName({"param":'中国'}, function (rsData) {
                                $.each(rsData.list, function (item) {
                                    if(_this.EMOProjectNum.provinceOrCityName.indexOf(rsData.list[item].province_name.substring(0, 2))!==-1){
                                        _this.EMOProjectNum.nowProvinceCode = 'F001' + rsData.list[item].province_code;
                                        _this.EMOProjectNum.DeviceNumOfProvince.filters.province =  _this.EMOProjectNum.nowProvinceCode;
                                        _this.initDeviceNum(_this.EMOProjectNum.DeviceNumOfProvince);
                                        _this.EMOProjectNum.OnLineOfProvince.filters.province =   _this.EMOProjectNum.nowProvinceCode;
                                        _this.initOnLine(_this.EMOProjectNum.OnLineOfProvince)
                                    }
                                })
                            });
                        }
                    }
                    else if(str === 'city'){

                        if(resultData[i].ProvinceText.indexOf(_this.EMOProjectNum.lastProvinceOrCityName)!==-1 && resultData[i].CityText.indexOf(_this.EMOProjectNum.provinceOrCityName)!==-1){
                            _this.setArrData(resultData[i]);

                            postGetCodeByName({"param":'中国_' + _this.EMOProjectNum.lastProvinceOrCityName }, function (resultData) {
                                $.each(resultData.list, function (item) {
                                    if(resultData.list[item].city_name.indexOf(_this.EMOProjectNum.provinceOrCityName)!==-1){
                                        _this.EMOProjectNum.DeviceNumOfCity.filters.province = _this.EMOProjectNum.nowProvinceCode;
                                        _this.EMOProjectNum.OnLineOfCity.filters.province =   _this.EMOProjectNum.nowProvinceCode;

                                        _this.EMOProjectNum.nowProvinceCode = _this.EMOProjectNum.nowProvinceCode + resultData.list[item].city_code;
                                        _this.EMOProjectNum.DeviceNumOfCity.filters.city = _this.EMOProjectNum.nowProvinceCode;
                                        _this.EMOProjectNum.OnLineOfCity.filters.city = _this.EMOProjectNum.nowProvinceCode;
                                        _this.EMOProjectNum.nowProvinceCode = '';
                                        _this.initDeviceNum(_this.EMOProjectNum.DeviceNumOfCity);
                                        _this.initOnLine(_this.EMOProjectNum.OnLineOfCity)
                                    }
                                })
                            });
                        }
                    }
                }
                //更新项目数量
                $("#ProjectNum").text(_this.EMOProjectNum.arrData.length);
                numberScrollHasEndNum(0, _this.EMOProjectNum.arrData.length, '#ProjectNum');

                _this.EMOProjectNum.optionMap.series[0].data = _this.convertData(_this.EMOProjectNum.arrData);
                //使用制定的配置项和数据显示图表
                _this.EMOProjectNum.ProjectNumChart.setOption(_this.EMOProjectNum.optionMap);
            },
            setArrData(resultDataI){
                var _this = this;
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
                _this.EMOProjectNum.arrData.push(temp_data);
                _this.EMOProjectNum.arrGeoCoorMap[resultDataI.Name]=[resultDataI.Longitude,resultDataI.Latitude];
            },
            setClick(){
                var _this = this;
                _this.EMOProjectNum.ProjectNumChart.on('click', function (params) {//点击事件

                    if (params.componentType === 'geo') {//点击地图区域
                        _this.reFreshMap(params.name);
                    }
                    else if(params.componentType === 'series'){//点击地图散点
                        if(_this.EMOProjectNum.tag===0){
                            _this.reFreshMap(params.data.region.ProvinceText);
                        }
                        else if(_this.EMOProjectNum.tag===1){
                            _this.reFreshMap(params.data.region.CityText);
                        }
                    }
                });
            },
            reFreshMap(paramsName){
                var _this = this;
                if(_this.EMOProjectNum.lastProvinceOrCityName.indexOf('直辖市')===-1){
                    if(_this.EMOProjectNum.tag === 0) {
                        _this.EMOProjectNum.provinceOrCityName =paramsName;
                        $("#titleShow").html(paramsName);
                        _this.EMOProjectNum.tag++;
                        var provinceEngName = provinceNameChineseToEng(paramsName);
                        _this.$http.get('../../../static/geoProvince/' + provinceEngName + '.json').then(function(mapJson){
                            _this.EMOProjectNum.optionMap.geo.map = provinceEngName;
                            $.each(_this.EMOProjectNum.optionMap.series, function (index) {
                                _this.EMOProjectNum.optionMap.series[index].data=''
                            });
                            echarts.registerMap(provinceEngName, mapJson.data);
                            _this.EMOProjectNum.requstInforData = { "District": "Province","ProvinceText":_this.EMOProjectNum.provinceOrCityName,"CityText":"深圳市"};
                            _this.setData(_this.EMOProjectNum.requstInforData,'province');
                        },function(response){
                            console.log(response);
                        })


                        _this.EMOProjectNum.lastProvinceOrCityName = _this.EMOProjectNum.provinceOrCityName;
                    }
                    else if(_this.EMOProjectNum.tag === 1) {
                        _this.EMOProjectNum.provinceOrCityName =paramsName;
                        $("#titleShow").html(paramsName);
                        _this.EMOProjectNum.tag++;
                        var provinceEngName = provinceNameChineseToEng(_this.EMOProjectNum.lastProvinceOrCityName);


                        _this.$http.get('../../../static/city/'+provinceEngName+"/"+cityNameChineseToEng(paramsName, _this.EMOProjectNum.lastProvinceOrCityName)+'.json').then(function(mapJson){
                            _this.EMOProjectNum.optionMap.geo.map = provinceEngName;
                            $.each(_this.EMOProjectNum.optionMap.series, function (index) {
                                _this.EMOProjectNum.optionMap.series[index].data=''
                            });
                            echarts.registerMap(provinceEngName, mapJson.data);
                            _this.EMOProjectNum.requstInforData = { "District": "City","ProvinceText":_this.EMOProjectNum.lastProvinceOrCityName,"CityText":_this.EMOProjectNum.provinceOrCityName};
                            _this.setData(_this.EMOProjectNum.requstInforData,'city');
                        },function(response){
                            console.log(response);
                        })

                    }

                }
            },
            clickOrDblclick(){
                var _this = this;
                if(_this.EMOProjectNum.lastProvinceOrCityName.indexOf('直辖市')!==-1){
                    $("#titleShow").html(_this.EMOProjectNum.lastProvinceOrCityName);
                    _this.EMOProjectNum.tag--;
                    _this.EMOProjectNum.lastProvinceOrCityName = ''
                    _this.EMOProjectNum.optionMap.geo.map = 'china';

                    _this.EMOProjectNum.requstInforData = { "District": "All","ProvinceText":"广东省","CityText":"深圳市"};
                    _this.setData(_this.EMOProjectNum.requstInforData,'all');
                }
                else if(_this.EMOProjectNum.tag === 1){//返回到全部
                    $("#titleShow").html('全国');
                    _this.EMOProjectNum.tag--;
                    _this.EMOProjectNum.optionMap.geo.map = 'china';
                    _this.EMOProjectNum.requstInforData = { "District": "All","ProvinceText":"广东省","CityText":"深圳市"};
                    _this.setData(_this.EMOProjectNum.requstInforData,'all');
                }
                else if(_this.EMOProjectNum.tag === 2) { //返回到省

                    $("#titleShow").html(_this.EMOProjectNum.lastProvinceOrCityName);
                    _this.EMOProjectNum.tag--;
                    var provinceEngName = provinceNameChineseToEng(_this.EMOProjectNum.lastProvinceOrCityName);


                    _this.$http.get('../../../static/geoProvince/' + provinceEngName + '.json').then(function(mapJson){
                        _this.EMOProjectNum.optionMap.geo.map = provinceEngName;
                        $.each(_this.EMOProjectNum.optionMap.series, function (index) {
                            _this.EMOProjectNum.optionMap.series[index].data=''
                        });
                        echarts.registerMap(provinceEngName, mapJson);
                        _this.EMOProjectNum.provinceOrCityName = _this.EMOProjectNum.lastProvinceOrCityName;
                        _this.EMOProjectNum.requstInforData = { "District": "Province","ProvinceText":_this.EMOProjectNum.lastProvinceOrCityName,"CityText":"深圳市"};
                        _this.setData(_this.EMOProjectNum.requstInforData,'province');
                    },function(response){
                        console.log(response);
                    })
                }
                else if(_this.EMOProjectNum.tag === 0){
                    $("#titleShow").html('全国');
                    window.location.reload();
                }
            },
            checkString(str) {//验证是否为null或undefined，并对其进行转换
                if(str==null||str==undefined){
                    str='无';
                }
                return str;
            }

        },
        mounted(){
            var _this = this;

            /*设置和更新标题中的日期*/
            var oTitleTimeInfo=$('.dateInfo')[0];
            new setTitleDate({ele:oTitleTimeInfo});
            /*设置和更新标题中的日期*/

            _this.initDeviceNum(_this.EMOProjectNum.DeviceNum);
            _this.initOnLine(_this.EMOProjectNum.OnLine);
            setInterval(function () {
                var paramDeviceNum,paramOnLine;
                // tag 0 全国 1 省 2 市
                switch(_this.EMOProjectNum.tag){
                    case 0:
                        paramDeviceNum = _this.EMOProjectNum.DeviceNum;
                        paramOnLine = _this.EMOProjectNum.OnLine;
                        break;
                    case 1:
                        paramDeviceNum = _this.EMOProjectNum.DeviceNumOfProvince;
                        paramOnLine = _this.EMOProjectNum.OnLineOfProvince;
                        break;
                    case 2:
                        paramDeviceNum = _this.EMOProjectNum.DeviceNumOfCity;
                        paramOnLine = _this.EMOProjectNum.OnLineOfCity;
                        break;
                }
                _this.initDeviceNum(paramDeviceNum);
                _this.initOnLine(paramOnLine);

                //根据LastUpDateTime 上一次获取告警的时间去查询LastUpDateTime到现在新增加的告警信息；
                _this.EMOProjectNum.getInfoContentData.filters.new_time = _this.getLastUpDateTime();
                _this.initEningMonitorPlatform01();
            },5000);
            //实时告警信息
            _this.initEningMonitorPlatform01();

            echarts.registerMap("china",_this.EMOProjectNum.china);

            _this.initMap();
            _this.setClick();
            _this.EMOProjectNum.ProjectNumChart.on('dblclick', function (params) {
                _this.EMOProjectNum.tag = 0;
                _this.EMOProjectNum.optionMap.geo.map = 'china';
                _this.EMOProjectNum.requstInforData = { "District": "All","ProvinceText":"广东省","CityText":"深圳市"};
                _this.setData(_this.EMOProjectNum.requstInforData,'all');
            })

        }
    }
</script>

<style scoped>

</style>
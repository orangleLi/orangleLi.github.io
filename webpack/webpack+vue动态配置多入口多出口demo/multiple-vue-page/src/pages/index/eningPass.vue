<template>
    <div class="container1 container">
        <div class="eningPassTitle">
            <img src="../../assets/images/pic22.png">
            <span>一应通行</span>
        </div>
        <ul class="footerEningPass">
            <li>
                <div class="bgImg"></div>
                <!--<img class="bgImg" src="../../assets/images/rect.png">-->
                <div class="footTitle">
                    <img src="../../assets/images/circle.png">
                    <span>门禁数量</span>
                </div>
                <div id="entranceGuardChart" class="eningPassContentChart chartTop">

                </div>
            </li>
            <li>
                <div class="bgImg"></div>
                <div class="footTitle">
                    <img src="../../assets/images/circle.png">
                    <span>近一月开门方式</span>
                </div>
                <div id="openDoorWaysChart" class="eningPassContentChart chartTop">

                </div>
            </li>
            <li>
                <div class="bgImg"></div>
                <div class="eningPassFootTitle">
                    <img src="../../assets/images/circle.png">
                    <span>APP开门率TOP小区</span>
                </div>
                <div id="appOpenDoorNum" class="eningPassContentChart chartTop">

                </div>
            </li>
            <li>
                <div class="bgImg"></div>
                <div class="eningPassFootTitle">
                    <img src="../../assets/images/circle.png">
                    <span>设备在线率分析</span>
                </div>
                <div id="openDoorExceptionFloor" class="eningPassContentChart chartTop"></div>
                <!--<span class="titleCls">设备在线率分析</span>-->
            </li>
        </ul>
    </div>
</template>

<script>
    import store from '@/pages/index/store/store.js'
    import {postCall} from '@/assets/js/subProject/fourthSubProject/initToken.js'
    import {numberScrollHasEndNum} from '@/assets/js/subProject/fourthSubProject/numberScroll.js'
    import echarts from 'echarts'
    export default {
        name: "eningPass",
        data () {
            return {
                eningPassParams: this.$store.state.eningPassParams,

            }
        },
        methods: {
            initNumberOfEntranceGuard(){
                var _this = this;
                postCall(_this.eningPassParams.NumberOfEntranceGuardData, function(resultData) {
                    // debugger
                    var ACSNameArr = [], RateArr = [];
                    var total = resultData.results.length;
                    $.each(resultData.results, function (item) {
                        ACSNameArr.push(resultData.results[item].product_name);
                        var rate = {value:(resultData.results[item].count_device_id/total)*100, name:resultData.results[item].product_name};
                        RateArr.push(rate);
                    });
                    _this.NumberOfEntranceGuard(ACSNameArr, RateArr);
                });
            },
            NumberOfEntranceGuard(ACSNameArr, RateArr){
                var parkUsedRateChart = echarts.init(document.getElementById('entranceGuardChart'));
                var option1 = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}个({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        top: 30,
                        itemGap: 5,
                        data: ACSNameArr,
                        itemWidth: 12,
                        textStyle:{
                            color:'#fff',
                            fontSize: 10
                        }
                    },
                    color:['#61a0a8','#749f83','#ca8622','#91c7ae','#d48265','#c23531','#546570','#c4ccd3','#6e7074','#bda29a','2f4554'],
                    series : [
                        {
                            name: '门禁数量',
                            type: 'pie',
                            radius : '65%',
                            data:RateArr,
                            itemStyle:{
                                normal:{
                                    label:{
                                        show: true,
                                        formatter: '{b} : \n{d}% ({c})',
                                        fontSize: 12,
                                    },
                                    labelLine :{
                                        show:true,
                                        length: 8,
                                        length2: 3
                                    }
                                }
                            }
                        }
                    ]
                };
                window.addEventListener('resize', function () {
                    parkUsedRateChart.resize();
                });
                parkUsedRateChart.setOption(option1);
            },
            initOpenDoorWays(){
                var _this = this;
                postCall(_this.eningPassParams.getOpenDoorWaysData, function (resultData){
                    var TypeNameArr = [], RateArr = [];var open_type_name;
                    $.each(resultData.results, function (item) {
                        switch (resultData.results[item].open_type) {
                            case 0:
                                open_type_name = '远程';
                                break;
                            case 1:
                                open_type_name = '密码';
                                break;
                            case 2:
                                open_type_name = '动态二维码';
                                break;
                            case 3:
                                open_type_name = 'IC门卡';
                                break;
                            case 4:
                                open_type_name = '指纹识别';
                                break;
                            case 5:
                                open_type_name = '人脸识别';
                                break;
                            case 6:
                                open_type_name = '光控';
                                break;
                            case 7:
                                open_type_name = '固定二维码';
                                break;
                            case 8:
                                open_type_name = '蓝牙';
                                break;
                            case 9:
                                open_type_name = 'WIFI';
                                break;
                        }
                        TypeNameArr.push(open_type_name);
                        var rate = {value:resultData.results[item].count_device_id, name:open_type_name};
                        RateArr.push(rate);
                    });
                    _this.openDoorWays(TypeNameArr, RateArr);
                })
            },
            openDoorWays(TypeNameArr, RateArr){
                var accountingForFeesChart = echarts.init(document.getElementById('openDoorWaysChart'));
                var option2 = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}次({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        top: 30,
                        itemGap: 5,
                        data: TypeNameArr,
                        itemWidth: 12,
                        textStyle:{
                            color:'#fff',
                            fontSize: 10
                        }
                    },
                    color:['#61a0a8','#749f83','#c23531','#546570','#c4ccd3','#d48265','#6e7074','#ca8622','#91c7ae','#bda29a','2f4554'],
                    series : [
                        {
                            name: '开门方式',
                            type: 'pie',
                            radius : '65%',
                            data:RateArr,
                            itemStyle:{
                                normal:{
                                    label:{
                                        show: true,
                                        formatter: '{b} : \n{d}% ({c})',
                                        fontSize: 12,
                                    },
                                    labelLine :{
                                        show:true,
                                        length: 8,
                                        length2: 3
                                    }
                                }
                            }
                        }
                    ]
                };
                window.addEventListener('resize', function () {
                    accountingForFeesChart.resize();
                });
                accountingForFeesChart.setOption(option2);
            },
            initAppOpenDoorNum(){
                var _this = this;
                postCall(_this.eningPassParams.getAppOpenDoorNumData, function (resultData) {
                    var xAxisData = [], yAxisData = [];
                    $.each(resultData.results, function (item) {
                        if(resultData.results[item].project_name === null || resultData.results[item].project_name === undefined)return true;
                        var strs = resultData.results[item].project_name.split(''); //字符串数组
                        var str = '';
                        for(var i = 0;i<strs.length;i++) { //遍历字符串数组
                            str += strs[i];
                            if(!((i + 1)% 4)) str += '\n'; //按需要求余
                        }
                        yAxisData.push(str);
                        xAxisData.push(resultData.results[item].distinct_count_user_id);
                    });
                    _this.appOpenDoorNum(xAxisData, yAxisData)
                })
            },
            appOpenDoorNum(xAxisData, yAxisData){
                var appOpenDoorNum = echarts.init(document.getElementById('appOpenDoorNum'));
                var option3 = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: "{a} <br/>{b} : {c}人",
                    },
                    grid: {
                        left: '2%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        axisLine: {
                            lineStyle: {
                                color: '#fff',//左边线的颜色
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff',//坐标值得具体的颜色

                            }
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: yAxisData,
                        axisLine: {
                            lineStyle: {
                                color: '#fff',//左边线的颜色
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff',//坐标值得具体的颜色

                            }
                        }
                    },
                    series: [
                        {
                            name: 'APP开门率TOP小区',
                            type: 'bar',
                            data: xAxisData,
                            itemStyle:{
                                normal:{
                                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                    color: function (params){
                                        var colorList = ['#c23531','#c4ccd3','#61a0a8','#91c7ae','#546570','#749f83','#ca8622','#d48265','#6e7074','#bda29a','2f4554'];
                                        return colorList[params.dataIndex];
                                    }
                                }
                            },
                        },
                    ]
                };
                window.addEventListener('resize', function () {
                    appOpenDoorNum.resize();
                });
                appOpenDoorNum.setOption(option3);
            },
            initOpenDoorExceptionFloor(){
                var _this = this;
                postCall(_this.eningPassParams.onLineCount, function (onLineCountData) {
                    var onLineCountData = onLineCountData.results.length === 0 ? 0 : onLineCountData.results[0].count_device_id;
                    postCall(_this.eningPassParams.allCount, function (allCountData) {
                        var TypeNameArr = [];var RateArr = [];
                        var allCountData = allCountData.results.length === 0 ? 0 : allCountData.results[0].count_device_id;

                        TypeNameArr.push('设备在线率');
                        RateArr.push({value:onLineCountData, name:'设备在线率'});

                        TypeNameArr.push('设备离线率');
                        RateArr.push({value:allCountData - onLineCountData, name:'设备离线率'});
                        _this.openDoorExceptionFloor(TypeNameArr, RateArr)

                    });
                })
            },
            openDoorExceptionFloor(TypeNameArr, RateArr){
                var openDoorExceptionFloor = echarts.init(document.getElementById('openDoorExceptionFloor'));
                var option4 = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        top: 30,
                        itemGap: 5,
                        data: TypeNameArr,
                        itemWidth: 12,
                        textStyle:{
                            color:'#fff',
                            fontSize: 10
                        }
                    },
                    color:['#91c7ae','#d48265','#546570','#c4ccd3','#61a0a8','#6e7074','#c23531','#749f83','#ca8622','#bda29a','2f4554'],
                    series : [
                        {
                            name: '在线率',
                            type: 'pie',
                            radius : '65%',
                            data:RateArr,
                            itemStyle:{
                                normal:{
                                    label:{
                                        show: true,
                                        formatter: '{b} : \n{d}% ({c})',
                                        fontSize: 12,
                                    },
                                    labelLine :{
                                        show:true,
                                        length: 8,
                                        length2: 3
                                    }
                                }
                            }
                        }
                    ]
                };
                window.addEventListener('resize', function () {
                    openDoorExceptionFloor.resize()
                });
                openDoorExceptionFloor.setOption(option4);
            }
        },
        mounted(){
            this.initNumberOfEntranceGuard();
            this.initOpenDoorWays();
            this.initAppOpenDoorNum();
            this.initOpenDoorExceptionFloor();

        }
    }
</script>

<style scoped>

</style>
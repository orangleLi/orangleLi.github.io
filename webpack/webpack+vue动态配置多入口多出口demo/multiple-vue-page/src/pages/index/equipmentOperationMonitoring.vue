<template>
    <div class="container4 container">
        <div class="EOMContent title">
            <img src="../../assets/images/pic22.png">
            <span>设备运行监测</span>
        </div>
        <div class="EOMTitle">
            <div class="right">
                <span class="key">运行 ：<span class="value" id="onLine">0</span> 台</span>
                <span class="key">停止 ：<span class="value" id="stop">0</span> 台</span>
                <span class="key">离线 ：<span class="value" id="offLine">0</span> 台</span>
            </div>
        </div>
        <ul class="EOMFooter">
            <li>
                <!--<div class="foot parkUsedRate">-->
                <div class="bgImg"></div>
                <!--<img class="bgImg" src="../../assets/images/rect.png">-->
                <div class="footTitle">
                    <span><img src="../../assets/images/circle.png"></span>
                    <span>运行态势</span>
                </div>
                <div id="runningSitiation" class="EOMContentChart chartTop"></div>
                <!--</div>-->
            </li>
            <li>
                <!--<div class="foot accountingForFees">-->
                <div class="bgImg"></div>
                <div class="footTitle">
                    <span><img src="../../assets/images/circle.png"></span>
                    <span>告警处理及时率</span>
                </div>
                <div id="alarmProcessingRate" class="EOMContentChart chartTop"></div>
                <!--</div>-->
            </li>
            <li>
                <!--<div class="foot parkUsedRate">-->
                <div class="bgImg"></div>
                <div class="EOMFootTitle">
                    <span><img src="../../assets/images/circle.png"></span>
                    <span>近一月设备告警级别</span>
                </div>
                <div id="equipmentAlarmLevelInRecentMonth" class="EOMContentChart chartTop"></div>
                <!--</div>-->
            </li>
            <li>
                <!--<div class="foot accountingForFees">-->
                <div class="bgImg"></div>
                <div class="EOMFootTitle">
                    <span><img src="../../assets/images/circle.png"></span>
                    <span>近七天项目告警排名TOP5</span>
                </div>
                <div id="NearlySevenDaysAlarmTOP5" class="EOMContentChart chartTop"></div>
                <!--</div>-->
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
        name: "equipmentOperationMonitoring",
        data () {
            return {
                EOMParams: this.$store.state.EOMParams,

            }
        },
        methods: {
            initRunningSitiation(){
                //实时显示当前所有项目所有楼控设备（供配电、给排水、中央空调）中，处于在线状态、停滞状态和离线状态的设备数量分别有多少
                var _this = this;
                postCall(_this.EOMParams.getRunningSitiationData, function(resultData){
                    // debugger
                    var TypeNameArr = ['运行状态','停止状态','离线状态'], RateArr = [];var rate;
                    var runStatus=0;var stopStatus=0;var offLineStatus=0;
                    $.each(resultData.results, function (item) {
                        if (resultData.results[item].is_online) {
                            runStatus += resultData.results[item].count_device_id;
                            stopStatus += (resultData.results[item].running_status === undefined ? 0 : resultData.results[item].running_status);
                        }
                        else {
                            offLineStatus += resultData.results[item].count_device_id;
                        }
                    });
                    $("#onLine").text(runStatus);
                    $("#stop").text(stopStatus);
                    $("#offLine").text(offLineStatus);
                    RateArr = [
                        {value:runStatus, name:'运行状态'},
                        {value:stopStatus, name:'停止状态'},
                        {value:offLineStatus, name:'离线状态'}
                    ];

                    _this.runningSitiation(TypeNameArr, RateArr)
                })
            },
            runningSitiation(TypeNameArr, RateArr){
                var runningSitiation = echarts.init(document.getElementById('runningSitiation'));
                var option1 = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        top: 30,
                        itemGap: 5,
                        itemWidth: 12,
                        data: TypeNameArr,
                        textStyle:{
                            color:'#fff',
                            fontSize: 10
                        }
                    },
                    color:['#749f83','#ca8622','#91c7ae','#d48265','#c23531','#546570','#c4ccd3','#61a0a8','#6e7074','#bda29a','2f4554'],
                    series : [
                        {
                            name: '运行态势',
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

                // 图表自适应
                window.addEventListener('resize', function () {
                    runningSitiation.resize();
                });
                runningSitiation.setOption(option1);
            },
            initAlarmProcessingRate(){
                var _this = this;
                postCall(_this.EOMParams.molecule, function (moleculeData) {
                    postCall(_this.EOMParams.Denominator, function (DenominatorData) {
                        var molecule = moleculeData.results.length===0?0:moleculeData.results[0].count_event_id;
                        var denominator = DenominatorData.results[0].count_event_id
                        _this.alarmProcessingRate((molecule/denominator).toFixed(2));
                    })
                })
            },
            alarmProcessingRate(Rate){
                var alarmProcessingRate = echarts.init(document.getElementById('alarmProcessingRate'));
                var option2 = {
                    tooltip : {
                        formatter: "{a} <br/>{c}%"
                    },
                    series: [
                        {
                            name: '当月告警处理及时率',
                            type: 'gauge',
                            title:{
                                textStyle: {
                                    color:"#FFF"
                                }
                            },
                            detail: {
                                formatter:'{value}%',
                                color: '#fff',
                                fontSize: '16',
                                padding: [50, 0, 0, 0],
                            },
                            data: [{value: Rate, name: '',textStyle:{ color: '#fff'}}]
                        }
                    ]
                };
                window.addEventListener('resize', function () {
                    alarmProcessingRate.resize();
                });
                alarmProcessingRate.setOption(option2);
            },
            initEquipmentAlarmLevelInRecentMonth(){
                var _this = this;
                postCall(_this.EOMParams.getEquipmentAlarmLevelInRecentMonthData, function (resultData) {
                    var TypeNameArr = [], RateArr = [];
                    $.each(resultData.results, function (item) {

                        var levelInfo = '';
                        switch (resultData.results[item].level) {
                            case "3":
                                levelInfo = '严重告警';
                                break;
                            case "2":
                                levelInfo = '紧急告警';
                                break;
                            case "1":
                                levelInfo = '事件告警';
                                break;
                        }
                        TypeNameArr.push(levelInfo);
                        var rate = {value:resultData.results[item].count_event_id, name:levelInfo};
                        RateArr.push(rate);

                    });
                    _this.equipmentAlarmLevelInRecentMonth(TypeNameArr, RateArr)
                })
            },
            equipmentAlarmLevelInRecentMonth(TypeNameArr, RateArr){
                var equipmentAlarmLevelInRecentMonth = echarts.init(document.getElementById('equipmentAlarmLevelInRecentMonth'));
                var option3 = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        top: 40,
                        itemGap: 5,
                        itemWidth: 12,
                        data: TypeNameArr,
                        textStyle:{
                            color:'#fff',
                            fontSize: 10
                        }
                    },
                    color:['#749f83','#ca8622','#91c7ae','#d48265','#c23531','#546570','#c4ccd3','#61a0a8','#6e7074','#bda29a','2f4554'],
                    series : [
                        {
                            name: '告警级别',
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
                    equipmentAlarmLevelInRecentMonth.resize();
                });
                equipmentAlarmLevelInRecentMonth.setOption(option3);
            },
            initNearlySevenDaysAlarmTOP5(){
                var _this = this;
                postCall(_this.EOMParams.getNearlySevenDaysAlarmTOP5Data, function (resultData) {
                    var TypeNameArr = [], RateArr = [];var tag = 0;
                    $.each(resultData.results, function (item) {
                        if(tag === 5)return false;
                        if(resultData.results[item].project_name!==undefined&&resultData.results[item].project_name!==null){

                            var strs = resultData.results[item].project_name.split(''); //字符串数组
                            var str = '';
                            for(var i = 0;i<strs.length;i++) { //遍历字符串数组
                                str += strs[i];
                                if(!((i + 1)% 4)) str += '\n'; //按需要求余
                            }

                            TypeNameArr.push(str);
                            RateArr.push(resultData.results[item].count_event_id);
                            tag ++;
                        }
                    })
                    _this.NearlySevenDaysAlarmTOP5(TypeNameArr, RateArr)
                })
            },
            NearlySevenDaysAlarmTOP5(TypeNameArr, RateArr){
                var NearlySevenDaysAlarmTOP5 = echarts.init(document.getElementById('NearlySevenDaysAlarmTOP5'));
                var option4 = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
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
                        data: TypeNameArr,
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
                            data: RateArr,
                            itemStyle:{
                                normal:{
                                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                    color: function (params){
                                        var colorList = ['#91c7ae','#546570','#c23531','#c4ccd3','#61a0a8','#749f83','#ca8622','#d48265','#6e7074','#bda29a','2f4554'];
                                        return colorList[params.dataIndex];
                                    }
                                }
                            },
                        },
                    ]
                };
                window.addEventListener('resize', function () {
                    NearlySevenDaysAlarmTOP5.resize();
                });
                NearlySevenDaysAlarmTOP5.setOption(option4);
            }
        },
        mounted(){
            var _this = this;
            _this.initRunningSitiation();
            _this.initAlarmProcessingRate();
            _this.initEquipmentAlarmLevelInRecentMonth();
            _this.initNearlySevenDaysAlarmTOP5();
        }
    }
</script>

<style scoped>

</style>
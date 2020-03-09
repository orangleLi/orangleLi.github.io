import {postCall} from '@/assets/js/subProject/fourthSubProject/initToken.js';
import {numberScrollHasEndNum} from '@/assets/js/subProject/fourthSubProject/numberScroll.js';
import $ from 'jquery';
import echarts from 'echarts';
import {lastMonthDate, yesterdayData} from '@/assets/js/subProject/fourthSubProject/initToken.js';
//运行态势start 问题：数据平台没有接入停滞状态
// 给排水: [
//     'WaterPressure',
//     'Pool',
//     'SprayPump',
//     'DomesticPressurePump',
//     'WaterPump',
//     'SewagePump',
//     'FirePump',
//     'FirePressurePump',
//     'FireStabilizing',
//     'WaterLogging'
// ],
//     供配电: [
//     'FeedCabinet',
//     'Transformer',
//     'DCPanel',
//     'FeederCabinet',
//     'ContactsCabinet',
//     'ElectricGenerator',
//     'SwitchCabinet',
//     'CapacitanceArk'
// ],
//     中央空调: [
//     'FrozenPump',
//     'CollingPump',
//     'CollingTower',
//     'FrozenTower',
//     'WaterChillingUnit',
//     'HotWaterPump',
//     'HotWaterUnit',
//     'VentilationFan',
//     'FrozenCollingReturnPipe',
//     'HotWaterReturnPipe',
//     'IndoorEnv'
// ]
// }
var paramsData = [
        'WaterPressure',
        'Pool',
        'SprayPump',
        'DomesticPressurePump',
        'WaterPump',
        'SewagePump',
        'FirePump',
        'FirePressurePump',
        'FireStabilizing',
        'WaterLogging',

        'FeedCabinet',
        'Transformer',
        'DCPanel',
        'FeederCabinet',
        'ContactsCabinet',
        'ElectricGenerator',
        'SwitchCabinet',
        'CapacitanceArk',

        'FrozenPump',
        'CollingPump',
        'CollingTower',
        'FrozenTower',
        'WaterChillingUnit',
        'HotWaterPump',
        'HotWaterUnit',
        'VentilationFan',
        'FrozenCollingReturnPipe',
        'HotWaterReturnPipe',
        'IndoorEnv'
    ]
var getRunningSitiationData =
{
    "dataset": "device_realtime_dataset",
    "fields": ["is_online",'running_status'],
    "metrics": ["__count(device_id)"],
    "filters": {
        "device_type": {
            "__in": paramsData
        }
    }
}
//实时显示当前所有项目所有楼控设备（供配电、给排水、中央空调）中，处于在线状态、停滞状态和离线状态的设备数量分别有多少
postCall(getRunningSitiationData, function(resultData){
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

    runningSitiation(TypeNameArr, RateArr)
})
function runningSitiation(TypeNameArr, RateArr){
    var runningSitiation = echarts.init(document.getElementById('runningSitiation'));
    var option1 = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 50,
            data: TypeNameArr,
            textStyle:{
                color:'#fff',
            }
        },
        color:['#749f83','#ca8622','#91c7ae','#d48265','#c23531','#546570','#c4ccd3','#61a0a8','#6e7074','#bda29a','2f4554'],
        series : [
            {
                name: '运行态势',
                type: 'pie',
                radius : '65%',
                center: ['50%', '45%'],
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
}
//运行态势end

//告警处理及时率start
// 分子：
var molecule =
{
    "dataset": "exception_event_dataset",
    "metrics": ["__count(event_id)"],
    "filters": {
        "exception_time": {"__gt": lastMonthDate, "__lt": yesterdayData},
        "is_in_time": 1
    }
}

// 分母：
var Denominator =
{
    "dataset": "exception_event_dataset",
    "metrics": ["__count(event_id)"],
    "filters": {
        "exception_time": {"__gt": lastMonthDate, "__lt": yesterdayData}
    }
}
postCall(molecule, function (moleculeData) {
    postCall(Denominator, function (DenominatorData) {
        var molecule = moleculeData.results.length===0?0:moleculeData.results[0].count_event_id;
        var denominator = DenominatorData.results[0].count_event_id
        alarmProcessingRate((molecule/denominator).toFixed(2));
    })
});
function alarmProcessingRate(Rate){
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
                    textStyle: {
                        color: '#fff',
                        fontSize: 20
                    }
                },
                data: [{value: Rate, name: '',textStyle:{ color: '#fff'}}]
            }
        ]
    };
    window.addEventListener('resize', function () {
        alarmProcessingRate.resize();
    });
    alarmProcessingRate.setOption(option2);
}
//告警处理及时率end

//近一月设备告警级别start
//会算出各个等级标签下告警数，自行求占比
//统计所有项目上月同日期00:00:00开始至昨日23:59:59的时间段内，产生的告警记录中不同告警级别的数量占比；
var getEquipmentAlarmLevelInRecentMonthData = {
    "dataset": "exception_event_dataset",
    "fields": ["level"],
    "metrics": ["__count(event_id)"],
    "filters": {
        "exception_time": {"__gt": lastMonthDate, "__lt": yesterdayData}
    }
}

postCall(getEquipmentAlarmLevelInRecentMonthData, function (resultData) {
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
    equipmentAlarmLevelInRecentMonth(TypeNameArr, RateArr)
});
function equipmentAlarmLevelInRecentMonth(TypeNameArr, RateArr){
    var equipmentAlarmLevelInRecentMonth = echarts.init(document.getElementById('equipmentAlarmLevelInRecentMonth'));
    var option3 = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 50,
            data: TypeNameArr,
            textStyle:{
                color:'#fff'
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
}
//近一月设备告警级别end

//近七天项目告警排名TOP5start
//以项目为维度，统计不同项目近一周产生的告警数量，按数量从高到低排列；
var getNearlySevenDaysAlarmTOP5Data = {
    "dataset": "exception_event_dataset",
    "fields": ["project_id","project_name"],
    "metrics": ["__count(event_id)"],
    "filters": {
        "exception_time": {"__trange": "-P7D/"}
    },
    "sorts": ["-count_event_id"]
}
postCall(getNearlySevenDaysAlarmTOP5Data, function (resultData) {
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
    NearlySevenDaysAlarmTOP5(TypeNameArr, RateArr)
})
function NearlySevenDaysAlarmTOP5(TypeNameArr, RateArr){
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
//近七天项目告警排名TOP5end
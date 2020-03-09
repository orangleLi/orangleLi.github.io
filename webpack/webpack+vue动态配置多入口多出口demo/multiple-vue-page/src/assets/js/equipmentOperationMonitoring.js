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
    "fields": ["is_online"],
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
    var TypeNameArr = [], RateArr = [];var rate;
    $.each(resultData.results, function (item) {
        if (resultData.results[item].is_online) {
            $("#onLine").text(resultData.results[item].count_device_id);
            tempStr = '运行状态';
            rate = {value:resultData.results[item].count_device_id, name:'运行状态'};
        }
        // else if()  //停滞状态
        // {
        //
        // }
        else {
            $("#offLine").text(resultData.results[item].count_device_id);
            tempStr = '离线状态';
            rate = {value:resultData.results[item].count_device_id, name:'离线状态'};
        }
        TypeNameArr.push(tempStr);
        RateArr.push(rate);
    })
    runningSitiation(TypeNameArr, RateArr)
})
function runningSitiation(TypeNameArr, RateArr){
    var runningSitiation = echarts.init(document.getElementById('runningSitiation'));
    var option1 = {
        tooltip: {
            trigger: 'item',
            // formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:TypeNameArr,
            textStyle: {
                color: '#FFF'
            },
            padding: 20
        },
        color:['#ed7d31','#a5a5a5','#ffc000','#4472c4'],
        series: [
            {
                name:'运行态势',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:RateArr
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
var getAlarmProcessingRateData = {
    "Result": true,
    "Code": 200,
    "Message": "处理的结果信息",
     "Data":
        {
            "Rate":0.36,
            "Month":7
        }
}
// 分子：
var molecule =
{
    "dataset": "exception_event_dataset",
    "metrics": ["__count(event_id)"],
    "filters": {
    "exception_status": 2,
    "exception_time": {"__gt": lastMonthDate, "__lt": yesterdayData},
    "exception_duration": {"__lt": 86400000}
}
}
// // 分母：
var Denominator =
{
    "dataset": "exception_event_dataset",
    "metrics": ["__count(event_id)"],
    "filters": {
        "exception_time": {"__gt": lastMonthDate, "__lt": yesterdayData}
    }
}
postCall(molecule, function (resultData) {
    // console.log(lastMonthDate)
    // console.log(yesterdayData)
// debugger
})
function  initAlarmProcessingRateData(){
    // var moleculeData;var DenominatorData;
    // postCall(molecule, function (resultData) {
    //     // moleculeData =
    // })
    // postCall(Denominator, function (resultData) {
    //     // DenominatorData =
    // })
    // getAlarmProcessingRateData = moleculeData + DenominatorData;
    if(getAlarmProcessingRateData.Result && getAlarmProcessingRateData.Code===200) {//处理成功
        var TypeNameArr = [], RateArr = [];
        $.each(getAlarmProcessingRateData.Data, function(item){
            TypeNameArr.push(getAlarmProcessingRateData.Data[item].AlarmLevel);
            var rate = {value:getAlarmProcessingRateData.Data[item].Nums, name:getAlarmProcessingRateData.Data[item].AlarmLevel};
            RateArr.push(rate);
        });
        alarmProcessingRate(getAlarmProcessingRateData.Data.Rate, getAlarmProcessingRateData.Data.Month)
    }
    else{
        console.log("处理的结果信息" + getAlarmProcessingRateData.Message);
    }
}
function alarmProcessingRate(Rate, Month){
    var alarmProcessingRate = echarts.init(document.getElementById('alarmProcessingRate'));
    var option2 = {
        tooltip : {
            formatter: "{a} <br/>{c}%"
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: '当月告警处理及时率（'+Month+'月份）',
                type: 'gauge',
                title:{
                    textStyle: {
                        color:"#FFF"
                    }
                },
                detail: {
                    formatter:'{value}%',
                    textStyle: {
                        color: '#fff'
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
initAlarmProcessingRateData();
//告警处理及时率end

//近一月设备告警级别start
// var getEquipmentAlarmLevelInRecentMonthData = {
//     "Result": true,
//     "Code": 200,
//     "Message": "处理的结果信息",
//     "Data":
//         [
//             {
//                 "AlarmLevel": "严重告警",
//                 "Nums": 20,
//                 "Month": 7
//             },
//             {
//                 "AlarmLevel": "一般告警",
//                 "Nums": 30,
//                 "Month": 7
//             }
//         ]
// }
//会算出各个等级标签下告警数，自行求占比
//统计所有项目上月同日期00:00:00开始至昨日23:59:59的时间段内，产生的告警记录中不同告警级别的数量占比；
var getEquipmentAlarmLevelInRecentMonthData = {
    "dataset": "exception_event_dataset",
    "fields": ["tag_id"],
    "metrics": ["__count(event_id)"],
    "filters": {
        "exception_time": {"__gt": lastMonthDate, "__lt": yesterdayData}
    }
}
postCall(getEquipmentAlarmLevelInRecentMonthData, function (resultData) {
// debugger
//     console.log(lastMonthDate)
//     console.log(yesterdayData)
})

// function  initEquipmentAlarmLevelInRecentMonthData(){
//     if(getEquipmentAlarmLevelInRecentMonthData.Result && getEquipmentAlarmLevelInRecentMonthData.Code===200) {//处理成功
//         var TypeNameArr = [], RateArr = [];
//         $.each(getEquipmentAlarmLevelInRecentMonthData.Data, function(item){
//             TypeNameArr.push(getEquipmentAlarmLevelInRecentMonthData.Data[item].AlarmLevel);
//             var rate = {value:getEquipmentAlarmLevelInRecentMonthData.Data[item].Nums, name:getEquipmentAlarmLevelInRecentMonthData.Data[item].AlarmLevel};
//             RateArr.push(rate);
//         });
//         equipmentAlarmLevelInRecentMonth(TypeNameArr, RateArr)
//     }
//     else{
//         console.log("处理的结果信息" + getEquipmentAlarmLevelInRecentMonthData.Message);
//     }
// }
function equipmentAlarmLevelInRecentMonth(TypeNameArr, RateArr){
    var equipmentAlarmLevelInRecentMonth = echarts.init(document.getElementById('equipmentAlarmLevelInRecentMonth'));
    var option3 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:TypeNameArr,
            textStyle: {
                color: '#FFF'
            },
            padding: 20
        },
        color:['#4472c4','#ed7d31'],
        series: [
            {
                name:'近一月设备告警级别',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:RateArr
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
// var getNearlySevenDaysAlarmTOP5Data = {
//     "Result": true,
//     "Code": 200,
//     "Message": "处理的结果信息",
//      "Data":
//          [
//              {
//                 "ProjectName":"长乐花园",
//                 "Nums":20,
//                 "CountDay":20180703
//              },
//              {
//                  "ProjectName":"长怡花园",
//                  "Nums":9,
//                  "CountDay":20180703
//              },
//              {
//                  "ProjectName":"长泰花园",
//                  "Nums":8,
//                  "CountDay":20180703
//              }
//         ]
// }
//以项目为维度，统计不同项目近一周产生的告警数量，按数量从高到低排列；
var getNearlySevenDaysAlarmTOP5Data = {
    "dataset": "exception_event_dataset",
    "fields": ["project_id"],
    "metrics": ["__count(event_id)"],
    "filters": {
        "exception_time": {"__trange": "-P7D/"}
    },
    "sorts": ["-count_event_id"]
}
postCall(getNearlySevenDaysAlarmTOP5Data, function (resultData) {
 // debugger
})
// function  initNearlySevenDaysAlarmTOP5Data(){
//     if(getNearlySevenDaysAlarmTOP5Data.Result && getNearlySevenDaysAlarmTOP5Data.Code===200) {//处理成功
//         var TypeNameArr = [], RateArr = [];
//         $.each(getNearlySevenDaysAlarmTOP5Data.Data, function(item){
//             TypeNameArr.push(getNearlySevenDaysAlarmTOP5Data.Data[item].ProjectName);
//             RateArr.push(getNearlySevenDaysAlarmTOP5Data.Data[item].Nums);
//         });
//         NearlySevenDaysAlarmTOP5(TypeNameArr, RateArr)
//     }
//     else{
//         console.log("处理的结果信息" + getNearlySevenDaysAlarmTOP5Data.Message);
//     }
// }
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
                data: RateArr
            },
        ]
    };
    window.addEventListener('resize', function () {
        NearlySevenDaysAlarmTOP5.resize();
    });
    NearlySevenDaysAlarmTOP5.setOption(option4);
}
// initNearlySevenDaysAlarmTOP5Data();
//近七天项目告警排名TOP5end
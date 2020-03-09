//接入产品类型占比 会算出每种类型的计数，自行求占比 以产品型号为维度，统计所有项目已接入的不同产品型号的门禁设备数量占比；
var NumberOfEntranceGuardData =
{
    //传入所有门禁产品的ID
    "dataset": "device_realtime_dataset",
    "fields": ["product_name","product_id"],
    "metrics": ["__count(device_id)"],
    "filters": {
        "product_id": {"__in": ["1607d4b6ad8f00011607d4b6ad8f8401"]}, // 列举包含所有产品ID
    }
}
postCall(NumberOfEntranceGuardData, function(resultData) {
    // debugger
    var ACSNameArr = [], RateArr = [];
    var total = resultData.results.length;
    $.each(resultData.results, function (item) {
        ACSNameArr.push(resultData.results[item].product_name);
        var rate = {value:(resultData.results[item].count_device_id/total)*100, name:resultData.results[item].product_name};
        RateArr.push(rate);
    });
    NumberOfEntranceGuard(ACSNameArr, RateArr);
});
//门禁数量
function NumberOfEntranceGuard(ACSNameArr, RateArr){
    var parkUsedRateChart = echarts.init(document.getElementById('parkUsedRateChart'));
    var option1 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}{d}%"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:ACSNameArr,
            textStyle: {
                color: '#FFF'
            },
            padding: 20
        },
        color:['#4472c4','#ed7d31','#a5a5a5'],
        series: [
            {
                name:'门禁数量',
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
        parkUsedRateChart.resize();
    });
    parkUsedRateChart.setOption(option1);
}

//近一月开门方式start
//统计所有项目上月同日期00:00:00开始至昨日23:59:59的时间段内，不同开门方式产生的开门记录数量占比；
var getAccountingForFeesData =
{
    "dataset": "passage_pass_log_dataset",
    "dataset_type": 2,
    "fields": ["open_type"],
    "metrics": ["__count(device_id)"],
    "filters": {
        "log_time": {"__gt": lastMonthDate, "__lte": yesterdayData}
    }
}
postCall(getAccountingForFeesData, function (resultData){
    // debugger
    var TypeNameArr = [], RateArr = [];var open_type_name;var total=0;
    $.each(resultData.results, function (item){
        total += resultData.results[item].count_device_id;
    });
    $.each(resultData.results, function (item) {
        // $.each(open_door_tppe, function () {
        //     open_type_name = open_door_tppe[resultData.results[item].open_type];
        // });
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
    accountingForFees(TypeNameArr, RateArr);
});
function accountingForFees(TypeNameArr, RateArr){
    var accountingForFeesChart = echarts.init(document.getElementById('accountingForFeesChart'));
    var option2 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c}({d}%)"
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
        color:['#ed7d31','#4472c4','#a5a5a5','#ffc000'],
        // color:['#ed7d31','#a5a5a5','#ffc000','#4472c4'],
        series: [
            {
                name:'近一月开门方式',
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
        accountingForFeesChart.resize();
    });
    accountingForFeesChart.setOption(option2);
}
//近一月开门方式end

//APP开门率TOP小区start

// 已授权总人数请用主数据接口
// 问题：长城的开门人员ID应该没对接数据平台，这个功能暂缓
var getAppOpenDoorNumData =
{
    "dataset": "passage_pass_log_dataset",
    "dataset_type": 2,
    "fields": ["project_id","project_name"],
    "metrics": ["__distinct_count(user_id)"],
    "filters": {
        "open_type": '8'
    },
    "options": {
        "limit": 10
    }
}
postCall(getAppOpenDoorNumData, function (resultData) {
    // debugger
    var xAxisData = [], yAxisData = [];
    $.each(resultData.results, function (item) {
        yAxisData.push(resultData.results[item].project_name);
        xAxisData.push(resultData.results[item].distinct_count_user_id);
    });
    appOpenDoorNum(xAxisData, yAxisData)
});
function appOpenDoorNum(xAxisData, yAxisData){
    var appOpenDoorNum = echarts.init(document.getElementById('appOpenDoorNum'));
    var option3 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: "{a} <br/>{b} : {c}",
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
                data: xAxisData
            },
        ]
    };
    window.addEventListener('resize', function () {
        appOpenDoorNum.resize();
    });
    appOpenDoorNum.setOption(option3);
}
//APP开门率TOP小区end


//昨日开门次数异常楼栋start
var getOpenDoorExceptionFloorData =
{
    "dataset": "passage_pass_log_dataset",
    "dataset_type": 2,
    "fields": ["build_id"],
    "metrics": ["__count(log_id)"],
    "filters": {
        "open_status": 0,
        "log_time": {"__trange": "-P2D/-P1D"}
    },
    "sorts": ["-count_log_id"],
    "options": {
        "limit": 10
    }
}
postCall(getOpenDoorExceptionFloorData, function (resultData) {
    // debugger
})
// var getOpenDoorExceptionFloorData =
//     {
//     "Result": true,
//     "Code": 200,
//     "Message": "处理的结果信息",
//     "Data":
//         [
//             {
//                 "BuildName":"长安花园A栋",
//                 "Nums":30,
//                 "Month":7
//             },
//             {
//                 "BuildName":"长城一花园4栋",
//                 "Nums":22,
//                 "Month":7
//             },
//             {
//                 "BuildName":"长城一花园3栋",
//                 "Nums":0,
//                 "Month":7
//             },
//             {
//                 "BuildName":"盛世家园A栋",
//                 "Nums":0,
//                 "Month":7
//             },
//             {
//                 "BuildName":"东海花园10栋",
//                 "Nums":0,
//                 "Month":7
//             }
//         ]
// }
// function  initOpenDoorExceptionFloorData(){
//     if(getOpenDoorExceptionFloorData.Result && getOpenDoorExceptionFloorData.Code===200) {//处理成功
//         var xAxisData = [], yAxisData = [];
//         $.each(getOpenDoorExceptionFloorData.Data, function(item){
//             xAxisData.push(getOpenDoorExceptionFloorData.Data[item].BuildName+'（'+getOpenDoorExceptionFloorData.Data[item].Month+'月份）');
//             yAxisData.push(getOpenDoorExceptionFloorData.Data[item].Nums);
//         })
//         openDoorExceptionFloor(xAxisData, yAxisData)
//     }
//     else{
//         console.log("处理的结果信息" + getOpenDoorExceptionFloorData.Message);
//     }
// }
// function openDoorExceptionFloor(xAxisData, yAxisData){
//     var openDoorExceptionFloor = echarts.init(document.getElementById('openDoorExceptionFloor'));
//     var option4 = {
//         color: ['#3398DB'],
//         tooltip : {
//             trigger: 'axis',
//             formatter: "{a} <br/>{b} : {c}次",
//             axisPointer : {            // 坐标轴指示器,坐标轴触发有效
//                 type : 'shadow'        // 默认为直线,可选为:'line' | 'shadow'
//             }
//         },
//         grid: {
//             left: '3%',
//             right: '4%',
//             bottom: '3%',
//             containLabel: true
//         },
//         xAxis : [
//             {
//                 type : 'value',
//                 axisLine: {
//                     lineStyle: {
//                         color: '#fff',//左边线的颜色
//                     }
//                 },
//                 axisLabel: {
//                     textStyle: {
//                         color: '#fff',//坐标值得具体的颜色
//
//                     }
//                 }
//             }
//         ],
//         yAxis : [
//             {
//                 type : 'category',
//                 data : xAxisData,
//                 axisTick: {
//                     alignWithLabel: true
//                 },
//                 axisLine: {
//                     lineStyle: {
//                         color: '#fff',//左边线的颜色
//                     }
//                 },
//                 axisLabel: {
//                     textStyle: {
//                         color: '#fff',//坐标值得具体的颜色
//
//                     }
//                 }
//             }
//         ],
//         series : [
//             {
//                 name:'昨日开门次数异常楼栋',
//                 type:'bar',
//                 barWidth: '60%',
//                 data:yAxisData
//             }
//         ]
//     };
//     window.addEventListener('resize', function () {
//         openDoorExceptionFloor.resize()
//     });
//     openDoorExceptionFloor.setOption(option4);
// }
//昨日开门次数异常楼栋end
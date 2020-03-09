import {postCall} from '@/assets/js/subProject/fourthSubProject/initToken.js'
import {numberScrollHasEndNum} from '@/assets/js/subProject/fourthSubProject/numberScroll.js'
import $ from 'jquery'
import echarts from 'echarts'
import {lastMonthDate , yesterdayData} from '@/assets/js/subProject/fourthSubProject/initToken.js'
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
            data: ACSNameArr,
            textStyle:{
                color:'#fff',
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
    var TypeNameArr = [], RateArr = [];var open_type_name;var total=0;
    $.each(resultData.results, function (item){
        total += resultData.results[item].count_device_id;
    });
    $.each(resultData.results, function (item) {
        // $.each(open_door_type, function () {
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
            data: TypeNameArr,
            textStyle:{
                color:'#fff',
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
    var xAxisData = [], yAxisData = [];
    $.each(resultData.results, function (item) {
        var strs = resultData.results[item].project_name.split(''); //字符串数组
        var str = '';
        for(var i = 0;i<strs.length;i++) { //遍历字符串数组
            str += strs[i];
            if(!((i + 1)% 4)) str += '\n'; //按需要求余
        }
        yAxisData.push(str);
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
}
//APP开门率TOP小区end


//设备在线率分析start
var onLineCount =
    {
        "dataset": "device_realtime_dataset",
        "metrics": ["__count(device_id)"],
        "filters": {
            "is_online": true
        }
    }
var allCount =
    {
        "dataset": "device_realtime_dataset",
        "metrics": ["__count(device_id)"]
    }

postCall(onLineCount, function (onLineCountData) {
    var onLineCountData = onLineCountData.results.length === 0 ? 0 : onLineCountData.results[0].count_device_id;
    postCall(allCount, function (allCountData) {
        var TypeNameArr = [];var RateArr = [];
        var allCountData = allCountData.results.length === 0 ? 0 : allCountData.results[0].count_device_id;

        TypeNameArr.push('设备在线率');
        RateArr.push({value:onLineCountData, name:'设备在线率'});

        TypeNameArr.push('设备离线率');
        RateArr.push({value:allCountData - onLineCountData, name:'设备离线率'});
        openDoorExceptionFloor(TypeNameArr, RateArr)

    });
});
function openDoorExceptionFloor(TypeNameArr, RateArr){
    var openDoorExceptionFloor = echarts.init(document.getElementById('openDoorExceptionFloor'));
    var option4 = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 40,
            data: TypeNameArr,
            textStyle:{
                color:'#fff',
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
//设备在线率分析end
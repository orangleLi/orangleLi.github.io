//最近一月常见告警TopN
var getDataOfCommonAlarmLastMonth = {
    "Result":  true,
    "Code":  200,
    "Message":  "处理的结果信息",
     "Data": 
        [
            {
                "AlarmName": "变压器温度过高",
                "Nums": 20,
                "Month": 7
            },
            {
                "AlarmName": "管网压力为10",
                "Nums": 10,
                "Month": 7
            }
        ]
}
//以项目为维度，统计不同项目近一周产生的告警数量，按数量从高到低排列；
var getNearlySevenDaysAlarmTOP5Data =
{
    "dataset": "exception_event_dataset",
    "fields": ["exception_type"],
    "metrics": ["__count(event_id)"],
    "filters": {
    "exception_time": {"__gt": lastMonthDate, "__lt": yesterdayData}
    },
    "sorts": ["-count_event_id"]
}
postCall(getNearlySevenDaysAlarmTOP5Data, function (resultData) {
    // debugger
})
perparedCommonAlarmLastMonthData();
function perparedCommonAlarmLastMonthData(){

    if(getDataOfCommonAlarmLastMonth.Result && getDataOfCommonAlarmLastMonth.Code===200) {//处理成功
        var xAxisData = [], yAxisData = [];
        $.each(getDataOfCommonAlarmLastMonth.Data, function(item){
            xAxisData.push(getDataOfCommonAlarmLastMonth.Data[item].AlarmName+'（'+getDataOfCommonAlarmLastMonth.Data[item].Month+'月份）');
            yAxisData.push(getDataOfCommonAlarmLastMonth.Data[item].Nums);
        })
        setCommonAlarmLastMonthChartData(xAxisData, yAxisData);
    }
    else{
        console.log("处理的结果信息" + getDataOfCommonAlarmLastMonth.Message);
    }
}
function setCommonAlarmLastMonthChartData(xAxisData, yAxisData){
    var commonAlarmLastMonth = echarts.init(document.getElementById('commonAlarmLastMonth'));
    var option1 = {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
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
            type: 'value',
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
        series: [{
            data: yAxisData,
            barWidth: '30%',
            type: 'bar'
        }]
    };

    // 图表自适应
    window.addEventListener('resize', function () {
        commonAlarmLastMonth.resize();
    });
    commonAlarmLastMonth.setOption(option1);
}
setInterval(perparedCommonAlarmLastMonthData,60000);//一分钟刷新一次


var exceptionImgName = 'ExclamatoryMarkBig.png'
// 监控平台获取当前消防概况
var getDataOfFireFighting = {
    "Result":  true,
    "Code":  200,
    "Message":  "处理的结果信息",
    "Data": 
        {
            "GanYan": 0,
                "GanWen": 0,
            "ShouBao": 0,
                "XiaoBao": 1,
            "LouDian": 1,
                "ShuiYaLi": 0
        }
};
perparedFireFightingData(getDataOfFireFighting);
function perparedFireFightingData(getDataOfFireFighting){
    var path='./images/GeneralSituationOfFireFighting/';
    if(getDataOfFireFighting.Result && getDataOfFireFighting.Code===200){//处理成功
        if(getDataOfFireFighting.Data.ShuiYaLi){
            $(".waterPressure img").attr('src',path+exceptionImgName);//水压力
            $(".waterPressure img").attr('class',$(".waterPressure img").attr('class') + ' exceptionImg');
        }else{ $(".waterPressure img").attr('src',path+'1.png');}//水压力

        if(getDataOfFireFighting.Data.LouDian){
            $(".ElectricLeakage img").attr('src',path+exceptionImgName);//漏电
            $(".ElectricLeakage img").attr('class',$(".ElectricLeakage img").attr('class') + ' exceptionImg');
        }else{ $(".ElectricLeakage img").attr('src',path+'2.png');}//漏电

        if(getDataOfFireFighting.Data.XiaoBao){
            $(".EliminationOfNewspaper img").attr('src',path+exceptionImgName);//消报
            $(".EliminationOfNewspaper img").attr('class',$(".EliminationOfNewspaper img").attr('class') + ' exceptionImg');
        }else{ $(".EliminationOfNewspaper img").attr('src',path+'3.png');}//消报

        if(getDataOfFireFighting.Data.ShouBao){
            $(".HandReport img").attr('src',path+exceptionImgName);//手报
            $(".HandReport img").attr('class',$(".HandReport img").attr('class') + ' exceptionImg');
        }else{ $(".HandReport img").attr('src',path+'4.png');}//手报

        if(getDataOfFireFighting.Data.GanWen){
            $(".TemperatureSensitivity img").attr('src',path+exceptionImgName);//感温
            $(".TemperatureSensitivity img").attr('class',$(".TemperatureSensitivity img").attr('class') + ' exceptionImg');
        }else{ $(".TemperatureSensitivity img").attr('src',path+'5.png');}//感温

        if(getDataOfFireFighting.Data.GanYan){
            $(".SmokeFeeling img").attr('src',path+exceptionImgName);//感烟
            $(".SmokeFeeling img").attr('class',$(".SmokeFeeling img").attr('class') + ' exceptionImg');
        }else{ $(".SmokeFeeling img").attr('src',path+'6.png');}//感烟

    }
    else{
        console.log("处理的结果信息" + getDataOfFireFighting.Message);
    }
}
setInterval(perparedFireFightingData(getDataOfFireFighting),2000);//两秒刷新一次
// 监控平台获取当前消防概况End



// 监控平台获取当前电梯概况
var getDataOfElevator = {
    "Result":  true,
    "Code":  200,
    "Message":  "处理的结果信息",
    "Data": 
        {
            "ChongDing": 0,
            "DunDi": 0,
            "ChaoSu": 0,
            "KunRen": 1,
            "TingDianGuZhang": 1,
            "KaiGuanMen": 0,
            "AnJian": 1,
            "YiChangZhenDong": 0
        }
};
perparedElevatorData(getDataOfElevator);
function perparedElevatorData() {
    var path1='./images/GeneralSituationOfElevator/';

    if(getDataOfElevator.Result && getDataOfElevator.Code===200){//处理成功
        if(getDataOfElevator.Data.YiChangZhenDong){
            $(".AbnormalVibration img").attr('src',path1+exceptionImgName);//异常震动
            $(".AbnormalVibration img").attr('class',$(".AbnormalVibration img").attr('class') + ' exceptionImg');
        }else{ $(".AbnormalVibration img").attr('src',path1+'1.png');}//异常震动
        if(getDataOfElevator.Data.AnJian){
            $(".KeyAlarm img").attr('src',path1+exceptionImgName);//按键报警
            $(".KeyAlarm img").attr('class',$(".KeyAlarm img").attr('class') + ' exceptionImg');
        }else{ $(".KeyAlarm img").attr('src',path1+'2.png');}//按键报警
        if(getDataOfElevator.Data.KaiGuanMen){
            $(".SwitchDoorAbnormal img").attr('src',path1+exceptionImgName);//开关门异常
            $(".SwitchDoorAbnormal img").attr('class',$(".SwitchDoorAbnormal img").attr('class') + ' exceptionImg');
        }else{ $(".SwitchDoorAbnormal img").attr('src',path1+'3.png');}//开关门异常
        if(getDataOfElevator.Data.TingDianGuZhang){
            $(".PowerOutageFailure img").attr('src',path1+exceptionImgName);//停电故障
            $(".PowerOutageFailure img").attr('class',$(".PowerOutageFailure img").attr('class') + ' exceptionImg');
        }else{ $(".PowerOutageFailure img").attr('src',path1+'4.png');}//停电故障
        if(getDataOfElevator.Data.KunRen){
            $(".Stranded img").attr('src',path1+exceptionImgName);//困人
            $(".Stranded img").attr('class',$(".Stranded img").attr('class') + ' exceptionImg');
        }else{ $(".Stranded img").attr('src',path1+'5.png');}//困人

        if(getDataOfElevator.Data.ChaoSu){
            $(".Speeding img").attr('src',path1+exceptionImgName);//超速
            $(".Speeding img").attr('class',$(".Speeding img").attr('class') + ' exceptionImg');
        }else{ $(".Speeding img").attr('src',path1+'6.png');}//超速
        if(getDataOfElevator.Data.DunDi){
            $(".SquattingBottom img").attr('src',path1+exceptionImgName);//蹲底
            $(".SquattingBottom img").attr('class',$(".SquattingBottom img").attr('class') + ' exceptionImg');
        }else{ $(".SquattingBottom img").attr('src',path1+'7.png');}//蹲底
        if(getDataOfElevator.Data.ChongDing){
            $(".summitAttempt img").attr('src',path1+exceptionImgName);//冲顶
            $(".summitAttempt img").attr('class',$(".summitAttempt img").attr('class') + ' exceptionImg');
        }else{ $(".summitAttempt img").attr('src',path1+'8.png');}//冲顶
    }
    else{
        console.log("处理的结果信息" + getDataOfElevator.Message);
    }
}
setInterval(perparedElevatorData(getDataOfElevator),2000);//两秒刷新一次
// 监控平台获取当前电梯概况End

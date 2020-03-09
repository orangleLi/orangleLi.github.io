//获得 今日停车总收入 数据
import {postCall} from '@/assets/js/subProject/fourthSubProject/initToken.js'
import {numberScrollHasEndNum} from '@/assets/js/subProject/fourthSubProject/numberScroll.js'
import $ from 'jquery'
import echarts from 'echarts'
import store from '@/pages/index/store/store.js'


var TotalInCome =
    {
        "dataset": "vehicle_park_log_dataset",
        "dataset_type": 2,
        "metrics": ["__sum(ss_money)"],
        "filters": {
            "out_time": {"__trange": "-P1D/"}
        }
    };
var TotalInComeStart = 0;
function initTotalInCome(){
    postCall(TotalInCome, function (resultData) {
        var temp = resultData.results[0].sum_ss_money;
        if(TotalInComeStart === temp){
            return;
        }else{

            $("#TotalInCome").text(temp);
            numberScrollHasEndNum(TotalInComeStart, temp, '#TotalInCome');
            TotalInComeStart = temp;
        }
    });
}
initTotalInCome();


// //今日车流量 CarFlowRateIn + CarFlowRateOut
var CarFlowRateIn =
    {
        "dataset": "vehicle_park_log_dataset",
        "dataset_type": 2,
        "metrics": ["__count(log_id)"],
        "filters": {
            "in_time": {"__trange": "-P1D/"}
        }
    }
var CarFlowRateOut =
    {
        "dataset": "vehicle_park_log_dataset",
        "dataset_type": 2,
        "metrics": ["__count(log_id)"],
        "filters": {
            "out_time": {"__trange": "-P1D/"}
        }
    }
var CarFlowRateOutStart = 0;
function initCarFlowRate(){
    postCall(CarFlowRateIn, function (inData) {
        postCall(CarFlowRateOut, function (outData) {
            var temp = outData.results[0].count_log_id + inData.results[0].count_log_id;
            if(CarFlowRateOutStart === temp){
                return;
            }else{
                $("#CarFlowRate").text(temp);
                numberScrollHasEndNum(CarFlowRateOutStart, temp, '#CarFlowRate');
                CarFlowRateOutStart = temp;
            }
        });
    });
}
initCarFlowRate();
setInterval(initCarFlowRate,5000);//5秒刷新一次

// //今日异常放行数
var AbnormalCross =
    {
        "dataset": "abnormal_open_log_dataset",
        "dataset_type": 2,
        "metrics": ["__count(log_id)"],
        "filters": {
            "log_time": {"__trange": "-P1D/"}
        }
    }
    var AbnormalCrossStart = 0;
function initAbnormalCross(){
    postCall(AbnormalCross, function (resultData) {
        var temp = resultData.results[0].count_log_id;
        if(AbnormalCrossStart === temp){
            return;
        }else{
            $("#AbnormalCross").text(temp);
            numberScrollHasEndNum(AbnormalCrossStart, temp, '#AbnormalCross');
            AbnormalCrossStart = temp;
        }
    })
}
initAbnormalCross()
setInterval(initAbnormalCross,5000);//5秒刷新一次


// //出入口数量 结果相加
var GateCount =
    {
        "dataset": "park_info_dataset",
        "dataset_type": 2,
        "metrics": ["__sum(in_park_mount)","__sum(out_park_mount)"]
    }
    var GateCountStart = 0;
function initGateCount(){
    postCall(GateCount, function (resultData) {
        var temp = resultData.results[0].sum_in_park_mount + resultData.results[0].sum_out_park_mount;
        if(GateCountStart === temp){
            return;
        }else{
            $("#GateCount").text(temp);
            numberScrollHasEndNum(GateCountStart, temp, '#GateCount');
            GateCountStart = temp;
        }
    })
}
initGateCount();
setInterval(initGateCount,5000);//5秒刷新一次

// //当前车位使用率 公式自行计算
var getParkUsedRate = {
    dataset: "park_info_dataset",
    dataset_type: 2,
    metrics: ["__sum(all_book_space)","__sum(rest_book_space)"]
}
postCall(getParkUsedRate, function (resultData) {
    parkUsedRate((((resultData.results[0].sum_all_book_space-resultData.results[0].sum_rest_book_space)/resultData.results[0].sum_all_book_space)*100).toFixed(2));
})

function parkUsedRate(LotUseRate) {
    var parkUsedRateChart = echarts.init(document.getElementById('parkUsedRateChart'));
    var option = {
        tooltip : {
            formatter: "{a} <br/>{c}%"
        },
        series: [
            {
                name: '车位使用率',
                type: 'gauge',
                title:{
                    textStyle: {
                        color:"#FFF"
                    }
                },
                detail: {
                    formatter:'{value}%',
                    // textStyle: {
                    //     color: '#fff',
                    //     fontSize: '16',
                    //     padding: 20,
                    // }
                    color: '#fff',
                    fontSize: '16',
                    padding: [50, 0, 0, 0],
                },
                data: [{value: LotUseRate,textStyle:{ color: '#fff'}}]
            }
        ]
    };

    // 图表自适应
    window.addEventListener('resize',function () {
        parkUsedRateChart.resize();
    });
    parkUsedRateChart.setOption(option);
}

// //本月收费方式占比 会算出每种开门方式的记录数，自行求占比
//统计所有项目从本月1日00:00:00开始至当前时间，所有出场记录中不同支付方式的占比
var nowData='';
function getParamDate(){
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth();//得到月份
    var date = now.getDate();//得到昨天的日期
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    nowData = year+"-"+month+"-"+date+"T00:00:00.000+0800";
}
getParamDate();
var getAccountingForFeesData =
    {
        "dataset": "vehicle_park_log_dataset",
        "dataset_type": 2,
        "fields": ["pay_type"],
        "metrics": ["__count(log_id)"],
        "filters": {
            "out_time": {"__gt": nowData}
        }
    }
postCall(getAccountingForFeesData, function (resultData) {
    // debugger
    var MTCNameArr = [], RateArr = [];
    $.each(resultData.results, function(item){
        //0:现金，1:微信，2:支付宝，3:其他
        var pay_type_name=''
       switch (resultData.results[item].pay_type) {
           case 0:pay_type_name = '现金'
               break;
           case 1:pay_type_name = '微信'
               break;
           case 2:pay_type_name = '支付宝'
               break;
           case 3:pay_type_name = '其他'
               break;
       }
        MTCNameArr.push(pay_type_name);
        var rate = {value:resultData.results[item].count_log_id, name:pay_type_name};
        RateArr.push(rate);
    });
    accountingForFees(MTCNameArr, RateArr);
});
//收费方式占比
function accountingForFees(MTCNameArr, RateArr) {
    var accountingForFeesChart = echarts.init(document.getElementById('accountingForFeesChart'));
    var option1 = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 30,
            data: MTCNameArr,
            textStyle:{
                color:'#fff',
            }
        },
        color:['#749f83','#c4ccd3','#61a0a8','#c23531','#546570','#ca8622','#91c7ae','#d48265','#6e7074','#bda29a','2f4554'],
        series : [
            {
                name: '收费方式占比',
                type: 'pie',
                radius : ['40%', '60%'],
                data:RateArr,
                itemStyle:{
                    normal:{
                        label:{
                            show: true,
                            formatter: '{b} : {d}% ({c})',
                            fontSize: 12,
                        },
                        labelLine :{
                            show:true,
                            length: 10,
                            length2: 6
                        }
                    }
                }
            }
        ]
    };

    // 图表自适应
    window.addEventListener('resize',function () {
        accountingForFeesChart.resize()
    });
    accountingForFeesChart.setOption(option1);
}


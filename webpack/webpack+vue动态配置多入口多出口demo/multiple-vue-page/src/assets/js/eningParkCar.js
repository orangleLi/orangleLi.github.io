// //获得 今日停车总收入 数据
var TotalInCome =
{
    "dataset": "vehicle_park_log_dataset",
    "dataset_type": 2,
    "metrics": ["__sum(ss_money)"],
    "filters": {
        "out_time": {"__trange": "-P1D/"}
    }
};
postCall(TotalInCome, function (resultData) {
    // debugger
    $("#TotalInCome").text(resultData.results[0].sum_ss_money);
});

setInterval(function () {
    postCall(TotalInCome, function (resultData) {
        $("#TotalInCome").text(resultData.results[0].sum_ss_money);
    });
},5000);//5秒刷新一次

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
function initCarFlowRate(){
    postCall(CarFlowRateOut, function (outData) {
        postCall(CarFlowRateIn, function (inData) {
            $("#CarFlowRate").text(outData.results[0].count_log_id + inData.results[0].count_log_id);
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
postCall(AbnormalCross, function (resultData) {
    $("#AbnormalCross").text(resultData.results[0].count_log_id);
})

setInterval(function () {
    postCall(AbnormalCross, function (resultData) {
        $("#AbnormalCross").text(resultData.results[0].count_log_id);
    })
},5000);//5秒刷新一次


// //出入口数量 结果相加
var GateCount =
    {
        "dataset": "park_info_dataset",
        "dataset_type": 2,
        "metrics": ["__sum(in_park_mount)","__sum(out_park_mount)"]
    }
postCall(GateCount, function (resultData) {
    $("#GateCount").text(resultData.results[0].sum_in_park_mount + resultData.results[0].sum_out_park_mount);
})
setInterval(function () {
    postCall(GateCount, function (resultData) {
        $("#GateCount").text(resultData.results[0].sum_in_park_mount + resultData.results[0].sum_out_park_mount);
    })
},5000);//5秒刷新一次

// //当前车位使用率 公式自行计算
var getParkUsedRate = {
    dataset: "park_info_dataset",
    dataset_type: 2,
    metrics: ["__sum(all_book_space)","__sum(rest_book_space)"]
}
postCall(getParkUsedRate, function (resultData) {
    parkUsedRate((((resultData.results[0].sum_all_book_space-resultData.results[0].sum_rest_book_space)/resultData.results[0].sum_all_book_space)*100).toFixed(2));
})
function parkUsedRate(rate) {
    var parkUsedRateChart = echarts.init(document.getElementById('parkUsedRateChart'));
    var option = {
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
                name: '车位使用率',
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
                        fontSize: '14',
                    }
                },
                data: [{value: 50,textStyle:{ color: '#fff'}}]
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
    debugger
    var MTCNameArr = [], RateArr = [];var total=0;
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
        total += resultData.results[item].count_log_id;
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
        tooltip: {
            trigger: 'item',
            // formatter: "{a} <br/>{b}: {c} ({d}%)"
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:MTCNameArr,
            textStyle: {
                color: '#FFF'
            },
            padding: 20
        },
        color:['#ed7d31','#4472c4'],
        series: [
            {
                name:'收费方式占比',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold',
                            color: '#fff'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                data:RateArr
            }
        ]
    };

    // 图表自适应
    window.addEventListener('resize',function () {
        accountingForFeesChart.resize()
    });
    accountingForFeesChart.setOption(option1);
}


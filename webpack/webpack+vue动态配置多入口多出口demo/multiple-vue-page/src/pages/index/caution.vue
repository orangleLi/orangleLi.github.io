<template>
    <div class="container5 container">
        <ul class="cautionFooter">
            <li>
                <div class="bgImg"></div>
                <!--<img class="bgImg" src="../../assets/images/rect.png">-->
                <div class="cautionFootTitle">
                    <img src="../../assets/images/circle.png">
                    <span>最近一月常见告警</span>
                </div>
                <div id="commonAlarmLastMonth" class="cautionContentChart"></div>
            </li>
            <li>
                <div class="bgImg"></div>
                <div class="cautionFootTitle">
                    <img src="../../assets/images/circle.png">
                    <span>消防概况</span>
                </div>
                <div id="GeneralSituationOfFireFighting" class="cautionContentChart">
                    <img src="../../assets/images/GeneralSituationOfFireFighting/polygon.png" class="bgPolygon">
                    <div class="exclamatoryMark"><img src="../../assets/images/GeneralSituationOfElevator/normal.png"><span class="">&nbsp;正常</span></div>

                    <div class="waterPressure iconException">
                        <span class="contentInfo">水压力</span>
                        <img src="../../assets/images/GeneralSituationOfFireFighting/1.png" class="iconCls">
                        <img src="../../assets/images/GeneralSituationOfFireFighting/ExclamatoryMarkBig.png" class="iconCls exception exceptionImg">
                    </div>    <!--水压力-->

                    <div class="ElectricLeakage iconException">
                        <span class="contentInfo">漏电</span><!--漏电-->
                        <img src="../../assets/images/GeneralSituationOfFireFighting/2.png" class="iconCls">
                        <img src="../../assets/images/GeneralSituationOfFireFighting/ExclamatoryMarkBig.png" class="iconCls exception exceptionImg">
                    </div>   <!--漏电-->

                    <div class="EliminationOfNewspaper iconException">
                        <span class="contentInfoBottom">消报</span> <!--消报-->
                        <img src="../../assets/images/GeneralSituationOfFireFighting/3.png" class="iconCls">
                        <img src="../../assets/images/GeneralSituationOfFireFighting/ExclamatoryMarkBig.png" class="iconCls exception exceptionImg">
                    </div>  <!--消报-->

                    <div class="HandReport iconException">
                        <span class="contentInfoLeft">手报</span> <!--手报-->
                        <img src="../../assets/images/GeneralSituationOfFireFighting/4.png" class="iconCls">
                        <img src="../../assets/images/GeneralSituationOfFireFighting/ExclamatoryMarkBig.png" class="iconCls exception exceptionImg">
                    </div>  <!--手报-->

                    <div class="TemperatureSensitivity iconException">
                        <span class="contentInfoLeft">感温</span> <!--感温-->
                        <img src="../../assets/images/GeneralSituationOfFireFighting/5.png" class="iconCls">
                        <img src="../../assets/images/GeneralSituationOfFireFighting/ExclamatoryMarkBig.png" class="iconCls exception exceptionImg">
                    </div>  <!--感温-->

                    <div class="SmokeFeeling iconException">
                        <span class="contentInfoTop">感烟</span>  <!--感烟-->
                        <img src="../../assets/images/GeneralSituationOfFireFighting/6.png" class="iconCls">
                        <img src="../../assets/images/GeneralSituationOfFireFighting/ExclamatoryMarkBig.png" class="iconCls exception exceptionImg">
                    </div>  <!--感烟-->

                </div>
            </li>
            <li>
                <div class="bgImg"></div>
                <div class="cautionFootTitle">
                    <img src="../../assets/images/circle.png">
                    <span>电梯概况</span>
                </div>
                <div id="GeneralSituationOfElevator" class="cautionContentChart">
                    <img src="../../assets/images/GeneralSituationOfElevator/polygon.png" class="bgPolygon">
                    <div class="exclamatoryMark exclamatoryMarkSecond"><img src="../../assets/images/GeneralSituationOfElevator/normal.png"><span>&nbsp;正常</span></div>

                    <div class="AbnormalVibration iconException">
                        <span class="contentInfoLeft">异常震动</span>
                        <img src="../../assets/images/GeneralSituationOfElevator/1.png" class="iconCls">
                        <img src="../../assets/images/GeneralSituationOfFireFighting/ExclamatoryMarkBig.png" class="iconCls exception exceptionImg">
                    </div>

                    <div class="KeyAlarm iconException">
                        <span class="contentInfoLeft">按键报警</span>
                        <img src="../../assets/images/GeneralSituationOfElevator/2.png" class="iconCls">
                        <img src="../../assets/images/GeneralSituationOfFireFighting/ExclamatoryMarkBig.png" class="iconCls exception exceptionImg">
                    </div>

                    <div class="SwitchDoorAbnormal iconException">
                        <span class="contentInfoBottom">开关门异常</span>
                        <img src="../../assets/images/GeneralSituationOfElevator/3.png" class="iconCls">
                        <img src="../../assets/images/GeneralSituationOfFireFighting/ExclamatoryMarkBig.png" class="iconCls exception exceptionImg">
                    </div>

                    <div class="PowerOutageFailure iconException">
                        <span class="contentInfoBottom">停电故障</span>
                        <img src="../../assets/images/GeneralSituationOfElevator/4.png" class="iconCls">
                        <img src="../../assets/images/GeneralSituationOfFireFighting/ExclamatoryMarkBig.png" class="iconCls exception exceptionImg">
                    </div>

                    <div class="Stranded iconException">
                        <span class="contentInfo">困人</span>
                        <img src="../../assets/images/GeneralSituationOfElevator/5.png" class="iconCls">
                        <img src="../../assets/images/GeneralSituationOfFireFighting/ExclamatoryMarkBig.png" class="iconCls exception exceptionImg">
                    </div>


                    <div class="Speeding iconException">
                        <span class="contentInfo">超速</span>
                        <img src="../../assets/images/GeneralSituationOfElevator/6.png" class="iconCls">
                        <img src="../../assets/images/GeneralSituationOfFireFighting/ExclamatoryMarkBig.png" class="iconCls exception exceptionImg">
                    </div>

                    <div class="SquattingBottom iconException">
                        <span class="contentInfoTop">蹲底</span>
                        <img src="../../assets/images/GeneralSituationOfElevator/7.png" class="iconCls">
                        <img src="../../assets/images/GeneralSituationOfFireFighting/ExclamatoryMarkBig.png" class="iconCls exception exceptionImg">
                    </div>

                    <div class="summitAttempt iconException">
                        <span class="contentInfoTop">冲顶</span>
                        <img src="../../assets/images/GeneralSituationOfElevator/8.png" class="iconCls">
                        <img src="../../assets/images/GeneralSituationOfFireFighting/ExclamatoryMarkBig.png" class="iconCls exception exceptionImg">
                    </div>
                </div>
                <!--<span class="titleCls">电梯概况</span>-->
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
        name: "caution",
        data() {
            return {
                cautionParams: this.$store.state.cautionParams,
            }
        },
        methods: {
            initCommonAlarmLastMonthChart(){
                var _this = this;
                postCall(_this.cautionParams.getNearlySevenDaysAlarmTOP5Data, function (resultData) {
                    var xAxisData = [], yAxisData = [];
                    $.each(resultData.results, function (item) {
                        xAxisData.push(resultData.results[item].exception_type + resultData.results[item].count_event_id);
                        yAxisData.push(resultData.results[item].count_event_id);
                    });
                   _this.setCommonAlarmLastMonthChartData(xAxisData, yAxisData);
                });
            },
            setCommonAlarmLastMonthChartData(xAxisData, yAxisData){
                var commonAlarmLastMonth = echarts.init(document.getElementById('commonAlarmLastMonth'));
                var option1 = {
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b}: {c}次"
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
                        type: 'bar',
                        itemStyle:{
                            normal:{
                                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                color: function (params){
                                    var colorList = ['#91c7ae','#546570','#c4ccd3','#61a0a8','#749f83','#ca8622','#c23531','#d48265','#6e7074','#bda29a','2f4554'];
                                    return colorList[params.dataIndex];
                                }
                            }
                        },
                    }]
                };

                // 图表自适应
                window.addEventListener('resize', function () {
                    commonAlarmLastMonth.resize();
                });
                commonAlarmLastMonth.setOption(option1);
            },
            initElevatorData(){
                var _this = this;
                postCall(_this.cautionParams.getDataOfElevator, function (resultData) {
                    if(resultData.results.length===0)return;//返回空数组，说明无异常信息

                    $(".exclamatoryMarkSecond img").attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRCMzUxOUQ0QUMxRjExRTg4ODFEREFGODgzRDY4NjNBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRCMzUxOUQ1QUMxRjExRTg4ODFEREFGODgzRDY4NjNBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEIzNTE5RDJBQzFGMTFFODg4MUREQUY4ODNENjg2M0EiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEIzNTE5RDNBQzFGMTFFODg4MUREQUY4ODNENjg2M0EiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4BbGEDAAADFUlEQVR42ryW30sUURTHvzOzu+66m5K5sposW0n2QzIwIpOEeqighH5ARNBDf0AQQWD01ktFRD0EPQdFFIT10G8ks3qR7AdlWSQFoq6wuWhqrjs70/dss7WJszsbtIf9zMzO3Hu/nHvvOfcoQ69q4MDqyVaynqwiYev9IHlPesgj8iHfQEoeQRE5THbCmd0hF8l9uwaqzfsAuUoeFCAmtoPcI9dImVNBmbI+cmDuB9O6BEoN+H0GTNNWeL81xpp8gstJb9Ya/WVGSkF1lY4E7/whVJlCSlfsRGvJC7LCTtBDnhHvfL3FmVB1Ercf+9HcFkHLngi6e70IhpK5pthNnmaPmS14nQTteno9Jkx6034+iIGBUvT3BXDy0iJ4fSY0Nee6VpIbcwVbyK5cvVwaMDGhQZUZdItXSeiGAmNK5Tsz32ZqIxuzBU/l6yEbRNNMlNBTmH+8lhFMZzv4bEZwCdmE/2/i4VIR3IPi2V4RbC6i4AYRXFlEwXoRrCqiYLUI6k5aKgwHw2AwSGaxkkv62SxI0C2Co05apijmY5BPTlMkyaCEhh8zCtSSghSjIvjJScuZhAIvk/axQ2PMAgbc/iSOHIxDT3GKUopTwX45D4/y4ZyTwBdqQzqGYy64PQaC5QYGh9zQXI69PCEedjhpKWIeyae8x8dVjIy4oXMNvTymZG0d2k0R/EKe52vpcgEVFSm0X6hEQ2sdGrcsw3E+VyxMpb85MDmqPmZKjFbyJFfrKor1ffZg7fYI3VV+JUXu7567X9G0OoFoTMsnuJl0ZZJ3t1WP2FqSg5ct4NwJOgefJQED5WVG+lsekwKra+55uI/E7XqMjWsI1yZx5fQoIpEZhMMJXD4TRV1kFrF4Tu/GJYfaVW0N5HU6yObZNGKLa3SMcvrkv5QYQyOu34nBplBoJG/tapp3pEkCdL5MIzZMAZ/bhJ8BPxzNKSYJZV22mF3V9sbytMNOdHJaxfcpNZfYLWuMl07r0m/WOSmlQWcBqavT6rObxP6l8s6YrMM2q9SX4yyUyY1WeS+l/kNr/XPaTwEGAGau6xhHxjWdAAAAAElFTkSuQmCC');
                    $(".exclamatoryMarkSecond span").text(' 异常');
                    $.each(resultData.results, function(item){
                        _this.perparedElevatorData(resultData.results[item].exception_type);
                    });
                });
            },
            perparedElevatorData(exception_tpye) {
                //超重 超速 困人 坠落
                switch (exception_tpye) {
                    case '异常震动':
                        $(".AbnormalVibration img").show();
                        break;
                    case '按键报警':
                        $(".KeyAlarm img").show();
                        break;
                    case '开关门异常':
                        $(".SwitchDoorAbnormal img").show();
                        break;
                    case '停电故障':
                        $(".PowerOutageFailure img").show();
                        break;
                    case '困人':
                        $(".Stranded img").show();
                        break;
                    case '超速':
                        $(".Speeding img").show();
                        break;
                    case '蹲底':
                        $(".SquattingBottom img").show();
                        break;
                    case '冲顶':
                        $(".summitAttempt img").show();
                        break;
                }
            },
            perparedFireFightingData(getDataOfFireFighting){
                var path='../../../images/GeneralSituationOfFireFighting/';
                if(getDataOfFireFighting.Result && getDataOfFireFighting.Code===200){//处理成功
                    if(getDataOfFireFighting.Data.ShuiYaLi){
                        $(".waterPressure img:nth-of-type(1)").show();//水压力
                        $(".waterPressure img:nth-of-type(2)").css('display','none');
                    }

                    if(getDataOfFireFighting.Data.LouDian){
                        $(".ElectricLeakage img:nth-of-type(1)").show();//漏电
                        $(".ElectricLeakage img:nth-of-type(2)").css('display','none');
                    }

                    if(getDataOfFireFighting.Data.XiaoBao){
                        $(".EliminationOfNewspaper img:nth-of-type(1)").show();//消报
                        $(".EliminationOfNewspaper img:nth-of-type(2)").css('display','none');
                    }

                    if(getDataOfFireFighting.Data.ShouBao){
                        $(".HandReport img:nth-of-type(1)").show();//手报
                        $(".HandReport img:nth-of-type(2)").css('display','none');
                    }

                    if(getDataOfFireFighting.Data.GanWen){
                        $(".TemperatureSensitivity img:nth-of-type(1)").show();//感温
                        $(".TemperatureSensitivity img:nth-of-type(2)").css('display','none');
                    }

                    if(getDataOfFireFighting.Data.GanYan){
                        $(".SmokeFeeling img:nth-of-type(1)").show();//感烟
                        $(".SmokeFeeling img:nth-of-type(2)").css('display','none');
                    }

                }
                else{
                    console.log("处理的结果信息" + getDataOfFireFighting.Message);
                }
            }
        },
        mounted(){
            var _this = this;
            _this.initCommonAlarmLastMonthChart();
            _this.initElevatorData();

            setInterval(function () {
                _this.initElevatorData();
            },5000)

        }

    }
</script>

<style scoped>

</style>
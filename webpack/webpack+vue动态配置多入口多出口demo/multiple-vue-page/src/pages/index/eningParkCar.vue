<template>
    <div class="container">
        <div class="title">
            <img src="../../assets/images/pic22.png">
            <span>一应停车</span>
        </div>
        <ul class="content">
            <li class="dataCls">
                <img src="../../assets/images/dataBg.png">
                <div class="data">
                    <p class="dataTitle">今日总收入</p>
                    <p class="dataContent"><span id="TotalInCome" class="TotalInComeTimer">0</span><span class="dataTitle"> 元</span></p>
                </div>
            </li>
            <li class="dataCls">
                <img src="../../assets/images/dataBg.png">
                <div class="data">
                    <p class="dataTitle">车流量</p>
                    <p class="dataContent"><span id="CarFlowRate" class="CarFlowRateTimer">0</span><span class="dataTitle"> 辆</span></p>
                </div>
            </li>
            <li class="dataCls">
                <img src="../../assets/images/dataBg.png">
                <div class="data">
                    <p class="dataTitle">异常放行</p>
                    <p class="dataContent"><span id="AbnormalCross" class="AbnormalCrossTimer">0</span><span class="dataTitle"> 次</span></p>
                </div>
            </li>
            <li class="dataCls">
                <img src="../../assets/images/dataBg.png">
                <div class="data">
                    <p class="dataTitle">出入口数量</p>
                    <p class="dataContent"><span id="GateCount" class="GateCountTimer">0</span><span class="dataTitle"> 个</span></p>
                </div>
            </li>
        </ul>
        <ul class="footer">
            <li>
                <!--<img class="bgImg" src="../../assets/images/rect.png">-->
                <div class="bgImg"></div>
                <div class="footTitle">
                    <img src="../../assets/images/circle.png">
                    <span>当前车位使用率</span>
                </div>
                <div id="parkUsedRateChart" class="contentChart"></div>
            </li>
            <li>
                <!--<img class="bgImg" src="../../assets/images/rect.png">-->
                <div class="bgImg"></div>
                <div class="footTitle">
                    <span><img src="../../assets/images/circle.png"></span>
                    <span>收费方式占比</span>
                </div>
                <div id="accountingForFeesChart" class="contentChart"></div>
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
        name: "eningParkCar",
        data () {
            return {
                eningParkCarParams: this.$store.state.eningParkCarParams,

            }
        },
        methods:{
            initTotalInCome(){
                var _this = this;
                postCall(_this.eningParkCarParams.TotalInCome, function (resultData) {
                    var temp = resultData.results[0].sum_ss_money;
                    if(_this.eningParkCarParams.TotalInComeStart === temp){
                        return;
                    }else{
                        $("#TotalInCome").text(temp);
                        numberScrollHasEndNum(_this.eningParkCarParams.TotalInComeStart, temp, '#TotalInCome');
                        _this.eningParkCarParams.TotalInComeStart = temp;
                        // store.state.eningParkCarData[0].TotalInComeSave = temp;
                    }
                });
            },
            initCarFlowRate(){
                var _this = this;
                postCall(_this.eningParkCarParams.CarFlowRateIn, function (inData) {
                    postCall(_this.eningParkCarParams.CarFlowRateOut, function (outData) {
                        var temp = outData.results[0].count_log_id + inData.results[0].count_log_id;
                        if(_this.eningParkCarParams.CarFlowRateOutStart === temp){
                            return;
                        }else{
                            $("#CarFlowRate").text(temp);
                            numberScrollHasEndNum(_this.eningParkCarParams.CarFlowRateOutStart, temp, '#CarFlowRate');
                            _this.eningParkCarParams.CarFlowRateOutStart = temp;
                        }
                    });
                });
            },
            initAbnormalCross(){
                var _this = this;
                postCall(_this.eningParkCarParams.AbnormalCross, function (resultData) {
                    var temp = resultData.results[0].count_log_id;
                    if(_this.eningParkCarParams.AbnormalCrossStart === temp){
                        return;
                    }else{
                        $("#AbnormalCross").text(temp);
                        numberScrollHasEndNum(_this.eningParkCarParams.AbnormalCrossStart, temp, '#AbnormalCross');
                        _this.eningParkCarParams.AbnormalCrossStart = temp;
                    }
                })
            },
            initGateCount(){
                var _this = this;
                postCall(_this.eningParkCarParams.GateCount, function (resultData) {
                    var temp = resultData.results[0].sum_in_park_mount + resultData.results[0].sum_out_park_mount;
                    if(_this.eningParkCarParams.GateCountStart === temp){
                        return;
                    }else{
                        $("#GateCount").text(temp);
                        numberScrollHasEndNum(_this.eningParkCarParams.GateCountStart, temp, '#GateCount');
                        _this.eningParkCarParams.GateCountStart = temp;
                    }
                })
            },
            parkUsedRate(LotUseRate) {
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
            },
            initParkUsedRate(){
                var _this = this;
                postCall(_this.eningParkCarParams.getParkUsedRate, function (resultData) {
                    _this.parkUsedRate((((resultData.results[0].sum_all_book_space-resultData.results[0].sum_rest_book_space)/resultData.results[0].sum_all_book_space)*100).toFixed(2));
                })
            },
            getParamDate(){
                var now = new Date();
                var year = now.getFullYear(); //得到年份
                var month = now.getMonth();//得到月份
                var date = now.getDate();//得到昨天的日期
                month = month + 1;
                if (month < 10) month = "0" + month;
                if (date < 10) date = "0" + date;
                this.eningParkCarParams.getAccountingForFeesData.filters.out_time.__gt = year+"-"+month+"-"+date+"T00:00:00.000+0800";
            },
            initAccountingForFeesData(){
                var _this = this;
                postCall(_this.eningParkCarParams.getAccountingForFeesData, function (resultData) {
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
                    _this.accountingForFees(MTCNameArr, RateArr);
                });
            },
            accountingForFees(MTCNameArr, RateArr) {
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
                        itemGap: 5,
                        data: MTCNameArr,
                        itemWidth: 12,
                        textStyle:{
                            color:'#fff',
                            fontSize: 10
                        }
                    },
                    color:['#749f83','#c4ccd3','#61a0a8','#c23531','#546570','#ca8622','#91c7ae','#d48265','#6e7074','#bda29a','2f4554'],
                    series : [
                        {
                            name: '收费方式占比',
                            type: 'pie',
                            radius : ['40%', '70%'],
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
        },
        mounted() {
            var _this = this;
            _this.initTotalInCome();
            _this.initCarFlowRate();
            _this.initAbnormalCross();
            _this.initGateCount();
            _this.initParkUsedRate();
            _this.getParamDate();
            _this.initAccountingForFeesData();

            setInterval(function () {
                _this.initTotalInCome();
                _this.initCarFlowRate();
                _this.initAbnormalCross();
                _this.initGateCount();
            }, 5000)
        },
        store
    }
</script>

<style scoped>

</style>
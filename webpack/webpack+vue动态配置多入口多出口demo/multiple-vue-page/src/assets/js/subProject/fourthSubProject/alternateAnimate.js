/**
 * Created by Tim on 2016/6/29.
 */
"use strict";
/*设置和更新标题中的日期*/
export var setTitleDate=function (options){
    var that=this;

    that. options={
        date:null,
            year:null,
            month:null,
            day:null,
            hour:null,
            minute:null,
            second:null,
            timer:null
    };

    for(var item in options){
        that.options[item]=options[item];
    }

    that.setTimer();
}
setTitleDate.prototype={
    init:function () {
        var that=this;
        var options=that.options;
        options.date=new Date();

        options.year=that.checkParse(options.date.getFullYear());
        options.month=that.checkParse(options.date.getMonth()+1);
        options.day=that.checkParse(options.date.getDate());

        options.weekDay=that.convertToWeek(options.date.getDay());

        options.hour=that.checkParse(options.date.getHours());
        options.minute=that.checkParse(options.date.getMinutes());
        options.second=that.checkParse(options.date.getSeconds());
    },
    setTimer:function(){
        var that=this;
        var options=that.options;

        clearTimeout(that.options.timer);

        that.options.timer=setTimeout(function(){
            that.init();
//<div class="dateInfo"><span class="fontCls numberFont">0000</span>年<span class="fontCls numberFont"> 0</span>月<span class="fontCls numberFont"> 0</span>日
// 星期<span class="fontCls">一   <span class="numberFont">00:00</span></span> </div>
            var content='<span class="fontCls numberFont">'+options.year+'</span>年<span class="fontCls numberFont">'+options.month+'</span>月<span class="fontCls numberFont">'+options.day+'</span>日'
                +'  星期<span class="fontCls">'+options.weekDay+'  <span class="numberFont">'+options.hour+':'+options.minute+'</span></span>';

            that.addHtml(content);
        },1000);
    },
    checkParse:function (num) {
        if(num<10){
            num=0+''+num;
        }
        return num;
    },
    convertToWeek:function(num){
        var weekDay='';
        switch(num){
            case 1:
                weekDay='一';
                break;
            case 2:
                weekDay='二';
                break;
            case 3:
                weekDay='三';
                break;
            case 4:
                weekDay='四';
                break;
            case 5:
                weekDay='五';
                break;
            case 6:
                weekDay='六';
                break;
            default:
                weekDay='日';
                break;
        }
        return weekDay;
    },
    addHtml:function (content) {
        var that=this;

        that.clearHtml();

        that.options.ele.innerHTML=content;

        that.setTimer();
    },
    clearHtml:function () {
        var that=this;

        that.options.ele.innerHTML='';
    }
}
/*设置和更新标题中的日期*/
/*设置告警和预警数据数据交互动画*/
var setWarnAnimate=function (warnNum,options) {
    var that=this;

    that.options={//配置项
        ele:null,
        initWarnNum:null,
        warnNum:null,
        arrWarnNum:null
    };

    for(var item in options){
        that.options[item]=options[item];
    }

    that.init(warnNum);
}
setWarnAnimate.prototype={
    init:function (warnNum) {
        var that=this;

        if(that.comparedWarnNum(warnNum)){
            that.setWarnNum(warnNum);

            if(that.isInitWarnNum()){
                that.initContent();
            }

            that.setTimer();
        }
    },
    split:function () {//分离数据
        var that=this;
        var arrWarnNum=that.options.warnNum.toString().split('');
        var newArrWarnNum=[];
        var len=arrWarnNum.length;

        for(var i=0;i<len;i++){
            var temp={value:arrWarnNum[i]};
            newArrWarnNum.push(temp);
        }

        return newArrWarnNum;
    },
    setInitWarnNum:function (){//设置初始数据
        var that=this;

        that.options.initWarnNum=that.options.warnNum;
    },
    setWarnNum:function (warnNum) {//设置数据
        var that=this;

        that.options.warnNum=warnNum;

        that.setArrWarnNum();
    },
    getWarnNum:function (newWarnNum) {//获取数据
        var that=this;

        that.init(newWarnNum);
    },
    setArrWarnNum:function () {//设置数据对象
        var that=this;
        var options=that.options;
        var arrWarnNum=options.arrWarnNum=that.split(options.warnNum);

        var len=arrWarnNum.length;

        for(var i=0;i<len;i++){
            arrWarnNum[i].num=0;
            arrWarnNum[i].timer=null;
            arrWarnNum[i].disc=0;
        }
    },
    comparedWarnNum:function (warnNum) {//对比原有的数据和新传入的数据
        var that=this;

        return that.options.warnNum!=warnNum;
    },
    isInitWarnNum:function () {//判断已初始化最新数据
        var that=this;

        if(that.options.initWarnNum){
            return that.options.initWarnNum.toString().length!=that.options.warnNum.toString().length;
        }else{
            return !that.options.initWarnNum;
        }
    },
    isEqualArrWanNumLen:function (index) {//判断当前索引是否等于数据的组后一个索引值
        var that=this;
        var len=that.options.arrWarnNum.length-1;

        return len==index;
    },
    setTimer:function () {//开启定时动画
        var that=this;
        var options=that.options;

        that.enterAnimate();
    },
    enterAnimate:function () {//动画
        var that=this;
        var options=that.options;
        var arrWarnNum=options.arrWarnNum;
        var len=arrWarnNum.length;

        for(var i=0;i<len;i++){
            arrWarnNum[i].index=i;
            var dataValue=$('#'+options.id+'_'+arrWarnNum[i].index).attr('data-vlue');
            var moveNum=0;
            if(dataValue!=undefined&&!that.isInitWarnNum()){
                moveNum=arrWarnNum[i].value-dataValue;

                if(moveNum<0){
                    $('#'+options.id+'_'+arrWarnNum[i].index).css({top:0+'px'});
                    moveNum=arrWarnNum[i].value;
                }
            }else{
                moveNum=arrWarnNum[i].value;
            }
            that.warnNumMove(arrWarnNum[i],moveNum);
        }
    },
    initContent:function () {//初始化that.options.ele对象内容
        var that=this;
        var options=that.options;
        var arrWarnNum=options.arrWarnNum;
        var len=arrWarnNum.length;

        var content='';

        for(var i=0;i<len;i++){
            content+= '<span id="'+options.id+'_'+i+'">'
                +'<i id="'+options.id+'_'+i+'_0">0</i>'
                +'<i id="'+options.id+'_'+i+'_1">1</i>'
                +'<i id="'+options.id+'_'+i+'_2">2</i>'
                +'<i id="'+options.id+'_'+i+'_1">3</i>'
                +'<i id="'+options.id+'_'+i+'_2">4</i>'
                +'<i id="'+options.id+'_'+i+'_1">5</i>'
                +'<i id="'+options.id+'_'+i+'_2">6</i>'
                +'<i id="'+options.id+'_'+i+'_1">7</i>'
                +'<i id="'+options.id+'_'+i+'_2">8</i>'
                +'<i id="'+options.id+'_'+i+'_2">9</i>'
            +'</span>'
        }

        options.ele.innerHTML=content;

        that.setInitWarnNum();
    },
    warnNumMove:function (obj,moveNum) {//数据移动动画执行
        var that=this;
        var options=that.options;

        obj.disc=36*moveNum;

        $('#'+options.id+'_'+obj.index).attr('data-vlue',obj.value);

        obj.timer=setInterval(function () {
            var speed=(obj.disc/8).toFixed(1);
            obj.disc=obj.disc-speed;

            var temp_top=parseFloat($('#'+options.id+'_'+obj.index).css('top'))-speed;
            $('#'+options.id+'_'+obj.index).css({top:temp_top+'px'});
            if(speed<=0){
                clearInterval(obj.timer);
            }
            //console.log(speed);
            //console.log($('#'+options.id+'_'+obj.index));
        },30);
    }
}
/*设置告警和预警数据数据交互动画*/
/*设置报警数据(能量柱)动画*/
var setEneryColumn=function (options) {
    var that=this;

    that.options={
        arrEneryColumn:{
            warnData:null,
            warningEnergyColumn:null,
            warningData:null
        },
        arrData:{
            warnData:0,
            warningData:0
        }
    }

    for(var item in options){
        that.options[item]=options[item];
    }

    that.init();
}
setEneryColumn.prototype={
    init:function () {
        var that=this;

        if(that.isExist()){
            that.getWarnData();
        }

    },
    isExist:function () {
        var that=this;
        var options=that.options;

        return (options.arrEneryColumn.warnData.length>0
            &&options.arrEneryColumn.warningEnergyColumn.length>0
            &&options.arrEneryColumn.warningData.length>0);
    },
    setWarnData:function (warnData,warningData) {//设置报警能量柱数据
        var that=this;
        var options=that.options;
        var arrEneryColumn=options.arrEneryColumn;

        options.arrData.warnData=warnData;
        options.arrData.warningData=warningData;

        /*清除报警能量柱中原有的数据*/
        $(arrEneryColumn.warnData).text(0);
        $(arrEneryColumn.warningEnergyColumn).width(0+'%');
        $(arrEneryColumn.warningData).text(0);
        /*清除报警能量柱中原有的数据*/

        that.getWarnData();//执行动画
    },
    getWarnData:function () {//执行动画
        var that=this;
        var options=that.options;

        that.setTimer();
    },
    getComputedStyle:function (obj,attr) {
        var attrValue='';

        if(window.getComputedStyle){
            attrValue=window.getComputedStyle(obj,null)[attr];
        }else{
            attrValue=obj.currentStyle[attr];
        }

        attrValue=Math.ceil((parseInt(attrValue)/416)*100);

        return attrValue;
    },
    setTimer:function () {
        var that=this;
        var options=that.options;

        that.warnChange(options.arrEneryColumn.warnData,'innerText',options.arrData.warnData);
        that.warnChange(options.arrEneryColumn.warningEnergyColumn,'width',options.arrData.warningData);
        that.warnChange(options.arrEneryColumn.warningData,'innerText',options.arrData.warningData);
    },
    warnChange:function (obj,attr,iTarget) {
        var that=this;
        var options=that.options;

        obj.timer=setInterval(function () {
            var speed=Math.ceil(iTarget/8);
            iTarget=iTarget-speed;

            if(attr=='innerText'){
                $(obj).text(parseInt($(obj).text())+parseInt(speed));
            }else{
                $(obj).width(that.getComputedStyle($(obj)[0],attr)+speed+'%');
            }

            if(speed<=0){
                clearInterval(obj.timer);
            }
            //console.log(speed);
            //console.log($('#'+options.id+'_'+obj.index));
        },30);
    }
};
/*设置报警数据(能量柱)动画*/
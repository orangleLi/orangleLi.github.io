//调用案例，需要在被调用的标签内 写上最终的数值
$(".timer").countTo({
    lastSymbol:"", //显示在最后的字符
    from: 0,  // 开始时的数字
    speed: 1000,  // 总时间
    refreshInterval:100,  // 刷新一次的时间
    beforeSize:0, //小数点前最小显示位数，不足的话用0代替
    decimals: 0,  // 小数点后的位数，小数做四舍五入
    onUpdate: function() {
    },  // 更新时回调函数
    onComplete: function() {
        for(i in arguments){
            //console.log(arguments[i]);
        }
    }
});

function mapDrillDown(id) {
	this.chartDom = echarts.init(document.getElementById(id));
	this.optionMap = null;
	// tag: 0全国 1省 2市
	this.tag = 0;
	this.timer = null;
	this.clickLock = true;
}

mapDrillDown.prototype = {
	/*
	 * 设置区域颜色
	*/
	setRegions: function(regionsJson) {
		var colors=['#083967','#13548d','#1c74b2'];
	    var colorsLen=colors.length;
	    var features=regionsJson.features;
	    var echatsRegions=[];
	    // var echatsRegions=[{
	    //     name: '南海诸岛',
	    //     value: 0,
	    //     itemStyle: {
	    //         normal: {
	    //             opacity: 0,
	    //             label: {
	    //                 show: false
	    //             }
	    //         }
	    //     }
	    // }];

	    for(var i=0,len=features.length;i<len;i++){
	        var regionsItem={
	            name:features[i].properties.name,
	            itemStyle: {
	                normal: {
	                    areaColor: colors[Math.floor(Math.random()*colorsLen)]
	                },
	            }
	        };
	        echatsRegions.push(regionsItem);
	    }
	    return echatsRegions;
	},
	setMap: function() {
		this.optionMap = {
	        tooltip: {
	            trigger: 'item',
	            // triggerOn:'click',//鼠标点击时触发
	            enterable:true,//鼠标是否能进入提示框内
	            formatter: function (params) {
	                
	            }
	        },
	        geo: {
	            map: 'china',
	            label: {
	                normal: {
	                    show: true,
	                    color: '#639bc3'
	                },
	            },
	            itemStyle: {
	                normal: {
	                    areaColor: '#083967',
	                    borderColor: '#48c7ff',
	                    borderWidth: 2,
	                },
	                emphasis: {
	                    areaColor: '#48c7ff',//高亮效果
	                },
	            }
	        },
	        series: [
	            {
	                name: '正常',
	                type: 'scatter',
	                coordinateSystem: 'geo',
	                opacity: 1,
	                // data: convertData(arrData),
	                data: [],
	                symbolSize: 15,//散点图的大小
	                label: {
	                    normal: {
	                        show: false
	                    },
	                },
	                itemStyle: {
	                    normal: {
	                        color: '#00d0e4',
	                        borderColor: '#fff',
	                        borderWidth: 2,
	                    },
	                    emphasis: {
	                        borderColor: '#fff',
	                        borderWidth: 2,
	                    }
	                }
	            }
	        ]
	    };
		// 图表自适应
	    window.addEventListener('resize', function () {
	        this.chartDom.resize();
	    }.bind(this));

	    this.optionMap.geo.regions=this.setRegions(china);//设置区域颜色

	    
	    this.chartDom.setOption(this.optionMap);
	},
	setClick: function() {
		let that = this;
		// 点击事件
		that.chartDom.on('click', function (params) {//点击事件
	        clearTimeout(that.timer);
	        that.timer = setTimeout(function () {
	            if(!that.clickLock)return;
	            if (params.componentType === 'geo') {//点击地图区域
	                that.reFreshMap(params.name);
	            }
	            that.clickLock = true;
	        },300);
	    });

		// 双击事件
		that.chartDom.on('dblclick', function (params) {
		    that.clickLock = false;
		    clearTimeout(that.timer);
		    that.tag = 0;
		    that.optionMap.geo.map = 'china';
	        that.chartDom.setOption(that.optionMap);
		    that.clickLock = true;
		});
	},
	reFreshMap: function(paramsName) {
		let that = this;
		if(that.tag === 0) {
	        provinceOrCityName =paramsName;
	        that.tag++;
	        var provinceEngName = provinceNameChineseToEng(provinceOrCityName);
	        $.get('./resources/geoProvince/' + provinceEngName + '.json', function (mapJson) {
	            that.optionMap.geo.map = provinceEngName;
	            echarts.registerMap(provinceEngName, mapJson);
	        	that.chartDom.setOption(that.optionMap);
	        });

	        lastProvinceOrCityName = provinceOrCityName;
	    } else if(that.tag === 1) {
	    	if (lastProvinceOrCityName.includes('直辖市') > 0) return;
	        provinceOrCityName =paramsName;
	        that.tag++;
	        var provinceEngName = provinceNameChineseToEng(lastProvinceOrCityName);
	        $.get('./resources/city/'+provinceEngName+"/"+cityNameChineseToEng(provinceOrCityName, lastProvinceOrCityName)+'.json', function (mapJson) {
	            that.optionMap.geo.map = provinceEngName;
	            echarts.registerMap(provinceEngName, mapJson);
	        	that.chartDom.setOption(that.optionMap);
	        });

	    }
	},
	init() {
		this.setMap();
		this.setClick();
	}
}

new mapDrillDown('chart').init();
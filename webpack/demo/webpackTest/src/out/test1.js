var testOneMo = {
	init: function (val) {
		this.testFun(val)
	},
	testFun: function(val){		
		testMo.init(val);
	}
}
testOneMo.init(2);
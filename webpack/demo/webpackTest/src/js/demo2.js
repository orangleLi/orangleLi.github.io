var obj = require('./tool.js');

var demo2 = {
	init: function (argument) {
		var dom = obj.getDom('demo2');
		dom.onclick = function(){
			dom.style.background = 'blue';
		}
	}
}

module.exports = demo2;
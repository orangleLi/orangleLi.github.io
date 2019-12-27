
function NumScroll(id, endNum, startNum) {
	this.mainDom = document.getElementById(id);
	this.endNum = parseInt(endNum);
	this.startNum = parseInt(startNum) || 0;
	this.nowNum = this.startNum;
}
NumScroll.prototype = {
	step: function() {
		if (this.nowNum >= this.endNum) {
			this.mainDom.innerHTML = this.endNum;
		} else {
			this.nowNum += 10
			this.mainDom.innerHTML = this.nowNum;
			window.requestAnimationFrame(this.step.bind(this));
		}
	},
	init: function() {
		window.requestAnimationFrame(this.step.bind(this));
	}
}
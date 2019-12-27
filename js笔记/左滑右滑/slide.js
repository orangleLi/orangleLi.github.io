function Slide(id, leftSlide, rightSlide) {
	this.slideDom = document.getElementById(id);
	this.startX = 0;
	this.startY = 0;
	this.endX = 0;
	this.endY = 0;
	this.leftSlideCallback = leftSlide;
	this.rightSlideCallback = rightSlide;
}

Slide.prototype = {
	init: function() {
		let that = this;
		that.slideDom.addEventListener('touchstart', function(e) {
			that.startX = e.changedTouches[0].clientX;
			that.startY = e.changedTouches[0].clientY;
		});
		that.slideDom.addEventListener('touchmove', function(e) {
			that.endX = e.changedTouches[0].clientX;
			that.endY = e.changedTouches[0].clientY;
		});
		that.slideDom.addEventListener('touchend', function(e) {
			let angle = that.angle({ X: that.startX, Y: that.startY }, { X: that.endX, Y: that.endY });
			if (Math.abs(angle) > 30) return;
		    if (that.endX > that.startX){
		    	that.rightSlideCallback && that.rightSlideCallback();
		    } else {
		    	that.leftSlideCallback && that.leftSlideCallback();
		    }
		});
	},	
	leftSlide: function(callback) {
		this.leftSlideCallback = callback;
	},
	rightSlide: function(callback) {
		this.rightSlideCallback = callback;
	},
	/**
	* 计算滑动角度
	* @param {Object} start 起点坐标
	* @param {Object} end 终点坐标
	*/
	angle: function (start, end) {
	    var _X = end.X - start.X,
	      _Y = end.Y - start.Y
	    //返回角度 /Math.atan()返回数字的反正切值
	    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
	}
}
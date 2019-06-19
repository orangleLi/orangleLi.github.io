var dom = document.getElementById('canvas');
var ctx = dom.getContext('2d');

var watermarkCanvas = document.getElementById('watermarkCanvas');
var watermarkCtx = watermarkCanvas.getContext('2d');

var magnifierCanvas = document.getElementById('magnifierCanvas');
var magnifierCtx = magnifierCanvas.getContext('2d');

// 获取按钮dom
var refreshSelectImgDom = document.getElementById('refreshSelectImg');
var dragAndDropDom = document.getElementById('dragAndDrop');
var magnifierDom = document.getElementById('magnifier');
var selectImgClsDom = document.getElementsByClassName('selectImgCls')[0];

var image = new Image();

var defaultWidth = 720;
var defaultHeight = 405;
var width = defaultWidth;
var height = defaultHeight;


// 放大镜宽高
var magSize = 202;
// 放大镜倍数
var magnification = 2;
magnifierCanvas.width = magSize;
magnifierCanvas.height = magSize;
watermarkCanvas.width = 300;
watermarkCanvas.height = 100;

var imageHandleObj; 

var sliderObj = document.getElementById('scale-range');

var imageHandle = function() {	
	this.scale;
	this.dx;
	this.dy;
	this.imageWidth;
	this.imageHeight;
	this.offsetX = 0;
	this.offsetY = 0;
}
var inputEvent;
function selectImg(obj) {
	// console.log(obj);
	inputEvent = obj;
	var filePath = obj.value; //获取到input的value，里面是文件的路径
	var fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
	// console.log(filePath, fileFormat);
	var src = window.URL.createObjectURL(obj.files[0]); //转成可以在本地预览的格式
	// 检查是否是图片
	if(!fileFormat.match(/.png|.jpg|.jpeg/)) {
	   alert('上传错误,文件格式必须为：png/jpg/jpeg');
	return;
	}else{
		image.src= src;
		selectImgClsDom.style.display = 'none';
		refreshSelectImgDom.style.display = 'inline-block';
	} 
}
imageHandle.prototype = {
	init() {
		let that = this;
		this.scale = sliderObj.value;
		// image.src= './im.jpg';
		image.onload = function() {
			that.setCanvasSize(image.width, image.height);
			that.drawImageByScale();
		}

		watermarkCtx.font = 'bold 30px Arial';
		watermarkCtx.lineWidth = '1';
		watermarkCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
		watermarkCtx.textBaseline = 'middle';
		watermarkCtx.fillText("== lilian.com ==", 20, 50);
	},
	setCanvasSize(w, h) {
		width = w;
		height = h;
		document.getElementsByClassName('main')[0].style.width = width + 2 + 'px';
		dom.width = width;
		dom.height = height;
	},
	// 缩放效果
	drawImageByScale() {
		this.imageWidth = width * this.scale;
		this.imageHeight = height * this.scale;

		this.dx = width / 2 - this.imageWidth / 2 + this.offsetX;
		this.dy = height / 2 - this.imageHeight / 2 + this.offsetY;
		ctx.clearRect(0, 0, width, height);
		ctx.drawImage(image, this.dx, this.dy,  this.imageWidth, this.imageHeight);
		// 绘制水印
		ctx.drawImage(watermarkCanvas, width - watermarkCanvas.width, height - watermarkCanvas.height);
	},
	// coordinateTrans坐标转换，从window坐标转为canvas坐标
	coordinateTrans(x, y) {
		var pos = dom.getBoundingClientRect();
		return {x: x-pos.x, y: y-pos.y};
	},
	// 拖拽效果
	dragAndDrop() {
		let that = this;
		dom.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var posStart = that.coordinateTrans(e.clientX, e.clientY);
			that.startX = posStart.x;
			that.startY = posStart.y;
			dom.onmousemove = function(e1) {
				e.preventDefault();
				var posEnd = that.coordinateTrans(e1.clientX, e1.clientY);
				that.endX = posEnd.x;
				that.endY = posEnd.y;
				var diffX = posEnd.x - that.startX;
				var diffY = posEnd.y - that.startY;
				if (diffX !== 0 && diffY !== 0) {
					ctx.clearRect(0, 0, width, height);
					ctx.drawImage(image, that.dx + diffX, that.dy + diffY,  that.imageWidth, that.imageHeight);
					that.offsetX = that.dx + diffX;
					that.offsetY = that.dy + diffY;
				}
			}
			dom.onmouseup = function(e) {
				e.preventDefault();
				dom.onmouseup = null;
				dom.onmousemove = null;
			}
		}
	},
	// 放大镜效果
	magnifier() {
		let that = this;
		dom.onmousedown = function(e) {
			that.magnifierEvent(e);
		}
		magnifierCanvas.onmousedown = function(e) {
			that.magnifierEvent(e);
		}
	},
	magnifierEvent(e) {
		let that = this;
		e = e || window.event;
		e.preventDefault();
		magnifierCanvas.style.display = 'block';
		var posStart = that.coordinateTrans(e.clientX, e.clientY);
		that.drawMagnifier(posStart.x, posStart.y);
		// console.log(e.clientX, e.clientY);
		// console.log(posStart.x, posStart.y);
		magnifierCanvas.onmousemove = function(e1) {
			e.preventDefault();
			var posStart1 = that.coordinateTrans(e1.clientX, e1.clientY);
			that.drawMagnifier(posStart1.x, posStart1.y);
		}
		magnifierCanvas.onmouseup = function(e) {
			e.preventDefault();
			magnifierCtx.clearRect(0, 0, magSize, magSize);
			magnifierCanvas.style.display = 'none';
			magnifierCanvas.onmouseup = null;
			magnifierCanvas.onmousemove = null;
		}
	},
	drawMagnifier(x, y) {
		magnifierCanvas.style.left = x - magSize/2 + 'px';
		magnifierCanvas.style.top = y - magSize/2 + 'px';
		var scale = this.scale - 0;
		var imageLG_cx = x - (magSize/2/magnification);
		var imageLG_cy = y - (magSize/2/magnification);
		magnifierCtx.save();
		magnifierCtx.lineWidth = '1';
		magnifierCtx.strokeStyle = '#000';

		magnifierCtx.beginPath();
		magnifierCtx.arc(magSize/2,magSize/2,(magSize/2)-1,0,2*Math.PI);
		magnifierCtx.stroke();
		magnifierCtx.clip();
		magnifierCtx.drawImage(dom, imageLG_cx, imageLG_cy, magSize/magnification, magSize/magnification
			, 0, 0, magSize, magSize);
		magnifierCtx.restore();
	},
	clearCanvasEvent() {
		dom.onmousedown = null;
		dom.onmouseup = null;
		dom.onmousemove = null;
	},
	clearmagnifierCanvasEvent() {
		magnifierCanvas.onmousedown = null;
		magnifierCanvas.onmouseup = null;
		magnifierCanvas.onmousemove = null;
	}
};

imageHandleObj = new imageHandle();
imageHandleObj.init();

sliderObj.onmousedown = function() {
	// 滑块事件
	sliderObj.onmousemove = function() {
		imageHandleObj.scale = sliderObj.value;
		imageHandleObj.drawImageByScale();
	}
	sliderObj.onmouseup = function(e) {
		sliderObj.onmouseup = null;
		sliderObj.onmousemove = null;
	}
}

dragAndDropDom.onclick = function() {
	// 拖拽事件
	resetBtnBorder();
	imageHandleObj.clearmagnifierCanvasEvent();
	dragAndDropDom.style.border = '1px solid rgb(149, 183, 242)';
	if (image.src) {
		imageHandleObj.dragAndDrop();
	} else {
		alert('请选择图片！');
	}
}
magnifierDom.onclick = function() {
	// 放大镜事件
	magnifierDom.style.border = '1px solid rgb(149, 183, 242)';
	if (image.src) {
		imageHandleObj.magnifier();
	} else {
		alert('请选择图片！');
	}
}
// 选择放大镜放大倍数
function changeMagnification(obj) {
	var obj = document.getElementById('magnification');
	console.log(obj.options[obj.selectedIndex].text)
	magnification = obj.options[obj.selectedIndex].text;
}
function resetBtnBorder() {
	var btnArr = document.getElementsByClassName('borderCls');
	for (var i = 0; i < btnArr.length; i++) {
		btnArr[i].style.border = '1px solid #dcdfe6';
	}
}
refreshSelectImgDom.onclick = function() {
	// 重新选择图片事件
	refreshSelectImgDom.style.border = '1px solid rgb(149, 183, 242)';
	ctx.clearRect(0, 0, width, height);
	image.src = '';
	dom.width = defaultWidth;
	dom.height = defaultHeight;
	document.getElementsByClassName('main')[0].style.width = defaultWidth + 2 + 'px';
	selectImgClsDom.style.display = 'block';
	document.getElementById('fileInput').value = null;
}

var dom = document.getElementById('canvas');
var ctx = dom.getContext('2d');

var magnifierCanvas = document.getElementById('magnifierCanvas');
var magnifierCtx = magnifierCanvas.getContext('2d');

var offScreenCanvas = document.getElementById('offScreenCanvas');
var offScreenCtx = offScreenCanvas.getContext('2d');

// 获取按钮dom
var refreshSelectImgDom = document.getElementById('refreshSelectImg');
var downloadImgDom = document.getElementsByClassName('downloadImg')[0];
var rotateDom = document.getElementById('rotate');
var dragAndDropDom = document.getElementById('dragAndDrop');
var magnifierDom = document.getElementById('magnifier');
var selectImgClsDom = document.getElementsByClassName('selectImgCls')[0];

var image = new Image();
var offScreenImage = new Image();

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

// 逆时针旋转/顺时针旋转
var angle = 0;
var rotateNum = 1;

var imageHandleObj; 

var sliderObj = document.getElementById('scale-range');

var imageHandle = function() {	
	this.scale;
	this.dx = 0;
	this.dy = 0;
	this.imageWidth;
	this.imageHeight;
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
		image.src = src;
		image.name = obj.files[0].name;
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
			that.setBoxSize(image.width);
			that.setCanvasSize(image.width, image.height);

			ctx.drawImage(image,0, 0,  width, height);
			offScreenCtx.drawImage(image, 0, 0, width, height);
		}
		let domPos = dom.getBoundingClientRect();
		let xP = domPos.left + domPos.width;
		let yP = domPos.top + domPos.height;
		dom.addEventListener('mousemove', e => {
			if (Math.abs(e.clientX === xP) < 1.5 && Math.abs(e.clientY - yP) < 1.5 ) {
				dom.style.cursor = 'crosshair'
			} else {
				dom.style.cursor = 'default'
			}
		})
	},
	setCanvasSize(w, h) {
			width = w;
			height = h;
			dom.width = width;
			dom.height = height;
			this.imageWidth = width;
			this.imageHeight = height;
			offScreenCanvas.width = width;
			offScreenCanvas.height = height;
	},
	setBoxSize(w) {
		document.getElementsByClassName('main')[0].style.width = w + 2 + 'px';
		// document.getElementsByClassName('btnGroup')[0].style.width = w + 2 + 'px';
	},
	// 缩放效果
	drawImageByScale() {
		let that = this;
		this.imageWidth = width * this.scale;
		this.imageHeight = height * this.scale;

		ctx.save();
		this.clearCanvas();
		if (angle !== 0) {
			
			this.dx = height / 2 - this.imageHeight / 2;
			this.dy = width / 2 - this.imageWidth / 2;
			if (angle === 180 || angle === 0) {
				ctx.drawImage(offScreenCanvas, 0, 0, width, height, that.dx, that.dy, that.imageWidth, that.imageHeight);
			} else {
				ctx.drawImage(offScreenCanvas, 0, 0, height, width, that.dx, that.dy, that.imageHeight, that.imageWidth);
			}

		} else {

			this.dx = width / 2 - this.imageWidth / 2;
			this.dy = height / 2 - this.imageHeight / 2;
			ctx.drawImage(image, 0, 0, width, height, this.dx, this.dy, this.imageWidth, this.imageHeight);	
		}

		this.saveImg();
		ctx.restore();
	},
	clearCanvas() {
		// let r = width > height ? width+2 : height+2;
		ctx.clearRect(0, 0, width+2, height+2);
		ctx.clearRect(0, 0, height+2, width+2);		
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
				that.dx += diffX;
				that.dy += diffY;
				that.startX = posEnd.x;
				that.startY = posEnd.y;
				// if (diffX > 30){
				// 	debugger
				// }
				if (diffX !== 0 && diffY !== 0) {	
					ctx.save();				
					that.clearCanvas();
					if (angle !== 0) {

						if (angle === 180 || angle === 0) {
							// console.log(offScreenImage.src)
							ctx.drawImage(offScreenCanvas, 0, 0, width, height, that.dx, that.dy, that.imageWidth, that.imageHeight);
						} else {
							ctx.drawImage(offScreenCanvas, 0, 0, height, width, that.dx, that.dy, that.imageHeight, that.imageWidth);
						}

					} else {
						ctx.drawImage(image, 0, 0, width, height, that.dx, that.dy, that.imageWidth, that.imageHeight);
					}
					that.saveImg();
					ctx.restore();	
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
		this.saveImg();
		magnifierCtx.restore();
	},
	saveImg () {
		downloadImgDom.download = image.name;
		downloadImgDom.href = dom.toDataURL('image/png');
	},
	initRotate() {
		dom.width = width;
		dom.height = height;
	},
	rotateImg() {
		let that = this;
		that.initRotate();
		// 图片旋转
		// console.log('旋转');
		this.clearCanvas();

		let movex = 0, movey = 0;
		var tempDx = that.dx;
		var tempDy = that.dy;
		that.dx = tempDy;
		that.dy = tempDx;
		that.changeOffScreenCanvas();
		switch (angle) {
			case 90:
				that.changeWidthAndHeight();
				movex = height;
				movey = 0;
				break;
			case 180:
				movex = width;
				movey = height;
				break;
			case 270:
				that.changeWidthAndHeight();
				movex = 0;
				movey = width;
				break;
			case 0:
				movex = 0;
				movey = 0;
				break;
		}
		// angle = 180;
		// movex = width;
		// movey = height;
		// console.log(angle);

		offScreenCtx.setTransform(Math.cos(angle * Math.PI/180), Math.sin(angle*Math.PI/180), - Math.sin(angle*Math.PI/180), Math.cos(angle * Math.PI/180) , movex, movey);
		offScreenCtx.drawImage(image, 0, 0, width, height);
		offScreenImage.src = offScreenCanvas.toDataURL('image/png');
		// console.log(offScreenImage.src)

		if (angle === 180 || angle === 0) {
			ctx.drawImage(offScreenCanvas, 0, 0, width, height, that.dx, that.dy, that.imageWidth, that.imageHeight);
		} else {
			ctx.drawImage(offScreenCanvas, 0, 0, height, width, that.dx, that.dy, that.imageHeight, that.imageWidth);
		}
		this.saveImg();
	},
	changeWidthAndHeight() {
		var tempWidth = dom.width;
		dom.width = dom.height;
		dom.height = tempWidth;
	},
	changeOffScreenCanvas() {
		var offScreenWidth = offScreenCanvas.width;
		offScreenCanvas.width = offScreenCanvas.height;
		offScreenCanvas.height = offScreenWidth;
		this.setBoxSize(offScreenCanvas.width);
	},
	setStyle(obj) {
		obj.style.display = 'block';
		obj.style.width = width + 2 + 'px';
		obj.style.height = height + 'px';
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
downloadImgDom.onclick = function() {
	// 保存图片到本地
	if (image.src) {
		imageHandleObj.saveImg();
	} else {
		alert('请选择图片！');
	}
}
var rotateObj = document.getElementById('changeRotate');

rotateDom.onclick = function() {
	// 旋转图片
	resetBtnBorder();
	rotateDom.style.border = '1px solid rgb(149, 183, 242)';
	if (image.src) {
		
		var rotateVal = rotateObj.options[rotateObj.selectedIndex].value;
		console.log(rotateVal);
		if (rotateVal === '1') {
			// 顺时针
			angle += 90;
			if (angle >= 360) angle = 0;
		} else if (rotateVal === '2') {
			// 逆时针
			angle -= 90;
			if (angle < 0) angle = 270;
		}

		imageHandleObj.rotateImg();
	} else {
		alert('请选择图片！');
	}
}
magnifierDom.onclick = function() {
	// 放大镜事件
	resetBtnBorder();
	magnifierDom.style.border = '1px solid rgb(149, 183, 242)';
	if (image.src) {
		imageHandleObj.magnifier();
	} else {
		alert('请选择图片！');
	}
}
// 选择放大镜放大倍数
function changeMagnification() {
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
	imageHandleObj.offsetX = 0;
	imageHandleObj.offsetY = 0;
	document.getElementsByClassName('main')[0].style.width = defaultWidth + 2 + 'px';
	selectImgClsDom.style.display = 'block';
	document.getElementById('fileInput').value = null;
}

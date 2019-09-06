function canvasDraw(id, obj) {
  this.ctx = wx.createCanvasContext(id, obj);
  this.nowHeight;
}

canvasDraw.prototype = {
  getImagesInfo: function (imgArr) {
    let that = this;
    let promiseArr = [];
    imgArr.forEach((item) => {
      promiseArr.push(that.imagesInfo(item));
    })
    return Promise.all(promiseArr);
  },
  imagesInfo: function(src) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: src,
        success: function (res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        },
      })
    })
  },
  getDownloadFiles: function (imgArr) {
    let that = this;
    let promiseArr = [];
    imgArr.forEach((item) => {
      promiseArr.push(that.downloadFiles(item));
    })
    return Promise.all(promiseArr);
  },
  downloadFiles: function (url) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: url,
        success: function (res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        },
      })
    })
  },
  /**
   * 绘制圆形图片
   * x rpx
   * y rpx 圆所在正方形起点坐标
   * r rpx 圆的半径
   */
  drawCricleImg(x, y, r, logo) {
    x = this.getPx(x);
    y = this.getPx(y);
    r = this.getPx(r);
    let centerX = (x + r).toFixed(2);
    let centerY = (y + r).toFixed(2);

    let w = r * 2;
    
    this.ctx.save()//保存当前的绘图上下文。
    this.ctx.beginPath()//开始创建一个路径
    this.ctx.arc(centerX, centerY, r, 0, 2 * Math.PI, false)//画一个圆形裁剪区域
    this.ctx.clip()//裁剪
    this.ctx.drawImage(logo, x, y, w, w)//绘制图片
    this.ctx.restore()//恢复之前保存的绘图上下文
    this.nowHeight = this.getRpx(y + w);
    return this;
  },
  /**
   * 绘制圆角图片
   * img, 
   * sx, rpx
   * sy, rpx
   * swidth, rpx
   * sheight, rpx
   * x, rpx
   * y, rpx
   * width, rpx
   * height  rpx
   * 同于drawImage的参数
   * r 圆角半径
   * bgColor canvas背景颜色
   */
  drawFilletImg(img, sx, sy, swidth, sheight, x, y, width, height, r, bgColor = '#fff') {
    sx = this.getPx(sx);
    sx = this.getPx(sx);
    swidth = this.getPx(swidth);
    sheight = this.getPx(sheight);
    x = this.getPx(x);
    y = this.getPx(y);
    width = this.getPx(width);
    height = this.getPx(height);
    r = this.getPx(r);

    this.ctx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
    this.roundRect(x, y, width, height, r || 0, bgColor);

    this.nowHeight = this.getRpx(y + height);
    return this;
  },
  /**
   * 绘制圆角图片
   * img, 
   * x, rpx
   * y, rpx
   * width, rpx
   * height rpx
   *  同于drawImage的参数
   * r 圆角半径 rpx
   * bgColor canvas背景颜色
   */
  drawFilletFillImg(img, x, y, width, height, r, bgColor = '#fff') {
    x = this.getPx(x);
    y = this.getPx(y);
    width = this.getPx(width);
    r = this.getPx(r);
    r = this.getPx(r);

    this.ctx.drawImage(img, x, y, width, height);
    this.roundRect(x, y, width, height, r || 0, bgColor);

    this.nowHeight = this.getRpx(y + height);
    return this;
  },
  /**
   * 普通绘制图片 和原本的drawImage用法相同  单位均为rpx
   */
  drawImage(img, sx, sy, swidth, sheight, x, y, width, height) {
    sx = this.getPx(sx);
    sy = this.getPx(sy);
    swidth = this.getPx(swidth);
    sheight = this.getPx(sheight);
    x = this.getPx(x);
    y = this.getPx(y);
    width = this.getPx(width);
    height = this.getPx(height);

    // if (!x && !y) {
      this.ctx.drawImage(img, sx, sy, swidth, sheight);
      this.nowHeight = this.getRpx(sy + sheight);
    // } else {
    //   this.ctx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
    //   this.nowHeight = this.getRpx(y + sheight);
    // }
    return this;
  },
  getPx(rpx) {
    var winWidth = wx.getSystemInfoSync().windowWidth;
    return rpx / (750 / winWidth);
  },
  getRpx(px) {
    var winWidth = wx.getSystemInfoSync().windowWidth;
    return px * (750 / winWidth);
  },
  /**
   * 绘制单行文本
   * fontSize 字体大小
   * color 字体颜色
   * str 绘制的文本
   * x, y 坐标 单位均为rpx
   */
  drawText(str, x, y, fontSize = 24, color = '#000', bold, align = 'left') {
    x = this.getPx(x);
    y = this.getPx(y + fontSize);
    fontSize = this.getPx(fontSize);
    
    this.ctx.save();
    if (bold) {
      this.ctx.font = `normal bold ${fontSize}px sans-serif`;
    } else {
      this.ctx.setFontSize(fontSize)
    }
    this.ctx.setTextAlign(align);
    this.ctx.setFillStyle(color)
    this.ctx.fillText(str, x, y);
    this.ctx.restore();
    this.nowHeight = this.getRpx(y + fontSize);
    return this;
  },
  /**
   * 绘制多行文本
   * str 文本内容
   * x, y 坐标位置
   * width 绘制区域宽度
   * fontSize 字体大小
   * maxRow 最多绘制几行
   * color 颜色
   * suffixStr 多于内容的占位符 默认...
   * 单位均为rpx
   */
  drawMultiLineText: function (str, x, y, width, fontSize, maxRow, color = '#000', bold, align = 'left', suffixStr = '...') {
    let p =fontSize
    x = this.getPx(x);
    y = this.getPx(y + fontSize);
    width = this.getPx(width);
    fontSize = this.getPx(fontSize);

    var lineWidth = 0;
    var row = 1;
    var tag = false;
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引

    this.ctx.save()//保存当前的绘图上下文。
    if (bold) {
      this.ctx.font = `normal bold ${fontSize}px sans-serif`;
    } else {
      this.ctx.setFontSize(fontSize)
    }
    this.ctx.setFillStyle(color);
    this.ctx.setTextAlign(align);
    for (let i = 0; i < str.length; i++) {
      
      lineWidth += this.ctx.measureText(str[i]).width;
      if (Math.round(lineWidth) >= width) {
        tag = true;
        let newtr = str.substring(lastSubStrIndex, i);
        if (row === maxRow) {
          newtr = newtr.substring(0, newtr.length - 1) + suffixStr
        }
        this.ctx.fillText(newtr, x, y); //绘制截取部分
        if (row === maxRow) {
          this.ctx.restore()//恢复之前保存的绘图上下文
          this.nowHeight = this.getRpx(y);
          return this;
        }
        y += (fontSize + 5);
        lineWidth = 0;
        lastSubStrIndex = i;
        row++;
      }
      if (i === str.length - 1) { //绘制剩余部分
        let newtr = str.substring(lastSubStrIndex, str.length);
        this.ctx.fillText(newtr, x, y); //绘制截取部分
        if (tag) {
          y += (fontSize + 5);
        }
        this.ctx.restore()//恢复之前保存的绘图上下文
        this.nowHeight = this.getRpx(y);
        return this;
      }
    }
  },
  /**
   * 绘制函数
   * callback 绘制完成之后的回调
   */
  drawFinally(callback) {
    let that = this;
    that.ctx.draw(true, function () {
      callback && callback(that.ctx, that.nowHeight);
    }, that);
  },
  roundRect: function (x, y, w, h, r, c) {
    // 开始绘制
    this.ctx.beginPath();
    this.ctx.setFillStyle(c);
    // 左上角
    this.ctx.moveTo(x + r, y);
    this.ctx.arcTo(x, y, x, y + r, r);
    this.ctx.lineTo(x, y);
    this.ctx.lineTo(x + r, y);
    this.ctx.fill();

    // 右上角
    this.ctx.moveTo(x + w - r, y);
    this.ctx.arcTo(x + w, y, x + w, y + r, r);
    this.ctx.lineTo(x + w, y);
    this.ctx.lineTo(x + w - r, y);
    this.ctx.fill();

    // 左下角
    this.ctx.moveTo(x, y + h - r);
    this.ctx.arcTo(x, y + h, x + r, y + h, r);
    this.ctx.lineTo(x, y + h);
    this.ctx.lineTo(x, y + h - r);
    this.ctx.fill();

    // 右下角
    this.ctx.moveTo(x + w, y + h - r);
    this.ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    this.ctx.lineTo(x + w, y + h);
    this.ctx.lineTo(x + w, y + h - r);
    this.ctx.fill();
  },
}

module.exports = {
  canvasDraw: canvasDraw
}
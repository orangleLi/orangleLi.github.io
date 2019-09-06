// pages/drawPoster/drawPoster.js
const drawD = require('../../utils/canvasDraw.js'); 
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareActivityInfo: { 
      "ActivityContent": "炎陵黄桃，桃醉天下！来自湖南省炎陵县海拔300-1200米山区的炎陵黄桃，是生态营养安全的绿色食品水果，为国家地理标志商标保护产品。炎陵黄桃品质优异，以靓、脆、香、甜享誉市场，享有“天上仙桃，炎陵黄桃”的美誉。桃形周正、着色均匀、果面亮泽、甜度适中、酥脆可口、香气浓郁实乃居家自食、中秋送礼之佳选！",
      "ActivityImgUrl": "https://orangleli.github.io/imagesResources/1.jpg",
      "ActivityIssueTime": "2019-08-07 11:37:18",
      "ActivityName": "炎陵黄桃5斤装",
      "CommunityName": "这是一个地址",
      "name": "orangleLi",
      "logo": "https://avatars0.githubusercontent.com/u/34326830?s=400&u=2e69fbfaf577e896d414788c869e265e0d449a1b&v=4",
      "qrCode": "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/gh_33446d7f7a26_430.jpg"
    },
    width: app.globalData.windowWidth, // canvas 大小
    // width: 375, // canvas 大小
    height: app.globalData.windowHeight,
    imageWidth: 0, // 活动配图 大小
    imageHeight: 0,
    pixelRatio: app.globalData.pixelRatio,
    endImg: null,
    isFinished: false,
    bgTrue: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCanvasImage();
  },

  getCanvasImage: function () {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this;
    let data = that.data.shareActivityInfo;
    if (!data) return;

    that.setData({
      height: 1000,
      isFinished: true
    })
    // const ctx = wx.createCanvasContext('shareImg', that);
    let draw = new drawD.canvasDraw('shareImg', that);
    draw.getImagesInfo([data.logo, data.ActivityImgUrl, data.qrCode]).then((res) => {
      data.logo = res[0].path;
      data.ActivityImgUrl = res[1].path;
      data.qrCode = res[2].path;
      that.setData({
        imageWidth: res[1].width,
        imageHeight: res[1].height,
        shareActivityInfo: data
      });
      that.drawShareImage(draw);
    })

  },
  getPx(rpx) {
    var winWidth = wx.getSystemInfoSync().windowWidth;
    return rpx / (750 / winWidth);
  },
  getRpx(px) {
    var winWidth = wx.getSystemInfoSync().windowWidth;
    return px * (750 / winWidth);
  },
  drawShareImage(draw) {
    let pixelRatio = this.data.pixelRatio;
    let that = this;
    wx.showLoading({
      title: '绘制中...',
    });
    let data = that.data.shareActivityInfo;
    if (!data) return;
    let logo = data.logo;
    let WxName = data.name || '';
    let ActivityIssueTime = data.ActivityIssueTime || data.CreatedOn;
    let CommunityName = data.CommunityName;
    let ActivityName = data.ActivityName;
    let ActivityContent = data.ActivityContent;
    let ActivityImg = data.ActivityImgUrl;

    let drawHeight = 0;
    let x = 0, y = 0;
    let imageWidth = that.data.imageWidth;
    let imageHeight = that.data.imageHeight;
    if (ActivityImg !== '') {
      if (imageHeight >= 650) {
        // 大于650时，按照宽度取一个正方形
        y = that.transPx((imageHeight - 650) / 2);
        imageHeight = 650 > imageHeight ? imageHeight : 650;
        drawHeight = imageHeight;

      } else {
        let pix = 650 / imageWidth;
        drawHeight = pix * imageHeight;
      } 

    }

    draw.drawCricleImg(50, 50, 35, logo)
      .drawText(WxName, 134, 56, 24, '#333333')
      .drawText(ActivityIssueTime + ' ' + CommunityName, 134, 90, 20, '#aaaaaa')
      .drawMultiLineText(ActivityName, 50, 160, 650, 42, 0, '#333333')
      .drawMultiLineText(ActivityContent.replace(/&ensp;/g, ' '), 50, draw.nowHeight + 20, 650, 26, 3, '#666666')
      .drawFilletImg(ActivityImg, x, y, this.getRpx(imageWidth), this.getRpx(imageHeight), 50, draw.nowHeight + 30, 650, drawHeight, 10)
      .drawText('长按扫码', 650 - 168 - 20 + 50, draw.nowHeight + 74, 24, '#333333', false, 'right')
      .drawText('参加更多有趣活动', 650 - 168 - 20 + 50, draw.nowHeight, 24, '#333333', false, 'right')
      .drawImage(data.qrCode, 650 - 168 + 50, draw.nowHeight - 140, 168, 168)
      .drawFinally(function (ctx, nowHeight) {
        console.log(nowHeight)
        let canvasHeight = nowHeight + 50;
        that.setData({
          height: canvasHeight,
          isFinished: true
        })
        that.drawEndImg();
      });
  },
  drawEndImg() {
    let that = this;
    wx.showLoading({
      title: '正在生成图片...',
    })
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.width,
      height: that.data.height,
      destWidth: that.data.width,
      destHeight: that.data.height,
      canvasId: 'shareImg',
      success(res) {
        wx.hideLoading();
        that.setData({
          endImg: res.tempFilePath,
          isFinished: true
        });
      },
      fail: function (err) {
        console.log(err);
      }
    }, that)
  },
  /**
   * 保存图片到相册
   */
  saveImg() {
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });
    if (this.data.bgTrue) {
      wx.hideLoading();
      wx.saveImageToPhotosAlbum({
        filePath: that.data.endImg,
        success: function (re) {
          wx.showToast({
            title: '保存成功',
          });
          that.closeShareModal();
        },
        fail: function (err) {
          console.log(err)
        }
      })
    } else {
      that.changeBgToWhite();
    }
  },
  changeBgToWhite() {
    let that = this;
    const bgCtx = wx.createCanvasContext('bgImg', that);
    bgCtx.fillStyle = "#FFFFFF";
    bgCtx.fillRect(0, 0, that.data.width, that.data.height);
    bgCtx.drawImage(that.data.endImg, 0, 0, that.data.width, that.data.height);
    bgCtx.draw(true, function () {
      let destHeight = 750 / that.data.width * that.data.height;
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: that.data.width,
        height: that.data.height,
        destWidth: 750,
        destHeight: destHeight,
        canvasId: 'bgImg',
        success(result) {
          // 已经是白色背景色了
          that.setData({
            bgTrue: true,
            endImg: result.tempFilePath,
          })
          wx.hideLoading();
          wx.saveImageToPhotosAlbum({
            filePath: result.tempFilePath,
            success: function (re) {
              wx.showToast({
                title: '保存成功',
              })
              that.closeShareModal();
            },
            fail: function (err) {
              console.log(err)
            }
          })
        },
        fail: function (err) {
          wx.hideLoading();
          console.log(err);
        }
      }, that)
    }, that);
  },
  closeShareModal() {
    this.triggerEvent('closeShareModal', false)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
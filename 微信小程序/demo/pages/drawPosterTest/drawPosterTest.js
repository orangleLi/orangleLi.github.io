// pages/drawPosterTest.js
const drawD = require('../../utils/canvasDraw.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: wx.getSystemInfoSync().windowWidth,
    height: 1024,
    imageWidth: 0,
    imageHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let draw = new drawD.canvasDraw('poster', that);
    let logo = 'https://avatars0.githubusercontent.com/u/34326830?s=400&u=2e69fbfaf577e896d414788c869e265e0d449a1b&v=4';
    let themeImg = 'https://orangleli.github.io/imagesResources/1.jpg';
    draw.getImagesInfo([themeImg, logo]).then((res) => {
      themeImg = res[0].path;
      logo = res[1].path;
      that.setData({
        imageWidth: res[0].width,
        imageHeight: res[0].height
      });
      that.drawShareImage(draw, themeImg, logo);
    })
  },
  drawShareImage(draw, themeImg, logo){
    let that = this;
    let hei = that.data.imageHeight / (that.data.imageWidth / (that.data.width - 60))

    let part = '你身体里的每一个原子都来自一颗爆炸了的恒星。形成你左手的原子可能和形成你右手的来自不同的恒星。这是我所知的关于物理的最有诗意的事情：你们都是星尘。'

    draw
      .drawFilletFillImg(themeImg, 30, 30, that.data.width - 60, hei, 10)
      .drawMultiLineText(part, 30, draw.nowHeight + 30, that.data.width - 60, 14, 0, '#000', false)
      .drawMultiLineText(part, 30, draw.nowHeight + 40, that.data.width - 60, 14, 1, '#000', false)
      .drawText('——《这里是出处》', that.data.width - 30, draw.nowHeight + 60, 14, '#000', true, 'right')
      .drawText('2019.09.06', that.data.width - 30, draw.nowHeight + 30, 16, 'rgba(34,34,34,.64)', true, 'right')
      .drawCricleImg(that.data.width - 80, draw.nowHeight + 10, 25, logo)
      .drawFinally(function (ctx) {
        let canvasHeight = draw.nowHeight + 30;
        that.setData({
          height: canvasHeight
        })
      });
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
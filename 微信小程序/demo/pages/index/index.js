//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    src: '',
    width: 250,//宽度
    height: 250,//高度
    detailUrl: ''
  },
  onLoad: function (options) {
    this.cropper = this.selectComponent("#image-cropper");
    console.log(app.globalData.chooseImg)
    this.setData({
      src: app.globalData.chooseImg.tempFilePaths[0]
    })
    wx.showLoading({
      title: '加载中'
    })
  },
  cropperload(e) {
    console.log("cropper初始化完成");
  },
  loadimage(e) {
    console.log("图片加载完成", e.detail);
    wx.hideLoading();
    //重置图片角度、缩放、位置
    this.cropper.imgReset();
  },
  resetImg() {
    this.cropper.imgReset()
  },
  confirm() {
    this.cropper.getImg(function(e) {
      console.log(e)
      //   //点击裁剪框阅览图片
      // wx.previewImage({
      //   current: e.url, // 当前显示图片的http链接
      //   urls: [e.url] // 需要预览的图片http链接列表
      // })
      wx.redirectTo({
        url: '../mall/mall?url=' + e.url,
      })
    })
  }
})

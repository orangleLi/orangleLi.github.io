// pages/weCropperTest/weCropperTest.js

import WeCropper from '../we-cropper/we-cropper.js'
const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const height = width
const cropperWidth = (315 / (750 / width))
// const cropperWidth = 157
const cropperHeight = cropperWidth
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cropperOpt: {
      id: 'cropper', // 用于手势操作的canvas组件标识符
      targetId: 'targetCropper', // 用于用于生成截图的canvas组件标识符
      pixelRatio: device.pixelRatio, // 传入设备像素比
      width,  // 画布宽度
      height, // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 8, // 缩放系数
      cut: {
        x: (width - cropperWidth) / 2, // 裁剪框x轴起点
        y: (width - cropperHeight) / 2, // 裁剪框y轴起点
        width: cropperWidth, // 裁剪框宽度
        height: cropperHeight // 裁剪框高度
      }
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { cropperOpt } = this.data

    this.cropper = new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast()
      })

    let src = decodeURIComponent(options.src);
    this.cropper.pushOrign(src)
  },
  touchStart(e) {
    this.cropper.touchStart(e)
  },
  touchMove(e) {
    this.cropper.touchMove(e)
  },
  touchEnd(e) {
    this.cropper.touchEnd(e)
  },
  // uploadTap: function () {
  //   const self = this

  //   wx.chooseImage({
  //     count: 1, // 默认9
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success(res) {
  //       const src = res.tempFilePaths[0]

  //       self.cropper.pushOrign(src)
  //     }
  //   })
  // },
  getCropperImage: function () {
    this.wecropper.getCropperImage((tempFilePath) => {
      // tempFilePath 为裁剪后的图片临时路径
      console.log(tempFilePath)
      if (tempFilePath) {
        // wx.previewImage({
        //   current: '',
        //   urls: [tempFilePath]
        // })
        // wx.saveImageToPhotosAlbum({
        //   filePath: tempFilePath,
        //   success(result) {
        //     console.log(result)
        //   }
        // })
        wx.redirectTo({
          url: '../toWeCopperTest/toWeCopperTest?url=' + tempFilePath,
        })
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
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
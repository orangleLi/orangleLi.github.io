// pages/pictureCompression/pictureCompression.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
  * 选项添加图片事件
  */
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: result => {
        console.log('图片原大小：' + result.tempFiles[0].size)
        wx.getImageInfo({
          src: result.tempFilePaths[0],
          success: function (res) {
            that.getCanvasSize(res.width, res.height, function (canvasWidth, canvasHeight) {
              that.setData({
                cWidth: canvasWidth,
                cHeight: canvasHeight
              })
              that.getCanvasImg(result.tempFilePaths, canvasWidth, canvasHeight, function (res) {
                const images = that.data.imageList.concat(res.tempFilePath);
                if (images && images.length > 3) {
                  wx.showToast({
                    title: '最多3张图片哦',
                    icon: 'none',
                    duration: 2000
                  })
                }
                // 限制最多只能留下3张照片
                let imageList = images.length <= 3 ? images : images.slice(0, 3);
                that.setData({
                  imageList: imageList
                });
              });
            })

          }
        })

      }
    })

  },

  save(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imageList[index],
      success: function (res) {
        console.log('图片已保存');
      },
      fail: function (res) {
        console.log('保存失败');
      }
    })
  },

  getCanvasSize (width, height, callback){
    var that = this;
    var ratio = 2.5;
    var canvasWidth = width //图片原始长宽
    var canvasHeight = height
    while (canvasWidth > 800 || canvasHeight > 800) {// 保证宽高在400以内
      canvasWidth = Math.trunc(width / ratio)
      canvasHeight = Math.trunc(height / ratio)
      ratio++;
    }
    callback && callback(canvasWidth, canvasHeight);
  },

  getCanvasImg(tempFilePaths, canvasWidth, canvasHeight, callback) {
    var that = this;
    const ctx = wx.createCanvasContext('attendCanvasId');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(tempFilePaths[0], 0, 0, canvasWidth, canvasHeight);
    ctx.draw(false, function () {
      wx.canvasToTempFilePath({
        canvasId: 'attendCanvasId',
        success: function success(res) {
          callback && callback(res)
        }, fail: function (e) {
          wx.showToast({
            title: '图片上传失败，请重新上传！',
            icon: 'none'
          })
        }
      });
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
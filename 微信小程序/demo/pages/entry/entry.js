// pages/entry/entry.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toMall() {
    wx.navigateTo({
      url: '../mall/mall',
    })
  },

  toWeCropper() {
    wx.navigateTo({
      url: '../toWeCopperTest/toWeCopperTest',
    })
  },

  toLoaction() {
    wx.navigateTo({
      url: '../Location/Location',
    })
  },

  toSlidingSwitch() {
    wx.navigateTo({
      url: '../slidingSwitch/slidingSwitch',
    })
  },

  toaddShoppingCarAnimate() {
    wx.navigateTo({
      url: '../addShoppingCarAnimate/addShoppingCarAnimate',
    })
  },

  toPictureCompression() {
    wx.navigateTo({
      url: '../pictureCompression/pictureCompression',
    })
  },

  toSlide() {
    wx.navigateTo({
      url: '../slide/slide',
    })
  },

  toDrawPoster() {
    wx.navigateTo({
      url: '../drawPoster/drawPoster',
    })
  },
  toDrawPosterTest() {
    wx.navigateTo({
      url: '../drawPosterTest/drawPosterTest',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
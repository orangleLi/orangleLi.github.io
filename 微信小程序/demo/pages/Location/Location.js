// pages/Location/Location.js
const app = getApp();
const location = require('../../common/location.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityAddress: '定位中',
    isShare: '',
    num: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    location.init(function (activityAddress) {
      _this.setData({
        activityAddress: activityAddress
      })
    })
  },
  onChangeAddress: function (e) {
    var _this = this;
    location.onChangeAddress(e, function (activityAddress) {
      _this.setData({
        activityAddress: activityAddress
      })

    })
  },
})
var QQMapWX = require('../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
let activityAddress = '定位中';
let isShowMap = false;//是否显示地图查看选择功能
let isAutoPosition = true;//是否需要自动定位
let isLocationAuthorize = false;
let positionInfo = {
  latitude: 0,
  longitude: 0,
}

let init = (callback) => {
  qqmapsdk = new QQMapWX({
    key: 'ULABZ-3ZX6U-U2HVA-BE6V2-5OW3H-OOFZ2'
  });
  getLocation(function (activityAddress) {
    callback && callback(activityAddress)
  })
}

function getLocation(callback) {
  var self = this;
  wx.getLocation({
    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的坐标，可传入'gcj02'
    altitude: true, //传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
    success: function (res) {
      console.log(res)
      var latitude1 = res.latitude
      var longitude1 = res.longitude
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude1,
          longitude: longitude1
        },
        success: function (res) {
          console.log(res);
          let activityAddress = res.result.address;
          positionInfo = {
            latitude: latitude1,
            longitude: longitude1,
          }
          isLocationAuthorize = true,
          activityAddress = activityAddress,
            isAutoPosition = false
          callback && callback(activityAddress)
          // self.setData({
          //   positionInfo: {
          //     latitude: latitude1,
          //     longitude: longitude1,
          //   },
          //   isLocationAuthorize: true,
          //   activityAddress: activityAddress,
          //   isAutoPosition: false
          // });
        }
      });
    },
    fail: function (res) {
      //未授权就弹出弹窗提示用户重新授权
      // self.reAuthorize();
      reAuthorize();
    }
  });
}
/**
* 2. 根据用户定位打开地图
*/
function openMap () {
  wx.getLocation({
    type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    success: function (res) {
      console.log(res)
      var latitude = res.latitude
      var longitude = res.longitude
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 28
      })
    }
  })
}
/**
* 2.1 选择位置
*/

function onChangeAddress(e, callback) {
  let that = this,
    qqmapsdk = new QQMapWX({
      key: 'ULABZ-3ZX6U-U2HVA-BE6V2-5OW3H-OOFZ2'
    });
  // that.setData({
  //   isShowMap: true
  // })
  // that.moveToLocation();
  isShowMap = true
  moveToLocation(function (activityAddress) {
    callback && callback(activityAddress)
  });
}

//移动选点
function moveToLocation(callback) {
  var that = this;
  wx.chooseLocation({
    success: function (res) {
      console.log(res.name);
      if (res.name && res.name != '') {
        // that.setData({
        //   positionInfo: {
        //     latitude: res.latitude,
        //     longitude: res.longitude,
        //   },
        //   activityAddress: res.address,
        //   isAutoPosition: false,
        //   isShowMap: false
        // });
        positionInfo = {
          latitude: res.latitude,
          longitude: res.longitude,
        },
        activityAddress = res.address,
        isAutoPosition = false,
          isShowMap = false
        callback && callback(activityAddress)

      }
    },
    fail: function (err) {
      // that.setData({
      //   isShowMap: false
      // });
      isShowMap = false
      console.log(err)
    }
  });
}
/**
 * 1.2 重新授权按钮点击事件
 * click event   
 */
function openLocationSetting() {
  var self = this
  //先获取用户的当前设置，返回值中只会出现小程序已经向用户请求过的权限
  wx.getSetting({
    success: function (res) {
      if (res.authSetting && !res.authSetting["scope.userLocation"]) {
        //未授权则打开授权设置界面
        wx.openSetting({
          success: function (res) {
            if (res.authSetting && res.authSetting["scope.userLocation"]) {
              //允许授权,则自动获取定位，并关闭二确弹窗，否则返回首页不处理
              // self.getLocation();
              getLocation();
              // self.setData({
              //   hiddenReAuthorizePop: true
              // })
              hiddenReAuthorizePop = true
              wx.showToast({
                title: '您已授权获取位置信息',
                icon: 'none'
              })
            } else {
              //未授权就弹出弹窗提示用户重新授权 
              // self.getLocation();
              getLocation();
            }
          }
        })
      } else {
        //授权则重新获取位置新（授权设置界面返回首页，首页授权二确弹窗未关闭）
        // self.getLocation();
        getLocation();
      }
    }
  })
}
/**
 * 重新授权
 */
function reAuthorize() {
  // var self = this;
  // self.setData({ hiddenReAuthorizePop: false })
  hiddenReAuthorizePop = false
}


module.exports = {
  init: init,
  onChangeAddress: onChangeAddress
}
// pages/addShoppingCarAnimate/addShoppingCarAnimate.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ani: null,
    iconSize: 30, // 图标大小为30rpx * 30rpx
    searchBarHeight: 0,
    style: 'left: 0px; top: 0px',
    shoppingCarSize: {
      top: 0,
      left: 0
    },
    shoppingCarIsShow: false,
    categoryList: [
      { Name: '全部' },
      { Name: '食品生鲜' },
      { Name: '零食酒水' },
      { Name: '生活百货' }
    ],
    nowIndex: 0,
    nowShowData: [
      {
        "skuId": "1",
        "title": null,
        "Price": 88.00,
        "originalPrice": 98.00,
        "ImageId": "1",
        "ImageUrl": "",
        "SaleCount": 1,
        "ProductName": "原瓶进口 智利茵普瑞精选佳美娜干红葡萄酒 单瓶装1",
        "ProductTitle": "原瓶进口 智利茵普瑞精选佳美娜干红葡萄酒1",
        "Tag": null,
        "ProductId": "1",
        "isSelect": false
      },
      {
        "skuId": "2",
        "title": null,
        "Price": 88.00,
        "originalPrice": 98.00,
        "ImageId": "1",
        "ImageUrl": "",
        "SaleCount": 1,
        "ProductName": "原瓶进口 智利茵普瑞精选佳美娜干红葡萄酒 单瓶装2",
        "ProductTitle": "原瓶进口 智利茵普瑞精选佳美娜干红葡萄酒2",
        "Tag": null,
        "ProductId": "1",
        "isSelect": false
      },
      {
        "skuId": "3",
        "title": null,
        "Price": 88.00,
        "originalPrice": 98.00,
        "ImageId": "1",
        "ImageUrl": "",
        "SaleCount": 1,
        "ProductName": "原瓶进口 智利茵普瑞精选佳美娜干红葡萄酒 单瓶装3",
        "ProductTitle": "原瓶进口 智利茵普瑞精选佳美娜干红葡萄酒3",
        "Tag": null,
        "ProductId": "1",
        "isSelect": false
      },
    ],
    nowSelectData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.querySearchBarSize();
    this.quertShoppingCarSize();
  },

  deleteGoods(e) {
    let that = this;
    let skuId = e.currentTarget.dataset.id;
    // 删除
    let resData = that.deleteDataById(skuId);
    that.setData({
      nowSelectData: resData
    });
    if (resData.length === 0) {
      that.setData({
        shoppingCarIsShow: false
      })
    }
  },
  deleteDataById(skuId) {
    let that = this;
    let nowSelectData = that.data.nowSelectData;
    let index = -1;
    for (let i = 0; i < nowSelectData.length; i++) {
      if (skuId === nowSelectData[i].skuId) {
        index = i;
        break;
      }
    }
    let nowShowData = that.data.nowShowData;
    for (let i = 0; i < nowShowData.length; i++) {
      if (skuId === nowShowData[i].skuId) {
        let tag = 'nowShowData[' + i + '].isSelect';
        that.setData({
          [tag]: false
        })
        break;
      }
    }
    // 
    nowSelectData.splice(index, 1);
    return nowSelectData;
  },

  /**
   * 加入购物车
   */
  selectGoods(e) {
    let that = this;
    that.queryPos(e);
  },
  setDataaddShoppingCar(e) {
    let that = this;
    let skuId = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let data = that.data.nowShowData[index];
    data.isSelect = true;

    let nowSelectData = that.data.nowSelectData;
    let tag = 'nowShowData[' + index + '].isSelect';

    nowSelectData.push(data);
    that.setData({
      [tag]: true,
      nowSelectData: nowSelectData
    });
  },

  // 加入购物车动画 start
  queryPos(e) {
    let that = this;
    let pixelRatio = app.globalData.pixelRatio;
    let size = this.data.iconSize / pixelRatio / 2;
    this.quertElementSize('index-nav', function (rect) {
      that.setData({
        style: `left: ${e.detail.x - size - 20}px; top: ${e.detail.y + rect.top - size - that.data.searchBarHeight - 20}px;opacity:0;`
      })
      let timer = setTimeout(function () {
        that.setData({
          style: `left:${e.detail.x - size - 20}px; top: ${e.detail.y + rect.top - size - that.data.searchBarHeight - 20}px;opacity:1;`
        })
        console.log(that.data.style)
        console.log(that.data.shoppingCarSize.left, that.data.shoppingCarSize.top)
        that.playAnimation(e, that.data.shoppingCarSize.left, that.data.shoppingCarSize.top);
      }, 5);

    });

  },

  /**
   * 小球飞入购物车动画
   */
  playAnimation(e, left, top) {
    let that = this;
    setTimeout(function () {
      that.setData({
        style: `transition: all 0.5s cubic-bezier(.11,-.13,.55,.11) 0s;
      left: ${left}px; top: ${top}px; opacity:0;`
      });
    }, 5);
    that.setDataaddShoppingCar(e);
  },
  querySearchBarSize() {
    let that = this;
    this.quertElementSize('searchBar', function (rect) {
      that.setData({
        searchBarHeight: rect.height
      })
    });
  },
  quertShoppingCarSize() {
    let that = this;
    this.quertElementSize('shoppingCar', function (rect) {
      that.setData({
        'shoppingCarSize.top': rect.top + (rect.height / 2),
        'shoppingCarSize.left': rect.left + (rect.width / 2)
      })
    });
  },
  quertElementSize(id, callback) {
    let query = wx.createSelectorQuery();
    query.select('#' + id).boundingClientRect((rect) => {
      callback && callback(rect);
    }).exec()
  },


  /**
   * 购物车列表弹起
   */

  transShoppingCar() {
    let that = this;
    if (this.data.nowSelectData.length === 0) {
      wx.showToast({
        title: '购物车内没有商品哦~',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    let shoppingCarIsShow = that.data.shoppingCarIsShow;
    shoppingCarIsShow = !shoppingCarIsShow;

    var animation = wx.createAnimation({
      duration: 500,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    });
    this.animation = animation;
    if (shoppingCarIsShow) {
      this.setData({
        shoppingCarIsShow: shoppingCarIsShow
      });
      that.fadeIn();//调用显示动画

    } else {

      that.fadeDown();//调用隐藏动画   
      let time = setTimeout(function () {
        this.setData({
          shoppingCarIsShow: shoppingCarIsShow
        });
        clearTimeout(time);
      }.bind(this), 500)//先执行下滑动画，再隐藏模块
    }
  },
  //动画集
  // 进入
  fadeIn: function () {
    this.animation.translateY(0).opacity(1).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function () {
    this.animation.translateY(300).opacity(0).step()
    this.setData({
      animationData: this.animation.export(),
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
<template>
  <div class="listView-wrapper">
    <my-header :title="title" @back="back"></my-header>
    <!--<div class="selectGroup top">-->
      <div class="sortGroup top lineBorderAfter">
        <list-filter @showFilterModal="showFilterModal" :listInfo="listInfo"></list-filter>
        <list-filter @showFilterModal="showFilterModal" :listInfo="sortList"></list-filter>
        <list-filter @showFilterModal="showFilterModal" :listInfo="screenList"></list-filter>
      </div>
      <child-list-filter :showInfo="listFilterShowInfo"
                         :isShow="filterModalIsShow"
                         :showModalTag="showModalTag"
                         @showFilterModal="showFilterModal"
                         @closeScreenListModal="closeScreenListModal"
                         @selectData="selectData"
      ></child-list-filter>
    <!--</div>-->
    <ul ref="selfMentionList" class="selfMentionList" >
      <li class="selfMention" v-for="item in gbGoodsList.data" :key="item.id" @click.prevent.stop="toGoodsDetail(item.skuId)">
        <img class="selfMentionImg" v-lazy="item.ImageUrl"/>
        <div class="infoGroup">
          <div class="title">{{item.ProductName || item.title}}</div>
          <div class="dataGroup">
            <div class="data">
              <div class="priceGroup">
                <span class="price">&yen;{{item.Price}}</span>
                <span class="originPrice">&yen;{{item.originalPrice}}</span>
              </div>
              <div class="num">
                <span>已售{{item.SaleCount}}份</span>
              </div>
            </div>
            <img class="addShoppingCar" src="../assets/images/gwc02_icon.png" @click.prevent.stop="addShoppingCar(item.skuId)"/>
          </div>
        </div>
      </li>
    </ul>
    <div class="empty" v-if="emptyImg">
      <img src="../assets/images/empty.png"/>
      <span>没有数据哦</span>
    </div>
    <footer-span v-if="gbGoodsList.data && gbGoodsList.data.length > 0"></footer-span>
    <a class="toShoppingCar" href="http://wx.4007616616.com/pay/ShoppingCart?CouponsCode=&CouponsAmount=0&back=1">
      <img class="toShoppingCarImg" src="../assets/images/gwc_icon.png"/>
      <div class="shoppingCarNum"><span>{{shoppingCarNum}}</span></div>
    </a>
    <a href="#" id="cdTop" class="cd-top">
      <img src="../assets/images/btotop_icon.png"/>
    </a>
    <loading ref="loading"></loading>
  </div>
</template>

<script>
import listFilter from '@/base/listFilter';
import childListFilter from '@/base/childListFilter';
import myHeader from '@/base/myHeader/myHeader';
import footerSpan from '@/base/footerSpan';
import $ from 'jquery';
import {getParam} from '@/common/js/util';
export default {
  name: 'normalListView',
  data () {
    return {
      pageNo: 1,
      pageSize: 8,
      isFinished: false,
      title: '商品列表',
      nowTag: -1, // 标记当前点的是全部分类还是默认排序
      nowTagTitleOne: '',
      nowTagTitleTwo: '0',
      IsCashOnDelivery: false, // 货到付款
      IsPromotion: false, // 促销
      shoppingCarNum: 0, // 购物车商品数量
      // showModalTag: 1 显示列表选择框， 2 对勾按钮选择框
      showModalTag: 1,
      filterModalIsShow: false,
      screenListModalIsShow: false,
      listFilterShowInfo: [],
      listInfo: {
        tag: 0,
        title: '全部分类',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAFMN540AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZDNkI4MTlBN0M2RjExRTk4MDE5OEI0MzlDRDRFRURFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZDNkI4MTlCN0M2RjExRTk4MDE5OEI0MzlDRDRFRURFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkM2QjgxOTg3QzZGMTFFOTgwMTk4QjQzOUNENEVFREUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkM2QjgxOTk3QzZGMTFFOTgwMTk4QjQzOUNENEVFREUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz65RxMlAAABt0lEQVR42mJMS0tjQAZMSOz/6AIM2AT+AwQQIzYz/qObwYjPDAaAAEI24z9UNcwIRnQdjAxYABMDbgA2DZuCNiD+CrMSIIAw/IHN+LlQ1f/RJefi0skCxMlQdhIprsYr+R+XJMhhTCxIAiD/TUCOGYAAwubPuVDHgULqNxD/A2J2pLjA6qa5WBSAbGYj5CHkmE1iIBKw4It9YjWTCkCWRbOQoekfzMukav6HnIEAAghvkiQEmLDlAmj8IsfCHyD+iS/AkP2D7h1mKMZqM7JGkpyNrJGZ1HiOwlIMEW3zUrTCh+zQHvyao0FeJSdjwAsLJjI1zgPiJaRqhmlMJsfP85AKYayFQStSyfIVSjcAsRAQ5yMrBAgwYrIkyKA+IE4B4qlAXAEVb4EaNgmIq5EszkMTw24oHotBFs7BUpgyomV1QmJEl524LKQqYMJSxf5DsnQ+qaUDqbUFKIcsQUtFqeSUaaRavAzJZ4vJKY3ItRhk0SIGOgImhgECw95iRrTWagwLHSxELxNAOWYpLS2ei8XCFFiOoaXFSdgsJDWO/0DpXwTEfqP5kAlanf0nt53LSqQYG7HBAQBCmV8ZxIJvNwAAAABJRU5ErkJggg==',
        list: [
          {
            title: '食品',
            child: [
              {
                title: '坚果',
                child: []
              },
              {
                title: '薯片',
                child: []
              }
            ]
          },
          {
            title: '生活用品',
            child: [
              {
                title: '锅',
                child: []
              },
              {
                title: '电饭煲',
                child: []
              }]
          }
        ]
      },
      sortList: {
        tag: 1,
        title: '默认排序',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAFMN540AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU4Qzk2OTQ5N0M2RjExRTlCRUFFOTVCQUE4RDcxRjA3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU4Qzk2OTRBN0M2RjExRTlCRUFFOTVCQUE4RDcxRjA3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RThDOTY5NDc3QzZGMTFFOUJFQUU5NUJBQThENzFGMDciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RThDOTY5NDg3QzZGMTFFOUJFQUU5NUJBQThENzFGMDciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4ESCQNAAAByUlEQVR42mJMS0tjQAZMUPo/jIYJMMJoDBUAAcSIbgYLkiwInGBB0o9VBQNAAMHMQBZkROLnMTGgAm8oXQDEZ4B4Mguagq1QEyagewTdBDgfIIBQ/DFz5kyG9PR0nC5GdhwDutEYIfoCTQyk+ysQs4OMlcSiiYf6dsL5AAGELaxh4DnQ31JQf0sD8RMkuQtAbIjPWmSPPEGTMwDiH3jdjAQuYhHjZ/z//z8DuYAF6idCfsYqT6yfscozMVAAAAIII2shA/Qkii0RPIP6CR0jg/NoctIwzYT8lguNVwb0eCfGzz34nE0InKNEswMWsUswzd5YJJ8isX+Cci20zPkKLX/0wVFFjeRJs3jGKU9MPEtSEtoMg1MzoXjGKQ8QYLAs6QnEc4kIvOdAnAzE20HRCAJoUckGxBlAHAnEOlCxK0C8HIhnAPEv5BoIBLYR6UtJqFpGNHGQhSex5FwQsIDiidBC2ByU4ikKayRwEIel6ACUnQ5QHMlIwIgEtTrUtLiUBLXVyBY/J0HjCyxik4BYBlpl46tkZaBq4YlLigq+BmUTQ6JrOEqKTUoArMilNB+TrJ9a+Zhk/UwMAwRGrsWU5mOS9VMrH5OsHwDz9I7WJIYw1gAAAABJRU5ErkJggg==',
        list: [
          {
            title: '默认排序',
            child: []
          },
          {
            title: '销量排序',
            child: []
          },
          {
            title: '价格升序',
            child: []
          },
          {
            title: '价格降序',
            child: []
          },
          {
            title: '评价排序',
            child: []
          }
        ]
      },
      screenList: {
        tag: 2,
        title: '筛选',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAFMN540AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBCRDY2ODAyN0M3MDExRTlBNTEzQTBGOUZCODI0RTVEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBCRDY2ODAzN0M3MDExRTlBNTEzQTBGOUZCODI0RTVEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEJENjY4MDA3QzcwMTFFOUE1MTNBMEY5RkI4MjRFNUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEJENjY4MDE3QzcwMTFFOUE1MTNBMEY5RkI4MjRFNUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Bh9MDAAAB9klEQVR42mL8//8/AzJgSU9PB9FzgTgZiP8zQSVAnAogZmRiQAMAAcSIzQyYfkaYGWDDoJgBZkYMTAtAADGmpaUxwGSxgDgWmEKo20AgBYj/QcUYWJBUw+y6DZNEtpMByaTHyAIAAYThD3Q/4ZRlQrKHEQmD5ZiQJGAmgGhm5NAFgUok9j9sLsawEwY68UliuBoggGBhTRaABTMoDpKA+CMQz8CjHuTrMpirWJDiJxlqSDkQz4PykTX9g7KZcYUGLHXxI/mxAqqYGc0QnEF5BovYP3yhSTLApbkDOW3iAgABhDdJEowqaFYm29kxSFmWFAxOJEuBeDHUsC48ORsEMqDROA+mGZY//kJTDxMOA+YiaUxGDm1YImBALiLQNCahpzwmtESAzQCsGrHF8z8ksTYoDdK4GV0jrkSCzb9XSUlhFCVP2mtmwSEOSnXLyNW8lJrOvoJNECDAKMqSFIUXNDszQsNIisb2PQPiJaB0CAvrKCBeRCfPgnLPUiakSGWGFQ9IYB5S1UsKZsJj1lJsBUEymgOSoOJziSnDkRot/6B6YRYyI7VVcKZMchzARMBCkqo4mAOYsDjAC0mdN7TAJspCUvLif6ghyA0kWyS2Llq1itdCqpRdA1ZoDnuLHxMqf6lRxeCqOZYO+aBmoYIZnUjRsIxYTQBso4rVav7VRgAAAABJRU5ErkJggg=='
      },
      emptyImg: false,
      gbGoodsList: {
        data: []
      },
      communityId: '',
      userId: '',
      categoryId: ''
    };
  },
  created () {
    window.addEventListener('scroll', this.onScroll);
  },
  mounted () {
    let that = this;
    that.$refs.loading.showLoading({
      title: '正在加载...'
    });
    let paramsJson = getParam(window.location.search);
    console.log(paramsJson);
    this.communityId = paramsJson.communityId;
    this.userId = paramsJson.userId;
    this.categoryId = paramsJson.categoryId;
    // this.$refs.scroll.refresh();
    that.initBackTop();
  },
  computed: {
    isShowSelectBox () {
      return this.$route.query.showSelectBox;
    }
  },
  methods: {
    showFilterModal: function (obj) {
      let tag = obj.tag;
      let filterModalIsShow = obj.filterModalIsShow;
      this.nowTag = tag;
      console.log('----------------------------------' + tag);
      console.log(filterModalIsShow);
      this.filterModalIsShow = filterModalIsShow;
      // 筛选框
      if (tag === 2) {
        this.showModalTag = 2;
      } else {
        this.showModalTag = 1;
        // 全部分类框
        if (tag === 1) {
          this.listFilterShowInfo = this.sortList.list;
        } else if (tag === 0) {
          // 默认排序框
          this.listFilterShowInfo = this.listInfo.list;
        } else if (tag === -1) {
          // 关闭
          this.filterModalIsShow = false;
        }
      }
    },
    selectData (res) {
      let that = this;
      if (res.screenList) {
        this.filterModalIsShow = false;
      } else {
        this.filterModalIsShow = false;
      }
      console.log('get: ' + JSON.stringify(res));
      console.log('get: ' + res.data);
      console.log(that.nowTag);
    },
    closeScreenListModal () {
      this.filterModalIsShow = false;
    },
    initBackTop () {
      let that = this;
      var offset = 100;
      var offsetOpacity = 1200;
      var scrollTopDuration = 600;
      var topObj = $('#cdTop');
      $(window).scroll(function () {
        ($(this).scrollTop() > offset) ? topObj.addClass('cd-is-visible') : topObj.removeClass('cd-is-visible cd-fade-out');
        if ($(this).scrollTop() > offsetOpacity) {
          topObj.addClass('cd-fade-out');
        }
      });

      topObj.on('click', function (event) {
        event.preventDefault();
        that.playAnimate(scrollTopDuration);
      });
    },
    playAnimate (scrollTopDuration) {
      $('body,html').animate({
        scrollTop: 0
      }, scrollTopDuration);
    },
    // 下拉加载更多
    onScroll () {
      let that = this;
      if (that.isFinished) return;
      if (that.$refs.loading) {
        that.$refs.loading.hideLoading();
      }
      // 可滚动容器的高度
      let innerHeight = document.querySelector('#normalListView').clientHeight;
      // 屏幕尺寸高度
      let outerHeight = document.documentElement.clientHeight;
      // 可滚动容器超出当前窗口显示范围的高度
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      // scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
      // alert(innerHeight + ' ' + outerHeight + ' ' + scrollTop);
      if (innerHeight < (outerHeight + scrollTop)) {
        // 加载更多操作
        // that.pageNo++;
      } else {
        if (that.$refs.loading) {
          that.$refs.loading.hideLoading();
        }
      }
    },
    back () {
      window.history.go(-1);
    }
  },
  components: {
    childListFilter,
    listFilter,
    myHeader,
    footerSpan
  }
};
</script>

<style scoped>
  @import "../assets/css/style.css";
  .sortGroup{
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    background-color: #fff;
    height: 0.85rem;
    font-size: 0.3rem;
    z-index: 2001;
  }
  .scroll{
    height: 100%;
    overflow: hidden;
  }
  .selfMentionList{
    background-color: #fff;
    padding: 0.3rem 0.3rem 0 0.3rem;
    margin-top: 1.76rem;
  }
  .addShoppingCar{
    width: 0.6rem;
    height: 0.6rem;
  }
  .toShoppingCar{
    position: fixed;
    left: 0.2rem;
    bottom: 30%;
    display: flex;
  }
  .toShoppingCarImg{
    width: 0.88rem;
    height: 0.88rem;
  }
  .shoppingCarNum{
    width: 0.5rem;
    height: 0.34rem;
    line-height: 0.34rem;
    color: #fff;
    font-size: 0.26rem;
    text-align: center;
    margin-left: -0.3rem;
    background: linear-gradient(to bottom right, #ff5b1f , #ff7200);
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
  }
  .cd-top img{
    width: 0.88rem;
    height: 0.88rem;
    position: fixed;
    right: 0.2rem;
    bottom: 8%;
  }
  .empty{
    width: 2rem;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: #797976;
  }
  .empty img{
    width: 2rem;
  }
  .empty span{
    padding-top: 0.3rem;
  }
  .price{
    padding: 0!important;
  }
</style>

<template>
  <div class="index-container" @touchstart="onTouchStart()" @touchend="onTouchEnd()">
    <div class="content">
      <rotation-chart :imagesArr="imagesArr" :len="len"
      ></rotation-chart>
      <span>内容</span>
    </div>
    <footer-span></footer-span>
    <loading ref="loading"></loading>
    <!--<wx-modal ref="wxModal"></wx-modal>-->
  </div>
</template>

<script>
import rotationChart from '@/base/rotationChart';
import footerSpan from '@/base/footerSpan';
import {IMG_SERVER} from '@/axios/api';
// import {getParam, adImg} from '@/common/js/util';
// import axios from 'axios';
export default {
  name: 'indexComp',
  data () {
    return {
      imagesArr: [
        '../static/images/banner.png',
        '../static/images/banner1.png'
      ],
      len: 2
    };
  },
  mounted () {
    // let that = this;
    this.$refs.loading.showLoading({
      title: '正在加载...'
    });
  },
  methods: {
    getImg (path) {
      // console.log(IMG_SERVER + path.substring(1));
      return IMG_SERVER + path.substring(1);
    }
  },
  components: {
    rotationChart,
    footerSpan
  }
};
</script>

<style scoped>
  .index-container {
    height: 100%;
  }
  .content{
    background-color: #fff;
    padding-top: 0.3rem;
  }
  .wrapperBg{
    background: #fff;
  }
  /*.index-container .wrapper1{*/
    /*padding-bottom: 0.36rem;*/
  /*}*/
  .position {
    height: 1.04rem;
    display: flex;
    align-items: center;
    padding-left: 0.3rem;
    font-size: 0.35rem;
    color: #333;
    font-weight: bold;
  }
  .icon_local{
    padding-right: 0.17rem;
    width: 0.26rem;
  }
  .icon_downarr{
    padding-left: 0.23rem;
    width: 0.14rem;
    height: 0.07rem;
  }
  .optionGroup{
    padding: 0.34rem 0.3rem 0 0.3rem;
    /*padding-bottom: 0.36rem;*/
    display: flex;
    /*flex: 1;*/
    /*justify-content: space-between;*/
    overflow-x: scroll;
    /*clear: both;*/
    /*margin-right: 0.3rem;*/
  }
  .optionGroup::-webkit-scrollbar{width:0;}
  .option{
    width: 1.2rem;
    margin-right: 0.7rem;
    /*float: left;*/
  }
  .option img{
    display: block;
    width: 1.2rem;
    height: 1.2rem;
  }
  .option .adInfo{
    padding-top: 0.1rem;
    font-size: 0.26rem;
    color: rgb(51, 51, 51);
  }
  .wrapper2{
    padding: 0 0.3rem;
    margin: 0.16rem 0;
  }
  .wrapper2 .adImg{
    width: 6.9rem;
    height: 1.64rem;
    margin: 0.09rem auto 0.4rem  auto;
  }
  .groupBuying{
    padding: 0 0.3rem;
    margin-bottom: 0.16rem;
  }
  .head{
    padding: 0.4rem 0;
  }
  .head .titleGroup{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.2rem;
    font-size: 0.34rem;
    color: rgb(51, 51, 51);
  }
  .head .titleGroup .title{
    font-weight: bold;
  }
  .moreGroup{
    color: rgb(102, 102, 102);
    font-size: 0.26rem;
  }
  .moreGroup img{
    width: 0.16rem;
    height: 0.22rem;
  }
  .headTag{
    font-size: 0.26rem;
    color: rgb(102, 102, 102);
  }
  .gbGoodsList{
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
  .gbGood{
    width: 3.3rem;
    position: relative;
    height: 4.68rem;
  }
  .gbGood .mainImg{
    width: 100%;
    height: 2.48rem;
    -webkit-border-radius: 0.16rem;
    -moz-border-radius: 0.16rem;
    border-radius: 0.16rem;
  }
  .gbGood .title{
    font-size: 0.3rem;
    color: rgb(51, 51, 51);
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
  }
  .gbGoodsList .gbGoodsListFooter{
    display: flex;
    align-items: center;
    margin-top: 0.3rem;
    margin-bottom: 0.2rem;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .gbGoodsList .gbGoodsListFooter .originPrice{
    font-size: 0.26rem;
    padding-left: 0.1rem;
  }
  .nowToBuyImg{
    width: 0.78rem;
    height: 0.78rem;
  }
  .soldNum{
    color: rgb(51, 51, 51);
    font-size: 0.24rem;
  }
  .classifyGroup .titleGroup{
    padding: 0.39rem 0 0.4rem 0;
    text-align: center;
    font-weight: bold;
    font-size: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .classifyGroup .titleGroup span{
    margin: 0 0.23rem;
  }
  .classifyGroup .titleGroup img{
    width: 2.4rem;
    height: 0.15rem;
  }
  .classify{
    padding-bottom: 0.5rem;
  }
  .classifyImg{
    display: block;
    width: 6.9rem;
    height: 2.3rem;
    margin: 0 auto;
    background-color: rgb(228, 228, 228);
    -webkit-border-radius: 0.16rem;
    -moz-border-radius: 0.16rem;
    border-radius: 0.16rem;
  }
  .classifyInfoGroup{
    display: flex;
    justify-content: center;
    padding-top: 0.16rem;
  }
  .classifyInfoGroup .infoItem{
    width: 2.20rem;
    height: 3.5rem;
    margin-right: 0.15rem;
    position: relative;
  }
  .classifyInfoGroup .infoItem:nth-last-of-type(1){
    margin-right: 0;
  }
  .infoItem img{
    width: 100%;
    height: 2.20rem;
    display: block;
    background-color: rgb(238, 238, 238);
  }
  .classifyInfoGroup .title{
    height: 0.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    margin-top: 0.16rem;
    font-size: 0.26rem;
    color: rgb(51, 51, 51);
  }
  .classifyInfoGroup .classifyPriceGroup{
    /*padding-top: 0.1rem;*/
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .classifyInfoGroup .classifyPriceGroup .price{
    font-size: 0.26rem;
  }
  .classifyInfoGroup .classifyPriceGroup .originPrice{
    font-size: 0.2rem;
  }
  .priceGroup {
    display: flex;
    align-items: center;
  }
  .price{
    padding: 0!important;
  }
</style>

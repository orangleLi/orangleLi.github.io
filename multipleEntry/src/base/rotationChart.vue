<template>
  <div>
    <swiper v-if="len>1" :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="item in imagesArr" :key="item.id">
        <a :href="item"><img class="onlyOneImg" :src='item'></a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="swiper-container" v-if="len===1">
      <a :href="imagesArr[0]"><img class="onlyOneImg" :src='imagesArr[0]'></a>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
// import {getParam} from '@/common/js/util';
export default {
  name: 'rotationChart',
  props: {
    imagesArr: {
      type: Array,
      default: function () {
        return [];
      }
    },
    len: {
      type: Number,
      default: 0
    },
    communityId: {
      type: String,
      default: ''
    },
    userId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isLoop: true,
      swiperOption: {
        loop: true,
        speed: 1200,
        notNextTick: true,
        autoplay: 2500,
        preloadImages: false,
        paginationClickable: true,
        autoplayDisableOnInteraction: false,
        pagination: '.swiper-pagination'
      }
    };
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style scoped>
  .swiper-container{
    margin: 0 0.3rem!important;
    height: 2.72rem;
    padding: 0;
    border-radius: 0.16rem;
    box-shadow: 0px 4px 16px #eee;
    background-color: rgb(206, 206, 206);
  }
  .swiper-wrapper{
    margin: 0;
    padding: 0;
  }
  .swiper-container .onlyOneImg{
    display: block;
    width: 100%;
    height: 100%;
  }
  .swiper-container >>> .swiper-pagination-bullet {
    width: 0.1rem;
    height: 0.04rem;
    -webkit-border-radius: 0.02rem;
    -moz-border-radius: 0.02rem;
    border-radius: 0.02rem;
    background: rgba(255, 255, 255, 0.5);
  }
  .swiper-container >>> .swiper-pagination-bullet-active {
    width: 0.24rem;
    background: rgb(255, 255, 255);
  }
  .swiper-container-horizontal >>> .swiper-pagination-bullets .swiper-pagination-bullet{
    margin: 0 3px;
  }
</style>

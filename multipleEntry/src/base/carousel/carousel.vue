<template>
  <div ref="carouselWrapper" class="slide-show carousel-wrapper" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img carousel-slider">
      <a :href="slides[nowIndex].href">
        <transition
          @before-enter="beforeEnter"
          @enter="enter"
        >
          <!--name="slide-trans"-->
          <!--v-bind:css="false"-->
          <!--:duration="sliderTime"-->
          <img v-if="isShow" :src="slides[nowIndex].src">
        </transition>
        <transition
          @leave="leave"
        >
          <!--name="slide-trans-old"-->
          <img v-if="!isShow" :src="slides[nowIndex].src">
        </transition>
      </a>
    </div>
    <h2>{{ slides[nowIndex].title }}</h2>
    <ul class="slide-pages">
      <li @click="goto(prevIndex)">&lt;</li>
      <li v-for="(item, index) in slides" @click="goto(index)" :key="item.id">
        <a :class="{on: index === nowIndex}">{{ index + 1 }}</a>
      </li>
      <li @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: function () {
        return [];
      }
    },
    inv: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      nowIndex: 0,
      isShow: true,
      sliderTime: 1000
    };
  },
  mounted () {
    this.imageWidth = this.$refs.carouselWrapper.clientWidth;
    this.runInv();
  },
  computed: {
    prevIndex () {
      if (this.nowIndex === 0) {
        return this.slides.length - 1;
      } else {
        return this.nowIndex - 1;
      }
    },
    nextIndex () {
      if (this.nowIndex === this.slides.length - 1) {
        return 0;
      } else {
        return this.nowIndex + 1;
      }
    }
  },
  methods: {
    beforeEnter (el) {
    //   transition: all 1s;
      el.style.transition = `all ${this.inv / 1000}s`;
    },
    enter (el) {
      // transform: translateX(375px);
      // el.style.transition = `all ${this.inv / 1000}s`;
      el.style.transform = `translateX(${this.imageWidth}px)`;
    },
    leave (el) {
      //  transition: all 1s;
      //   transform: translateX(-375px);
      el.style.transition = `all ${this.inv / 1000}s`;
      el.style.transform = `translateX(-${this.imageWidth}px)`;
    },
    goto (index) {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
        this.nowIndex = index;
      }, 10);
    },
    runInv () {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex);
      }, this.inv);
    },
    clearInv () {
      clearInterval(this.invId);
    }
  }
};
</script>

<style scoped>
  .slide-trans-enter-active {
    transition: all 1s;
  }
  .slide-trans-enter {
    transform: translateX(375px);
  }
  .slide-trans-old-leave-active {
    transition: all 1s;
    transform: translateX(-375px);
  }
  .carousel-wrapper{
    position: relative;
    height: 170px;
  }
  .carousel-slider{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    animation-iteration-count:1;
    -webkit-animation-iteration-count:1; /* Safari 和 Chrome */
  }
  .carousel-slider img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .slide-show {
    position: relative;
    /*margin: 15px 15px 15px 0;*/
    /*width: 900px;*/
    /*height: 500px;*/
    overflow: hidden;
  }
  .slide-show h2 {
    position: absolute;
    width: 100%;
    /*height: 100%;*/
    color: #fff;
    background: #000;
    opacity: .5;
    bottom: 0;
    height: 30px;
    text-align: left;
    padding-left: 15px;
  }
  .slide-img {
    width: 100%;
  }
  .slide-img img {
    width: 100%;
    position: absolute;
    top: 0;
  }
  .slide-pages {
    position: absolute;
    bottom: 10px;
    right: 15px;
  }
  .slide-pages li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #fff;
  }
  .slide-pages li .on {
    text-decoration: underline;
  }
</style>

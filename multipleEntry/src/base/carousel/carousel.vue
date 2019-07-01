<template>
    <div ref="carouselWrapper" class="carousel-wrapper">
      <div class="carousel-slider">
        <transition name="slide-trans">
          <img v-show="isShow" :src="slides[nowIndex].src"/>
        </transition>
      </div>
      <div class="carousel-slider">
        <transition name="slide-trans-old">
          <img v-show="!isShow" :src="slides[nowIndex].src"/>
        </transition>
      </div>
    </div>
</template>

<script>
export default {
  name: 'carousel',
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
      isShow: true
    };
  },
  mounted () {
    // 1243
    this.runInv();
  },
  methods: {
    // 1
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
    clear () {
      clearInterval(this.invId);
    }
  },
  computed: {
    prevIndex () {
      let that = this;
      if (that.nowIndex === 0) {
        return that.slides.length - 1;
      } else {
        that.nowIndex--;
      }
    },
    nextIndex () {
      let that = this;
      if (that.nowIndex === that.slides.length - 1) {
        return 0;
      } else {
        return that.nowIndex + 1;
      }
    }
  }
};
</script>

<style scoped>

  .slide-trans-enter-active {
    transition: left 2s;
  }
  .slide-trans-enter {
    transform: translateX(375px);
  }
  .slide-trans-old-leave-active {
    transition: left 2s;
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
  .active{
    /*animation:activeMove 2s infinite;*/
    /*-webkit-animation:activeMove 2s infinite; !*Safari and Chrome*!*/
  }
  /*.prev{*/
    /*animation:prevMove 3s infinite;*/
    /*-webkit-animation:prevMove 3s infinite; !*Safari and Chrome*!*/
  /*}*/
  .next{
    /*animation:nextMove 2s infinite;*/
    /*-webkit-animation:nextMove 2s infinite; !*Safari and Chrome*!*/
  }
  @keyframes activeMove
   {
     from {left:0px;}
     to {left:-375px;}
   }
  @-webkit-keyframes activeMove /*Safari and Chrome*/
  {
    from {left:0px;}
    to {left:-375px;}
  }
  /*@keyframes prevMove*/
  /*{*/
    /*from {left:0px;}*/
    /*to {left:-375px;}*/
  /*}*/
  /*@-webkit-keyframes prevMove !*Safari and Chrome*!*/
  /*{*/
    /*from {left:0px;}*/
    /*to {left:-375px;}*/
  /*}*/
  @keyframes nextMove
  {
    from {left:375px;}
    to {left:0px;}
  }
  @-webkit-keyframes nextMove /*Safari and Chrome*/
  {
    from {left:375px;}
    to {left:0px;}
  }
  .carousel-slider img{
    width: 100%;
    height: 100%;
    display: block;
  }
</style>

<template>
    <div class="slide-show">
        <!--<div class="slide-img" @mouseover="clearInv" @mouseout="runInv">-->
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="slide in slides">
                <img :src="path + strImgPlatform + slide.src">
              </div>
            </div>
          </div>
        <div class="slide-pages">
              <span v-for="(slide,index) in slides" :class="['pageIndex',(nowIndex==index?'nowIndex':'nextIndex')]"></span>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'
    export default {
        name: "",
        data() {
            return {
              nowIndex: 0,
              path:'../static/images/',
              slides:[
                {
                  src : 'banner_one.png'
                },
                {
                  src : 'banner_two.png'
                }
              ],
              strImgPlatform: 'm_'
            }
        },
        computed: {
        },
        methods:{

        },
      created(){
        var ua=window.navigator.userAgent;
        if(ua.indexOf('Mobile')>=0) this.strImgPlatform='m_';
        else{ this.strImgPlatform='pc_';}
      },
      mounted(){
        setInterval(()=>{
          if(this.nowIndex === this.slides.length - 1){
            this.nowIndex =  0;
          }
          else{
            this.nowIndex = this.nowIndex + 1;
          }
        },2700);
        new Swiper('.swiper-container',{
          autoplay:{
            delay:2500
          },
          // autoplay:true,//默认2500,要使用默认的可以这样写
          loop: true
        });
      }
  }
</script>

<style scoped lang="less">
  .slide-show{
    position: relative;
    top: 0;
    .swiper-container{
      img{
        width: 100%;
      }
    }

    .slide-pages{
      position: absolute;
      bottom: 1.5rem;
      width: 100%;
      left: 0;
      margin: 0 auto;
      text-align: center;
      z-index: 1000;
      .pageIndex{
        width: 2.3736rem;
        height: 0.4416rem;
        position: absolute;
      }
      .nowIndex{
        .pageIndex;
        background: #80501c;
      }
      .nextIndex{
        .pageIndex;
        background: #fcc700;
      }
    }
    span:first-child{
      margin-left:-1.5rem;
    }
    span:last-child{
      margin-left:1.5rem;
    }
  }
@media (min-width: 768px) {
  .swiper-container{
    img{
      width: 100%;
    }
  }
}



</style>

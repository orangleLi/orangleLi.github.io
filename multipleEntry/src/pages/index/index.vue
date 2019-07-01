<template>
  <div class="setHeight">
    <!--<index-comp></index-comp>-->
    <carousel :slides="slides" :invTime="invTime"></carousel>
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
import indexComp from '../../components/indexComp';
import Carousel from '../../base/carousel/carousel';
export default {
  name: 'index',
  data () {
    return {
      invTime: 2000,
      slides: [
        {
          src: '../static/images/banner.png',
          title: 'xxx1',
          href: 'detail/analysis'
        },
        {
          src: '../static/images/banner1.png',
          title: 'xxx2',
          href: 'detail/count'
        },
        {
          src: '../static/images/1.jpg',
          title: 'xxx3',
          href: 'http://xxx.xxx.com'
        },
        {
          src: '../static/images/2.png',
          title: 'xxx4',
          href: 'detail/forecast'
        }
      ]
    }
  },
  created () {
    // this.$router.push({
    //   path: '/HomePage/NewIndex'
    // });
  },
  components: {
    Carousel,
    indexComp
  }
};
</script>

<style scoped>
  .setHeight{
    height: 100%;
    background-color: #fff;
  }
</style>

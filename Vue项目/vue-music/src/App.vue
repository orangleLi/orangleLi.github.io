<template>
  <div id="app">
   <m-header></m-header>
    <tab></tab>
    <!--keep-alive 切换时可以对页面进行缓存-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import MHeader from '@/components/m-header/m-header'
  import Tab from '@/components/tab/tab'
  import Player from "@/components/player/player";

  export default {
    components: {
      Player,
      MHeader,
      Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/variable"

</style>

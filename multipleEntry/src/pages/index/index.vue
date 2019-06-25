<template>
  <div class="setHeight">
    <index-comp></index-comp>
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
import indexComp from '../../components/indexComp';
export default {
  name: 'index',
  created () {
    // this.$router.push({
    //   path: '/HomePage/NewIndex'
    // });
  },
  components: {
    indexComp
  }
};
</script>

<style scoped>
  .setHeight{
    height: 100%;
  }
</style>

<template>
  <div class="footerComp display_flex align-items_flex-start">
    <div class="flex"></div>
    <span class="footerSpan">我是有底线的</span>
    <div class="flex"></div>
  </div>
</template>

<script>
export default {
  name: 'footerSpan'
};
</script>

<style scoped>
  .footerComp{
    margin: 0.49rem 0.24rem 0.5rem 0.24rem;
    height: 0.2rem;
    line-height: 0.2rem;
    display: flex;
    align-items: center;
    background-color: #f4f4f4;
  }
  .footerComp .footerSpan{
    font-size: 0.2rem;
    color: rgb(170, 170, 170);
    margin: 0 0.19rem;
  }
  .footerComp .flex{
    flex: 1;
    height: 1px;
    background: rgb(229, 229, 229);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>

<template>
    <div class="header-warpper">
      <div class="back" @click.prevent.stop="back">
        <img src="./back.png"/>
      </div>
      <div class="title">{{title}}</div>
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'myHeader',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    back () {
      this.$emit('back');
    }
  }
};
</script>

<style scoped>
  .header-warpper{
    position: fixed;
    top: 0;
    background-color: rgb(255, 92, 30);
    color: #fff;
    font-size: 0.36rem;
    text-align: center;
    width: 100%;
    height: 0.96rem;
    line-height: 0.96rem;
    display: flex;
    justify-content: center;
    z-index: 2000;
  }
  .back{
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
  .back img{
    width: 0.18rem;
    height: 0.3rem;
  }
</style>

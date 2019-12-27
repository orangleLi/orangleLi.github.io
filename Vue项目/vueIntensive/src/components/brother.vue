<template>
  <div @click="listenerFun">brother</div>
</template>

<script>
export default {
  name: 'brother',
  mounted () {
    // 调用之前先解绑，不然有可能多次触发bus
    this.$bus.$off('childMsg')
    this.$bus.$on('childMsg', (data) => {
      console.log(data)
    })
    this.$bus.$on('childMsg', (data) => {
      console.log(data)
    })
  },
  methods: {
    listenerFun () {
      this.$emit('listenerFun')
    }
  },
  // 组件销毁前清除事件监听
  beforeDestroy () {
    this.$bus.$off('childMsg')
  }
}
</script>

<style scoped>

</style>

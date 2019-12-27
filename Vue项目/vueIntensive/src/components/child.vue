<template>
    <div @click="child">Click child</div>
</template>

<script>
export default {
  name: 'child',
  methods: {
    child () {
      console.log('---------向上寻找指定组件-----start-----')
      console.log(this.$findComponent.findComponentUpward(this, 'root').$options.name)
      console.log('---------向上寻找指定组件-----end-----')
      console.log(this.$findComponent.findComponentsUpward(this, 'root'))
      console.log(this.$findComponent.findBrothersComponents(this, 'brother'))
      console.log(this.$parent.$options.name)
      this.$bus.$emit('childMsg', {compName: 'child'})
    }
  }
}
</script>

<style scoped>

</style>

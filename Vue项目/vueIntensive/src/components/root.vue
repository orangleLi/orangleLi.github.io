<template>
  <div>
    <child></child>
    <brother v-on="$listeners"></brother>
    <!--$listeners包含了父作用域中的listenerFun-->
  </div>
</template>

<script>
import userInfo from '../js/userInfo'
import Child from './child'
import Brother from './brother'
export default {
  name: 'root',
  components: {Brother, Child},
  inject: ['app'],
  mixins: [userInfo],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    console.log(this.$listeners) // 包含了父作用域中的（不含native修饰器的）v-on事件监听器，他可以通过v-on="$listeners"传入内部组件
    console.log(this.app)
    // this.app.a.methods.getUserInfo()
    this.app.getUserInfo()
    this.getUserInfo()
    console.log(this.userInfo) // {name: 'zs', age: 18}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

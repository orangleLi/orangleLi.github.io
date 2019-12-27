<template>
  <div id="app">
    <root v-on:listenerFun="listenerFun"></root>
    <!--<root-brother></root-brother>-->
    <!--<form-show></form-show>-->
    <!--<router-view/>-->
  </div>
</template>

<script>
import Vue from 'vue'
import Root from './components/root'
import RootBrother from './components/rootBrother'
import FormShow from './components/form/form-show'
export default {
  name: 'App',
  components: {FormShow, RootBrother, Root},
  provide () {
    return {
      app: this
    }
  },
  // provide: {
  //   app: this
  // },
  mounted () {
    const Comp = Vue.extend({
      template: '<div>{{msg}}</div>',
      data () {
        return {
          msg: 'hello orangleLi'
        }
      }
    })
    document.body.appendChild(new Comp().$mount().$el)
    // new Comp().$mount('#app') // 此模板将会替换#app所在的div
    // new Comp({el: '#app'}) // 此模板将会替换#app所在的div
    // console.log('---------向下寻找指定组件-----start-----')
    // this.$findComponent.findComponentDownward(this, 'child').child()
    // console.log('---------向下寻找指定组件-----end-----')
    // console.log('---------向下寻找指定组件BFS-----start-----')
    // console.log(this.$findComponent.findComponentDownwardBFS(this, 'rootBrother').$options.name)
    // console.log('---------向下寻找指定组件BFS-----end-----')
    // console.log(this.$findComponent.findComponentsDownward(this, 'rootBrother'))
  },
  methods: {
    getUserInfo () {
      console.log('userInfo')
    },
    listenerFun () {
      console.log('listenerFun')
    }
  }
}
</script>

<style>
</style>

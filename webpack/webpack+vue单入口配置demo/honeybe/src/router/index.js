import Vue from 'vue'
import Router from 'vue-router'
import honey from '../components/honey'

Vue.use(Router)

export default new Router({
  // 打包时不能写成history 否则页面会一片空白
  mode:'hash',
  routes: [
    {
      path: '/',
      name: 'honey',
      component: honey
    }
  ]
})

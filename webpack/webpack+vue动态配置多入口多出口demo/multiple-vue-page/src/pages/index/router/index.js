import Vue from 'vue'
import Router from 'vue-router'
import screenFour from '@/pages/index/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
      {
          path: '/',
          name: 'screenFour',
          component: screenFour
      }
  ]
})

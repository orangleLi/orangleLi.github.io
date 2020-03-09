// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './index.vue'
import router from './router'
import store from '@/pages/index/store/store'
import  VueResource  from 'vue-resource'
Vue.use(VueResource)

import '@/assets/css/sbuProject.css'
import '@/assets/css/common.css'
import '@/assets/css/fourthSubProject/eningParkCar.css'
import '@/assets/css/fourthSubProject/eningPass.css'
import '@/assets/css/fourthSubProject/EningMonitorPlatformOfProjectNum.css'
import '@/assets/css/fourthSubProject/equipmentOperationMonitoring.css'
import '@/assets/css/fourthSubProject/caution.css'

import '@/assets/js/subProject/fourthSubProject/rem.js'

Vue.config.productionTip = false
//Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

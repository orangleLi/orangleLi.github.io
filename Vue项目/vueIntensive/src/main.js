// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Bus} from './js/bus.js'
import findComponent from './js/findComponent'
Vue.config.productionTip = false
Vue.prototype.$bus = Bus
Vue.prototype.$findComponent = findComponent

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
})

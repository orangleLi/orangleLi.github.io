// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import apiData from '../db.json'
import VueResource from 'vue-resource'
import $ from 'jquery'
import JQuery from 'jquery'

window.$ = $;
window.JQuery = JQuery;

Vue.use(VueResource);
var Mock = require('mockjs')
Vue.config.productionTip = false
Mock.mock('getProducts','post',apiData.products)
Mock.mock('getFooter','post',apiData.footer)
Mock.mock('getAboutUsInfo','post',apiData.aboutUsInfo)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

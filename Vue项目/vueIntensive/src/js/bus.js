// import Vue from 'vue'
// const Bus = new Vue()
import EventEmitter from './EventEmitter'
const Bus = new EventEmitter()
export { Bus }
// emit  定义事件
// on  监听事件
// off  卸载事件

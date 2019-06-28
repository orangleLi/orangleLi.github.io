import wxModalComponent from './wxModal.vue';
const index = {
  install: function (Vue) {
    Vue.component('wxModal', wxModalComponent);
  }
};
export default index;

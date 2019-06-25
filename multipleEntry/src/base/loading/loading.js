import loadingComponent from './loading.vue';
const loading = {
  install: function (Vue) {
    Vue.component('loading', loadingComponent);
  }
};
export default loading;

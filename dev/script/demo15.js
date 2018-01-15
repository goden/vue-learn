import Vue from 'vue/dist/vue.min.js';  // must follow this pattery to import vuejs
import VueRouter from 'vue-router/dist/vue-router.min.js';
import router from './router/router15.js';

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router
});



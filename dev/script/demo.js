import Vue from 'vue/dist/vue.min.js';  // must follow this pattery to import vuejs
import $ from 'jquery';
import utils from './lib/demo-lib.js';
import nav from './component/demo.component.js';

// register a component
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
});

// create an instance
new Vue({
  el: '#app',
  data: {
      currentActivity: 'Home'
  },
  mounted:function () {
    console.log($);
    console.log(utils.trim(' ABCDEFG     '));
  }
});



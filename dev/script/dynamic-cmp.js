import Vue from 'vue/dist/vue.min.js';  // must follow this pattery to import vuejs

// register a component
Vue.component('apply', {
  template: `
    <form>
        <textarea></textarea>
        <button>Submit</button>
    </form>
  `
});

Vue.component('lessons', {
  template: `
    <ul>
      <li>Angular</li>
      <li>React</li>
      <li>Vue</li>
    </ul>
  `
});

new Vue({
  el: '#app',
  data: {
      content: 'lessons'
  }
});


